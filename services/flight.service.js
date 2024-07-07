const Flight = require("../models/flight.model");
const FlightRepository = require("../repositories/flight.repository");
const AirportService = require("./airport.service");
const { DateRange } = require("../utils");

module.exports = class FlightService {
  /**
   * @type {AirportService}
   */
  #airportService;

  /**
   * @type {FlightRepository}
   */
  #repository;

  constructor(airportService, repository) {
    this.#airportService = airportService;
    this.#repository = repository;
  }

  /**
   * @param {{
   * departure: DateRange,
   * maxDuration?: number,
   * preferredCarrier?: string
   * }} criteria
   * @returns {Flight[]}
   */
  async getFlights(criteria) {
    let flights = await this.#repository.getFlights();

    flights = flights.filter(f => 
      (!criteria?.departure || criteria?.departure.within(f.departureTime)) &&
      (!criteria?.maxDuration || f.getDurationInHours() <= criteria.maxDuration) &&
      (!criteria?.preferredCarrier || f.carrier === criteria.preferredCarrier) 
    );

    const origins = [...new Set(flights.map((p) => p.origin))];
    const destinations = [...new Set(flights.map((p) => p.destination))];
    const ap = await this.#airportService.getAirportsByCodes([
      ...origins,
      ...destinations,
    ]);

    return flights
      .map((f) => ({
        ...f,
        ...{
          score: f.getScore(criteria?.preferredCarrier, (origin, destination) =>
            ap[origin].distanceToInMiles(ap[destination])
          ),
        },
      }))
      .sort((a, b) => a.score - b.score);
  }
};
