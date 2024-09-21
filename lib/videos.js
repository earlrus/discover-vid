import videos from "../data/videos.json";
export async function getVideos(searchQuery) {
  try {
    const url = getUrl(searchQuery);

    const res = await fetch(url);

    const data = await res.json();

    if (!data?.items) {
      return videos.items.map((video, idx) => {
        return {
          id: video.id.videoId || idx,
          imgUrl: video.snippet.thumbnails.high.url,
          title: video.snippet.title,
        };
      });
    }

    return data.items.map((video, idx) => {
      return {
        id: video.id.videoId || idx,
        imgUrl: video.snippet.thumbnails.high.url,
        title: video.snippet.title,
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}

function getUrl(searchQuery = "") {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  return `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${YOUTUBE_API_KEY}`;
}

export async function getVideoById(videoId) {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    const data = await res.json();
    return data.items.length !== 0 ? data.items[0] : {};
  } catch (error) {
    console.log(error);
  }
}
