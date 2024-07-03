## tests
npm test

## serve
npm run dev

## serve using redis
npm run dev-redis

Flights and airports are cached for 5 seconds in the redis lists.

## script for test
./scripts/search.sh

## TODO
- with the cache in place and an id associated to the flight, within the TTL of the flights
if I increase them to say 10 minutes, I can then allow users to choose the flight and cache those
    selections in redis with a TTL. On the TTL event for the flights, I would invalidate the users'
    selected flights.
- there is little logging 
    - ~~use morgan for HTTP logs~~ 
    - use Bunyan for application logs
- more validation on the API endpoint should be required
- better error handling
- airport endpoint can be exposed to get the airport data
- airport endpoint for haversine distance can be exposed
- ~~flight selections can be stored in a distributed memory cache like redis which has an expiration,
as flights could book up etc.~~
- ~~as per performance, the flights can be polled and cached. Right now each search is fetching the flights~~
- additional updates should include more security, load balancing, caching, API limiting
