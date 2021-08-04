"use strict";
module.exports = async (videoId, maxResults, consumer) => {
    const youtubeClient = require('./youtubeClient');
    let total = 0;
    let nextPageToken;
    let itemsToReturn = []
    do {
        console.log("fetching comments");
        const comments = await youtubeClient.fetchComments(videoId, nextPageToken)
        if(!comments) {
            break;
        }

        nextPageToken = comments.nextPageToken;
        const {items, pageInfo} = comments;
        const {resultsPerPage} = pageInfo;
        let itemsToConsume;
        if (total + resultsPerPage > maxResults) {
            const leftToConsume = Math.min(maxResults - total, items.length);
            total += leftToConsume;
            if (leftToConsume === 0){
                break;
            }

            itemsToConsume = items.slice(0, leftToConsume);
        } else {
            total += Math.min(resultsPerPage, items.length);
            itemsToConsume = items;
        }

        console.log(`consuming ${itemsToConsume.length} comments, total=${total}, nextPageToken=${nextPageToken}`);
        itemsToReturn.push(...itemsToConsume);
        consumer(itemsToConsume);
    } while (total < maxResults && nextPageToken);


    return {
        request: {
            videoId, maxResults
        },
        response: {
            n: itemsToReturn.length,
            comments: itemsToReturn
        }
    };
}