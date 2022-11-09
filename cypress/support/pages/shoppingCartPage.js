export class ShoppingCartPage {
  checkProduct(product) {
    cy.xpath(`//p[@name="${product}"]`)
      .invoke("text")
      .then((valor) => {
        expect(valor).equal(product);
      });
  }
  // checkPrice(price) {
  //   cy.xpath(`//p[@name="${price}"]`)
  //     .invoke("text")
  //     .then((valor) => {
  //       expect(valor).equal("$" + price);
  //     });
  // }

  checkPriceProduct(producto, price) {
    cy.xpath(`//p[@name="${producto}"]//following-sibling::p`)
      .invoke("text")
      .then((valor) => {
        expect(valor).equal("$" + price);
      });
  }

  clickShowTotalPriceButton() {
    cy.xpath("//button[text()='Show total price']").click();
  }

  checkTotalPrice(totalPrice) {
    cy.xpath('//p[@id="price"]')
      .invoke("text")
      .then((valor) => {
        expect(valor).equal(totalPrice.toString());
      });
  }

  clickButtonGotoCheckout() {
    cy.xpath("//button[text()='Go to Checkout']").click();
  }
}
