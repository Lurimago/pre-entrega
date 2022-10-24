export class Products {
  addProducts(Productos) {
    cy.xpath(`//button[contains(@value,"${Productos}")]`).click();
  }
  c;
  clickCloseButton() {
    cy.xpath("//button[@id='closeModal']").click();
  }

  clickButtonGoShoppingCart() {
    cy.get("button#goShoppingCart").click();
  }
}
