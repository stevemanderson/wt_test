const express = require("express");
const FlightService = require("./services/flight.service");
const FlightRepository = require("./repositories/flight.repository");
const AirportRepository = require("./repositories/airport.repository");
const AirportService = require("./services/airport.service");
const { checkSchema, validationResult } = require("express-validator");
const { DateRange } = require("./utils");
const app = express();
const PROVIDER_URL =
  "https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt";
const AIRPORT_FILE = "./data/airports.json";

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
  const service = new AirportService();
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
    const service = new FlightService(
      new AirportService(new AirportRepository(AIRPORT_FILE)),
      new FlightRepository(PROVIDER_URL)
    );
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
