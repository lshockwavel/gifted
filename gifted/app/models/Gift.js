

export class Gift {
    constructor(data) {
        this.id = data.id;
        this.creator = data.creator; // Assuming creator is an object with relevant properties
        this.createdAt = data.createdAt; // Assuming createdAt is a date string or timestamp
        this.opened = data.opened || false; // Default to false if opened is not provided
        this.tag = data.tag;
        this.url = data.url || data.gif;
        this.creatorId = data.creatorId;
        this.profileIdsOpened = data.profileIdsOpened;
    }

    get giftTemplate() {
        if (this.opened) {
            return /*html */ `
                <div class="col-md-4">
              <div class="card">
                <img src="${this.url}" alt="${this.tag}">
                <div class="card-body d-flex justify-content-between align-items-center text-center">
                    <span class="badge text-black">${this.tag}</span>
                    <button class="btn btn-link text-danger p-0 ms-2" title="Delete" onclick="app.GiftController.deleteGift('${this.id}')">
                        <i class="mdi mdi-close-circle-outline fs-4">(WIP)</i>
                    </button>
                </div>
              </div>
            </div>
            `;
        }
        else {
            return /*html */ `
                <div class="col-md-4 mb-4">
                    <div class="card gift-card text-center position-relative">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center gift-card-body">
                            <span class="badge gift-tag">${this.tag}</span>
                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <button onclick="app.GiftController.openGift('${this.id}')" class="gift-open-text">Click to Open</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    static GiftForm(gift = null) {
        return /*html */ `
        <form onsubmit="app.GiftController.createGift(event)" class="text-light p-3">
              <div class="m-2">
                <label for="tag">Tag</label>
                <input type="text" class="form-control" id="tag" name="tag" placeholder="Tag"
                  aria-label="Tag" maxlength="120" required value="${gift?.tag != null ? gift.tag : ''}">
              </div>
              <div class="m-2">
                <label for="url">URL</label>
                <input type="url" class="form-control" id="url" name="url" placeholder="URL"
                  aria-label="URL" maxlength="500" required value="${gift?.url != null ? gift.url : ''}">
              </div>
              <div class="m-2">
                <button type="submit" class="btn btn-light">Create Gift</button>
              </div>
            </form>
            `;
    }

}