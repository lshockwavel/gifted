import { AppState } from "../AppState.js";
import { Gift } from "../models/Gift.js";
import { giphyService } from "../services/GiphyService.js";
import { setHTML } from "../utils/Writer.js";

export class GiphyController {
  constructor() {
    console.log('This is the Giphy Controller');

    AppState.on('giphyList', this.drawGiphyList);
    AppState.on('ActiveGiphy', this.drawActiveGiphy);
  }

//   async getGifs(query) {
//     try {
//       const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${app.giphyAPIKey}&q=${query}&limit=10&offset=0&rating=g&lang=en`);
//       if (!res.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await res.json();
//       return data.data;
//     } catch (error) {
//       console.error('Error fetching GIFs:', error);
//       throw error;
//     }
//   }

    async createSearch(event) {
        event.preventDefault();
        const form = event.target;
        const query = form.search.value;
        try {
            await giphyService.search(query);
            // Handle the response
        } catch (error) {
            console.error('Error searching GIFs:', error);
        }

        // Reset the form after submission
        form.reset();
    }

    //Selecting this url will add it to to the url form
    selectMyGiphyId(giphyUrl) {
        console.log('Selecting Giphy URL:', giphyUrl);

        // const giphy = AppState.giphyList.find(g => g.url === giphyUrl);
        // if (!giphy) {
        //     console.error('Giphy not found:', giphyUrl);
        //     return '';
        // }

        // console.log('Giphy found:', giphy);

        // AppState.ActiveGiphy = giphy; // Set the active Giphy in AppState
        // console.log('Active Giphy set:', AppState.ActiveGiphy);

        giphyService.setGiphyUrl(giphyUrl); // Set the URL in the service
    }

    drawActiveGiphy() {
        const activeGiphy = AppState.ActiveGiphy;

        console.log('Set Active Giphy URL form', activeGiphy);

        const giftUrl = new Gift({ url: activeGiphy.url });

        setHTML('gift-create-form', Gift.GiftForm(giftUrl));

        // AppState.ActiveGiphy = null; // Reset after drawing
    }

    drawGiphyList() {
        const giphyList = AppState.giphyList;
        let giphyListHTML = '';
        giphyList.forEach(giphy => giphyListHTML += giphy.giphyTemplate);
        setHTML('gift-list', giphyListHTML);
    }

}