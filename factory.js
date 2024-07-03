const AirportService = require("./services/airport.service");
const FlightService = require("./services/flight.service");
const AirportRepository = require("./repositories/airport.repository");
const FlightRepository = require("./repositories/flight.repository");
const RedisFlightRepository = require("./repositories/redis-flight.repository");
const RedisAirportRepository = require("./repositories/redis-airport.repository");

class DefaultFactory {
  #providerUrl;
  #airportFile;

  constructor(providerUrl, airportFile) {
    this.#providerUrl = providerUrl;
    this.#airportFile = airportFile;
  }

  createAirportService() {
    return new AirportService(this.createAirportRepository());
  }

  createFlightService() {
    return new FlightService(this.createAirportService(), this.createFlightRepository());
  }

  createFlightRepository() {
    return new FlightRepository(this.#providerUrl);
  }

  createAirportRepository() {
    return new AirportRepository(this.#airportFile);
  }
}

class RedisFactory {
  #providerUrl;
  #airportFile;

  constructor(providerUrl, airportFile) {
    this.#providerUrl = providerUrl;
    this.#airportFile = airportFile;
  }

  createAirportService() {
    return new AirportService(this.createAirportRepository());
  }

  createFlightService() {
    return new FlightService(this.createAirportService(), this.createFlightRepository());
  }

  createFlightRepository() {
    return new RedisFlightRepository(new FlightRepository(this.#providerUrl));
  }

  createAirportRepository() {
    return new RedisAirportRepository(new AirportRepository(this.#airportFile));
  }
}

module.exports = {
  DefaultFactory,
  RedisFactory
}
