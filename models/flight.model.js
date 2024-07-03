module.exports = class Flight {
  constructor(id, departureTime, arrivalTime, origin, destination, carrier) {
    this.id = id;
    this.departureTime = new Date(departureTime);
    this.arrivalTime = new Date(arrivalTime);
    this.origin = origin;
    this.destination = destination;
    this.carrier = carrier;
  }

  /**
   * Get the score of the flight.
   *
   * (flight duration in hours) * (carrier preference) + (distance in miles between airports).
   *
   * Lower scores are better.
   *
   * @param {{string}} preferredCarrier,
   * @param {(code1: string, code2: string) => number} distanceBetweenAirports
   * @returns {number}
   */
  getScore(preferredCarrier, distanceBetweenAirports) {
    return (
      this.getDurationInHours() * (preferredCarrier === this.carrier ? 0.9 : 1) +
      distanceBetweenAirports(this.origin, this.destination)
    );
  }

  /**
   * Helper to get the hours.
   */
  getDurationInHours() {
    const duration = this.arrivalTime - this.departureTime;
    return duration / 1000 / 60 / 60;
  }
};
