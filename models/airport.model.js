const haversine = require("haversine");

module.exports = class Airport {
  constructor(id, name, city, country, iata, icao, lat, lng) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.country = country;
    this.iata = iata;
    this.icao = icao;
    this.latitude = lat;
    this.longitude = lng;
  }

  /**
   * @param {Airport} dst
   */
  distanceToInKilometers(dst) {
    return parseFloat(haversine(this, dst, {unit: 'kilometer'}).toFixed(2));
  }
  
  distanceToInMiles(dst) {
    return parseFloat(haversine(this, dst, {unit: 'mile'}).toFixed(2));
  }
};
