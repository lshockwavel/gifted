

export class Giphy {
  constructor(data) {
    this.url = data.images.downsized_large.url || data.url || '';
  }

  get giphyTemplate() {
    return /*html */ `
      <div class="col-md-4 mb-4">
            <div class="card gift-card text-center position-relative">
                <img src="${this.url}" alt="Giphy Image" class="card-img-top">
                <div class="card-body text-center">
                  <span class="badge text-black"></span>
                </div>
                <div class="card-footer bg-transparent border-0">
                    <button onclick="app.GiphyController.selectMyGiphyId('${this.url}')" class="gift-open-text">Click to use URL</button>
                </div>
            </div>
        </div>
    `;
  }
}