module.exports = async (videoId, maxResults, consumer) => {
    const youtubeClient = require('./youtubeClient');
    let total = 0;
    let nextPageToken;
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
            const leftToConsume = maxResults - total > items.length ? items.length : maxResults - total;
            total+=leftToConsume;
            if (leftToConsume === 0){
                break;
            }
            itemsToConsume = items.slice(0, leftToConsume);
        } else {
            total += resultsPerPage > items.length ? items.length : resultsPerPage;
            itemsToConsume = items;
        }

        console.log(`consuming ${itemsToConsume.length} comments, total=${total}, nextPageToken=${nextPageToken}`);
        consumer(itemsToConsume);
    } while (total < maxResults && nextPageToken);
}