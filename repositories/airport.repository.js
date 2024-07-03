const Airport = require("../models/airport.model");

module.exports = class AirportRepository {
  #fileLocation;

  /**
   * @param {{string}} fileLocation
   */
  constructor(fileLocation) {
    this.fileLocation = fileLocation;
  }

  /**
   * @returns {{Airport[]}}
   */
  async getAirports() {
    const airports = require('../data/airports.json');
    return airports.map(
      (f) =>
        new Airport(
          f.airportId,
          f.name,
          f.city,
          f.country,
          f.iata,
          f.icao,
          f.lat,
          f.lng
        )
    );
  }
};
