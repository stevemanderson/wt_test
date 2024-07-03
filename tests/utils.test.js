const { DateRange } = require("../utils");
describe("DateRange", () => {
  describe("within", () => {
    it("should be within", () => {
      const dateRange = new DateRange(
        new Date("2017-06-01T21:21:17.000Z"),
        new Date("2017-06-01T21:21:18.000Z")
      );
      expect(dateRange.within(new Date("2017-06-01T21:21:17.274Z")));
    });
  });
});
