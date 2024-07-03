const express = require("express");
const morgan = require("morgan");
const { checkSchema, validationResult } = require("express-validator");
const { DateRange } = require("./utils");
const app = express();
app.use(morgan("combined"));

const PROVIDER_URL =
  "https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt";
const AIRPORT_FILE = "./data/airports.json";
const Factory = require("./factory");

let factoryInstance;
if (process.env.REDIS_ENABLED === "1") {
  factoryInstance = new Factory.RedisFactory(PROVIDER_URL, AIRPORT_FILE);
} else {
  factoryInstance = new Factory.DefaultFactory(PROVIDER_URL, AIRPORT_FILE);
}

app.use(express.json());
const defaultRouter = express.Router();
const airportsRouter = express.Router();

function validate(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.statusCode = 400;
    return res.send({ errors: result.array() });
  }
  next();
}

airportsRouter.get("/", (req, res) => {
  const service = factoryInstance.createAirportService();
});

defaultRouter.post(
  "/search",
  checkSchema({
    departureMin: {
      isString: true,
      optional: true,
    },
    departureMax: {
      isString: true,
      optional: true,
    },
    maxDuration: {
      isInt: true,
      optional: true,
    },
    preferredCarrier: {
      isString: true,
      optional: true,
    },
  }),
  validate,
  async (req, res) => {
    const { departureMin, departureMax, maxDuration, preferredCarrier } =
      req.body;
    const service = factoryInstance.createFlightService();
    res.statusCode = 200;
    const criteria = {
      departure:
        departureMin && departureMax
          ? new DateRange(new Date(departureMin), new Date(departureMax))
          : undefined,
      maxDuration,
      preferredCarrier,
    };
    res.send(await service.getFlights(criteria));
  }
);

app.use("", defaultRouter);
app.use("airports", airportsRouter);
module.exports = app;
