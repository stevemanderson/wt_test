const Flight = require("../models/flight.model");

module.exports = class FlightRepository {
  #providerUrl;

  /**
   * @param {{string}} providerUrl
   */
  constructor(providerUrl) {
    this.#providerUrl = providerUrl;
  }

  /**
   * @returns {{Flight[]}}
   */
  async getFlights() {
    const providerResult = await fetch(this.#providerUrl);
    return (await providerResult.json()).map(
      (f) =>
        new Flight(
          new Date(f.departureTime),
          new Date(f.arrivalTime),
          f.origin,
          f.destination,
          f.carrier
        )
    );
  }
};