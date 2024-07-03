const FlightService = require("../services/flight.service");
const AirportService = require("../services/airport.service");
const AirportRepository = require("../repositories/airport.repository");
const Flight = require("../models/flight.model");
const AIRPORT_FILE = "./data/airports.json";

const mockRepo = {
  getFlights: () => {
    const flights = require("./data/flights.json");
    return flights.map(
      (f) =>
        new Flight(
          new Date(f.departureTime),
          new Date(f.arrivalTime),
          f.origin,
          f.destination,
          f.carrier
        )
    );
  },
};

describe("FlightService", () => {
  it("should return all the flights", async () => {
    const service = new FlightService(
      new AirportService(new AirportRepository(AIRPORT_FILE)),
      mockRepo
    );
    const flights = await service.getFlights();
    expect(flights.length).toBe(4);
  });
});
