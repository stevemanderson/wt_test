class DateRange {
  constructor(
    min,
    max) {
    this.min = min;
    this.max = max;
  }

  /**
   * @param {Date} dt
   */
  within(dt) {
    return (dt >= this.min && dt < this.max);
  }
}

module.exports = {
  DateRange,
};
