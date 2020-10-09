

const API_KEY = process.env['REACT_APP_YOUTUBE_API_KEY'] || ''

console.log(process.env,API_KEY)

interface SearchItem {
  id: {
    videoId : string
  }
}

export interface VideoData {
  categoryId : number,
  channelTitle: string
  defaultAudioLanguage: string
  description: string
  publishedAt: Date
  tags: string[]
  thumbnailUrl: string
  title: string
  commentCount: number
  dislikeCount: number
  favoriteCount: number
  likeCount: number
  viewCount: number
}

export async function getVideoData(id : string) : Promise<VideoData> {
  let url = new URL('https://www.googleapis.com/youtube/v3/videos')
  url.searchParams.append('key', API_KEY)
  url.searchParams.append('part', 'snippet,contentDetails,statistics')
  url.searchParams.append('id', id)
  let response = await (await fetch(url.toString())).json();
  let item = response.items[0];

  return {
    categoryId : Number(item.snippet.categoryId),
    channelTitle: item.snippet.channelTitle,
    defaultAudioLanguage: item.snippet.defaultAudioLanguage,
    description: item.snippet.description,
    publishedAt: new Date(item.snippet.publishedAt),
    tags: item.snippet.tags,
    thumbnailUrl: getBestImg(item),
    title: item.snippet.title,
    commentCount: Number(item.statistics.commentCount),
    dislikeCount: Number(item.statistics.dislikeCount),
    favoriteCount: Number(item.statistics.favoriteCount),
    likeCount: Number(item.statistics.likeCount),
    viewCount: Number(item.statistics.viewCount)
  };


  function getBestImg(item:any) {
    const qualities = ['maxres','high','medium','standart','default']

    for(const quality  of qualities) {
      if(  item.snippet.thumbnails?.[quality]?.url )
        return item.snippet.thumbnails[quality].url;
    }
  }
}


export async function getSearchVideos(query : string) : Promise<{items: SearchItem[]}> {
  let url = new URL('https://www.googleapis.com/youtube/v3/search')
  url.searchParams.append('type', 'video')
  url.searchParams.append('key', API_KEY)
  url.searchParams.append('q', query)
  url.searchParams.append('maxResults', '10')
  return await (await fetch(url.toString())).json();
}

