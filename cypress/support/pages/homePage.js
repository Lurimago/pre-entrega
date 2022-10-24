export class HomePage {
  constructor() {
    this.OnlineShopButton = "#onlineshoplink";
  }

  clickOnlineShopLink() {
    cy.get(this.OnlineShopButton).click();
  }
}
