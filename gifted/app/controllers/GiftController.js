import { AppState } from "../AppState.js";
import { Gift } from "../models/Gift.js";
import { giftService } from "../services/GiftService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class GiftController {
  constructor() {
    console.log('GiftController initialized');

    //Create a this.drawPlaceHolderGiftList method to handle the initial state of the gift list
    // this.drawPlaceHolderGiftList();

    this.drawCreateGift();

    AppState.on('user', this.getGifts);
    AppState.on('gifts', this.drawGifts);
    AppState.on('ActiveGiphy', this.drawGifts)

    // this.getGifts();
  }


  //WIP Will need to massage the methods

  //GET Gifts
  async getGifts() {
    try {
      await giftService.getGifts();
    } catch (error) {
      console.error('Error fetching gifts:', error);
    }
  }

  //Draw Gifts
  drawGifts() {
    const giftList = AppState.gifts;
    let giftListHTML = '';
    giftList.forEach(gift => giftListHTML += gift.giftTemplate);
    setHTML('gift-list', giftListHTML);
  }

  drawCreateGift() {
    console.log('Drawing create gift form');
    setHTML('gift-create-form', Gift.GiftForm());
  }

  //create Gift
  async createGift(event) {
    try {
        event.preventDefault();
        const form = event.target;
        const giftData = getFormData(form);
        await giftService.addGift(giftData);
        form.reset();
    } catch (error) {
        Pop.toast(`Error creating gift. Status: ${error.response?.status || 'unknown'}`);
        console.error('Error creating gift:', error);
    }
  }

  async openGift(id) {
    try {
        await giftService.openGift(id);
    } catch (error) {
        Pop.toast(`Error opening gift. Status: ${error.response?.status || 'unknown'}`);
        console.error('Error opening gift:', error);
    }
  }
}