const {writeFileSync, createReadStream, createWriteStream } = require("fs");
const { parse } = require("csv-parse");

const toFlight = (record) => {
  return {
    airportId: parseInt(record[0]),
    name: record[1],
    city: record[2],
    country: record[3],
    iata: record[4],
    icao: record[5],
    lat: parseFloat(record[6]),
    lng: parseFloat(record[7]),
    alt: parseFloat(record[8]),
    timezone: record[9],
  }
}
const processFile = async () => {
  const records = [];
  const parser = createReadStream("./airports.txt").pipe(
    parse({
      delimiter: ",",
    })
  );
  for await (const record of parser) {
    // Work with each record
    records.push(toFlight(record));
  }
  return records;
};

processFile().then(output => {
  writeFileSync("./airports.json", JSON.stringify(output));
});
