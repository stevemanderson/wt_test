const request = require("supertest");
const app = require("../app");

describe("App", () => {
  describe("search", () => {
    it("should return all flights for SFO", async () => {
      const response = await request(app)
        .post("/search")
        .set("content-type", "application/json")
        .send({
          preferredCarrier: "FR",
        });
      expect(response.statusCode).toBe(200);
      const airports = response.body;
      expect(airports.length).toBe(91);
    });

    it("should filter using all filters", async () => {
      /*
        {
    "departureTime": "2017-06-01T21:21:17.274Z",
    "arrivalTime": "2017-06-01T22:21:17.274Z",
    "carrier": "FR",
    "origin": "SJC",
    "destination": "BUR"
  }
      */
      const response = await request(app)
        .post("/search")
        .set("content-type", "application/json")
        .send({
          departureMin: "2017-06-01T21:21:17.000Z",
          departureMax: "2017-06-01T21:21:17.275Z",
          maxDuration: 1,
          preferredCarrier: "FR",
        });
      expect(response.statusCode).toBe(200);
      const flights = response.body;
      expect(flights.length).toBe(1);
      expect(flights[0]).toEqual({
        arrivalTime: "2017-06-01T22:21:17.274Z",
        carrier: "FR",
        departureTime: "2017-06-01T21:21:17.274Z",
        destination: "BUR",
        origin: "SJC",
        score: 297.2,
      });
    });
  });
});
