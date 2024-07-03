## tests
npm test

## serve
npm run dev

## script for test
./scripts/search.sh

## TODO
- airport endpoint can be exposed to get the airport data
- airport endpoint for haversine distance can be exposed
- flight selections can be stored in a distributed memory cache like redis which has an expiration,
as flights could book up etc.
- as per performance, the flights can be polled and cached. Right now each search is fetching the flights
- additional updates should include more security, load balancing, caching, API limiting
