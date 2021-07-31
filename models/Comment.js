const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = new Schema(
    {
            "kind": String,
            "etag": String,
            "id": String,
            "snippet": {
                "authorDisplayName": String,
                "authorProfileImageUrl": String,
                "authorChannelUrl": String,
                "authorChannelId": {
                   "value": String
                },
                "channelId": String,
                "videoId": String,
                "textDisplay": String,
                "textOriginal": String,
                "parentId": String,
                "canRate": Boolean,
                "viewerRating": String,
                "likeCount": Number,
                "moderationStatus": String,
                "publishedAt": Date,
                "updatedAt": Date
            }
    }
);

module.exports = mongoose.model('Comment', Comment);
