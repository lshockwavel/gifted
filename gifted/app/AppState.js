import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'
import { Gift } from "./models/Gift.js";
import { Giphy } from './models/Giphy.js';

class ObservableAppState extends EventEmitter {

  user = null

  /** @type {Gift[]} */
  gifts = []

  /** @type {Gift} */
  gift = null

  /** @type {Giphy[]} */
  giphyList = []

  /** @type {Giphy} */
  ActiveGiphy = null

  /**@type {import('./models/Account.js').Account | null} */
  account = null
}

export const AppState = createObservableProxy(new ObservableAppState())