"use strict"
const Comment = require("./models/Comment");

module.exports = (comments) => {
    Comment.create(comments[0])
}