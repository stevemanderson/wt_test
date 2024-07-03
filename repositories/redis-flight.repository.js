const Flight = require("../models/flight.model");
const Redis = require("ioredis");

module.exports = class RedisFlightRepository {
  #redis;
  #flightRepository;

  /**
   * @param {{string}} providerUrl
   */
  constructor(flightRepository) {
    this.#flightRepository = flightRepository;
    this.#redis = new Redis();
  }

  /**
   * @returns {{Flight[]}}
   */
  async getFlights() {
    let cached = await this.#redis.lrange("flights", 0, -1);
    let flights;
    if (cached.length === 0) {
      flights = await this.#flightRepository.getFlights();
      await this.#redis.lpush("flights", flights.map(JSON.stringify));
      // Expire in 5 seconds
      await this.#redis.expire("flights", 60);
    } else {
      flights = cached.map((m) => {
        const f = JSON.parse(m);
        return new Flight(
          new Date(f.departureTime),
          new Date(f.arrivalTime),
          f.origin,
          f.destination,
          f.carrier
        );
      });
    }
    return flights;
  }
};
