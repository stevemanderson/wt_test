#!/bin/bash
curl -X POST --data '{"preferredCarrier": "FR"}' -H 'content-type: application/json' http://localhost:3000/search
