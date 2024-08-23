#!/bin/bash

API_URL="http://localhost:5205/automation"
DATA='{
    "Keyword": "land registry searches",
    "URL": "infotrack.co.uk",
    "SearchEngine": "Google"
}'

curl -X POST -H "Content-Type: application/json" -d "$DATA" $API_URL

