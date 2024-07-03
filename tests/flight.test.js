const Flight = require("../models/flight.model");

describe("Flight", () => {
  describe("getDurationInHours", () => {
    it("Should return correct duration.", () => {
      const flight = new Flight(
        new Date("2017-06-01T21:00:00.000Z"),
        new Date("2017-06-01T23:00:00.000Z"),
        "JFK",
        "AUS"
      );
      expect(flight.getDurationInHours()).toBe(2);
    });
  });

  describe("getScore", () => {
    it("should return 6.8 for 2 hour flight * preferred carrier * 5 miles.", () => {
      const flight = new Flight(
        new Date("2017-06-01T21:00:00.000Z"),
        new Date("2017-06-01T23:00:00.000Z"),
        "JFK",
        "AUS",
        "SW"
      );
      expect(flight.getScore("SW", () => 5)).toBe(6.8);
    });

    it("should return 7 for 2 hour flight * not preferred carrier * 5 miles.", () => {
      const flight = new Flight(
        new Date("2017-06-01T21:00:00.000Z"),
        new Date("2017-06-01T23:00:00.000Z"),
        "JFK",
        "AUS",
        "SW"
      );
      expect(flight.getScore("AA", () => 5)).toBe(7);
    });

  });
});
