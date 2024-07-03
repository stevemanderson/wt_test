const Airport = require("../models/airport.model");
const AirportRepository = require("../repositories/airport.repository");
const Redis = require("ioredis");

module.exports = class RedisAirportRepository {
  #redis;
  #airportRepository;

  /**
   * @param {{AirportRepository}} airportRepository
   */
  constructor(airportRepository) {
    this.#airportRepository = airportRepository;
    this.#redis = new Redis();
  }

  /**
   * @returns {{Airport[]}}
   */
  async getAirports() {
    let cached = await this.#redis.lrange("airports", 0, -1);
    let airports;
    if (cached.length === 0) {
      airports = await this.#airportRepository.getAirports();
      await this.#redis.lpush("airports", airports.map(JSON.stringify));
      // Expire in 5 seconds
      await this.#redis.expire("airports", 5);
    } else {
      airports = cached.map(
        (m) => {
          const f = JSON.parse(m);
          return new Airport(
            f.airportId || f.id,
            f.name,
            f.city,
            f.country,
            f.iata,
            f.icao,
            f.latitude,
            f.longitude
          )
        }
      );
    }
    return airports;
  }
};
