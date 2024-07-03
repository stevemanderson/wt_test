const Airport = require("../models/airport.model");

describe("Airport", () => {
  describe("getDistance", () => {
    it("Should return correct distance.", () => {
      // going to use https://www.vcalc.com/wiki/vCalc/Haversine%20-%20Distance for testing
      //1,"Goroka Airport","Goroka","Papua New Guinea","GKA","AYGA",-6.081689834590001,145.391998291,5282,10,"U","Pacific/Port_Moresby","airport","OurAirports"
      //2,"Madang Airport","Madang","Papua New Guinea","MAG","AYMD",-5.20707988739,145.789001465,20,10,"U","Pacific/Port_Moresby","airport","OurAirports"
      const a1 = new Airport(
        1,
        "a",
        "",
        "",
        "",
        "",
        -6.081689834590001,
        145.391998291
      );
      const a2 = new Airport(
        2,
        "a",
        "",
        "",
        "",
        "",
        -5.20707988739,
        145.789001465
      );
      expect(a1.distanceToInKilometers(a2)).toBe(106.71);
    });
  });
});
