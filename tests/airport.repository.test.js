const AirportRepository = require('../repositories/airport.repository');

describe("AirportRepository", () => {
  it("should return all the airports in the data json", async () => {
    const repo = new AirportRepository("./data/airports.json");
    const airports = await repo.getAirports();
    expect(airports.length).toBe(7698);
  });
});
