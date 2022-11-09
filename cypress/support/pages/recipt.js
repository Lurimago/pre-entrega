export class Recipt {
  constructor() {
    this.ShowPricebutton = '//button[text()="Show total price"]';
    this.checkoutbutton = '//button[text()="Go to Checkout"]';
  }
  checkName(nombre) {
    cy.xpath(`//p[contains(@id,"name")]`)
      .invoke("text")
      .then((info) => {
        expect(info).to.include(nombre);
      });
  }

  checkLastName(apellido) {
    cy.xpath(`//p[contains(@id,"name")]`)
      .invoke("text")
      .then((info) => {
        expect(info).to.include(apellido);
      });
  }

  checkProduct(producto) {
    cy.xpath(`//p[contains(@id,"${producto}")]`)
      .invoke("text")
      .then((info) => {
        expect(info).to.include(producto);
      });
  }
  checkCreditCard(card) {
    cy.xpath(`//p[contains(@id,"creditCard")]`)
      .invoke("text")
      .then((info) => {
        expect(info).equal(card);
      });
  }

  checkTotalPrice(precio) {
    cy.xpath(`//p[contains(@id,"totalPrice")]`)
      .invoke("text")
      .then((info) => {
        expect(info).to.include(precio);
      });
  }
}
