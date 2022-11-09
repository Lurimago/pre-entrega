export class Checkout {
  firstName(nombre) {
    cy.get("#FirstName").type(nombre);
  }

  lastName(apellido) {
    cy.get("#lastName").type(apellido);
  }

  cardNumber(numeroTarjeta) {
    cy.get("#cardNumber").type(numeroTarjeta);
  }

  purchaseButton() {
    cy.xpath("//button[text()='Purchase']").click();
  }
}
