"use strict"
const mongoose = require("mongoose");

module.exports = comments => {
    mongoose.connection.db.collection("comments").insert(comments, {ordered: false}, (err, result) => {
        if (err) {
            return console.error(err);
        }

        console.log("Done!");
        console.debug(result.result);
    })
}