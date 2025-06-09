
import { AppState } from "../AppState.js";
import { giphyAPIKey } from "../env.js";
import { Gift } from "../models/Gift.js";
import { Giphy } from "../models/Giphy.js";


export const giphyApi = axios.create({
  baseURL: "http://api.giphy.com/v1/gifs",
  timeout: 8000,
  params: {
    api_key: giphyAPIKey,
    rating: "pg",
    limit: 10,
  },
});

class GiphyService {
//   async searchGifs(query, limit = 10) {
//     const url = `${this.baseUrl}/search?api_key=${this.apiKey}&q=${encodeURIComponent(query)}&limit=${limit}`;
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error('Failed to fetch GIFs');
//     }
//     const data = await response.json();
//     return data.data;
//   }


  async search(query) {
    const res = await giphyApi.get('search', {
        params: {
            q: query
        }
    });
    // Handle the response
    if (res.status !== 200) {
        throw new Error('Failed to fetch GIFs');
    }

    console.log('Giphy search response:', res.data);

    // const gifs = res.data.data.map(g => g.images.downsized_large.url);
    // console.log('Gifs fetched:', gifs);

    // AppState.giphyList = gifs.map(g => new Giphy({ url: g })); //REVIEW Was there a different way of handling this besides forcing a url direct value in parm?
    AppState.giphyList = res.data.data.map(g => new Giphy(g)); //REVIEW Was there a different way of handling this besides forcing a url direct value in parm?
    console.log('AppState.giphyList:', AppState.giphyList);
    }

    setGiphyUrl(giphyUrl) {
        const giphy = AppState.giphyList.find(g => g.url === giphyUrl);
        if (!giphy) {
            console.error('Giphy not found:', giphyUrl);
            return '';
        }

        console.log('Giphy found:', giphy);

        AppState.ActiveGiphy = giphy; // Set the active Giphy in AppState
        console.log('Active Giphy set:', AppState.ActiveGiphy);
    }
}

export const giphyService = new GiphyService();