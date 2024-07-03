const Airport = require("../models/airport.model");
const AirportRepository = require("../repositories/airport.repository");

/**
 * Just to keep with pattern.
 */
module.exports = class AirportService {
  /**
   * @type {{AirportRepository}}
   */
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  /**
   * @returns {Airport[]}
   */
  async getAirports() {
    return this.#repository.getAirports();
  }

  async getAirportsByCodes(codes) {
    const airports = (await this.getAirports()).filter(
      (p) => codes.includes(p.iata),
    );
    return airports.reduce((p, c, i) => {
      p[c.iata] = c;
      return p;
    }, {});
  }
};
