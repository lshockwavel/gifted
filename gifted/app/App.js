import { AuthController } from './controllers/AuthController.js';
import { router } from './router-config.js';
import { GiftController } from './controllers/GiftController.js';
import { GiphyController } from './controllers/GiphyController.js';

const USE_ROUTER = false

class App {

  AuthController = new AuthController();
  GiftController = new GiftController();
  GiphyController = new GiphyController();
  
  constructor() {
    if(USE_ROUTER){
      this.router = router
      this.router.init(this)
    }
  }
}


const app = new App()
// @ts-ignore
window.app = app
