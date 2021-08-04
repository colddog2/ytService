module.exports = (() => {
    const fetch = require("node-fetch");
    const API_KEY = "KEY_HERE";

    async function checkStatus(res) {
        if (res.ok) {
            return await res.json();
        }

        throw {
            status: res.status,
            statusText: res.statusText
        };
    }

    return {
        fetchComments: async function (videoId, nextPageToken) {
            const nextPageParam = nextPageToken ? `&pageToken=${nextPageToken}` : "";
            const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}&maxResults=100${nextPageParam}`
            return await fetch(url).then(checkStatus);
        }
    }
})();

