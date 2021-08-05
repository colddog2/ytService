"use strict"
const express = require("express");
const mongoose = require("mongoose");
const commentsConsumer = require("./commentsConsumer");
const dbConsumer = require("./dbInsertConsumer")

const app = express();
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/fetch/comments', (req, res, next) => {
  const { videoId, maxResults } = req.query;
  const maxResultsAsNumber = parseInt(maxResults);
  if (!videoId || !maxResultsAsNumber) {
    return next({
      status: 400,
      error: "Bad Request"
    });
  }

  return commentsConsumer(videoId, maxResults, dbConsumer)
      .then(result => {
        return res.send(result)
      }).catch(next);
});

// error handling
app.use(function (error, req, res, next) {
  return res.status(error.status||500).json({
    error
  })
})

const port = 3000;

app.listen(port, () => console.log('Server running...'));
