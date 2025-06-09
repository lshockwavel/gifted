import { Gift } from "../models/Gift.js";
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"

class GiftService {

  async addGift(gift) {
    //Maybe the value of opened should be set to false by default
    gift.opened = false; // Ensure opened is set to false when creating a new gift

    const response = await api.post('api/gifts', gift);
    console.log('Gift added:', response.data);
    const addedGift = new Gift(response.data);
    AppState.gifts.unshift(addedGift); //REVIEW Shouldn't this trigger the AppState.on('gifts') event?
    AppState.emit('gifts'); // Trigger the drawGifts method in GiftController
  }

  async openGift(giftId) {
    const openedGift = AppState.gifts.find(g => g.id === giftId);
    if (!openedGift) {
      throw new Error('Gift not found');
    }

    console.log('Opening gift:', openedGift);

    //setting the opened value to true
    openedGift.opened = true;

    //setting the profileIdsOpened to include the current user's id
    const response = await api.put(`api/gifts/${giftId}`, openedGift);
    console.log('Gift opened:', response.data);

    AppState.emit('gifts'); //Trigger the drawGifts method in GiftController
  }

  async getGifts() {
    const response = await api.get('api/gifts');
    console.log('Gifts fetched:', response.data);
    AppState.gifts = response.data.map(g => new Gift(g));
    console.log('AppState.gifts:', AppState.gifts);
  }


  // Maybe?
  async removeGift(giftId) {
    const response = await api.delete(`api/gifts/${giftId}`);
    console.log('Gift removed:', response.data);
    AppState.gifts = AppState.gifts.filter(g => g.id !== giftId);
    AppState.emit('gifts'); // Trigger the drawGifts method in GiftController
  }
}

export const giftService = new GiftService();