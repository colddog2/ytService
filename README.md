# Docker Node MongoDB Example

> Simple example of a dockerized Node/Mongo app
Based of https://github.com/bradtraversy/docker-node-mongod
## Quick Start


```bash
# Before running
set you API_KEY in youtubeClient.js

# Run in Docker
npm i
docker-compose up
# use -d flag to run in background

# Endpoint
GET localhost/fetch/comments?videoId=wtLJPvx7-ys&maxResults=666

# Mongo 
aim your Mongo client at localhost:27017

# Tear down
docker-compose down

# To re-build
docker-compose build

# Roadmap
* extract URLS
* Cache results
* return nextPageToken to client for paging results from youtube service, instead of accumulating and returning all
```
