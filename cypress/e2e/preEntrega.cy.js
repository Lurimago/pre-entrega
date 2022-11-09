/// <reference types="cypress" />

import { HomePage } from "../support/pages/homePage";
import { Products } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { Checkout } from "../support/pages/checkout";
import { Recipt } from "../support/pages/recipt";

describe("POM", () => {
  let datosCheckout;
  let datosProducts;
  const user = "Lurimago";
  const pass = "123456!";
  const sex = "male";
  const day = 13;
  const month = "December";
  const year = 1992;
  const homepage = new HomePage();
  const products = new Products();
  const shoppingCartPage = new ShoppingCartPage();
  const checkout = new Checkout();
  const recipt = new Recipt();

  before("before", () => {
    cy.fixture("checkout").then((data) => {
      datosCheckout = data;
    });
    cy.fixture("datosProductos").then((data2) => {
      datosProducts = data2;
    });

    cy.request({
      url: "https://pushing-it-backend.herokuapp.com/api/register",
      method: "POST",
      body: {
        username: user,
        password: pass,
        gender: sex,
        day: day,
        month: month,
        year: year,
      },
    }).then(() => {
      cy.request({
        url: "https://pushing-it-backend.herokuapp.com/api/login",
        method: "POST",
        body: {
          username: user,
          password: pass,
        },
      }).then((respuesta) => {
        window.localStorage.setItem("token", respuesta.body.token);
        window.localStorage.setItem("user", respuesta.body.user.username);
      });
      cy.visit("");
    });
  });

  it("Test", () => {
    homepage.clickOnlineShopLink();
    products.addProducts(datosProducts.productoUnoNombre);
    products.clickCloseButton();
    products.addProducts(datosProducts.productoDosNombre);
    products.clickCloseButton();
    products.clickButtonGoShoppingCart();

    shoppingCartPage.checkProduct(datosProducts.productoUnoNombre);
    shoppingCartPage.checkPriceProduct(
      datosProducts.productoUnoNombre,
      datosProducts.productoUnoPrecio
    );
    shoppingCartPage.checkProduct(datosProducts.productoDosNombre);
    shoppingCartPage.checkPriceProduct(
      datosProducts.productoDosNombre,
      datosProducts.productoDosPrecio
    );

    shoppingCartPage.clickShowTotalPriceButton();

    shoppingCartPage.checkTotalPrice(
      datosProducts.productoUnoPrecio + datosProducts.productoDosPrecio
    );

    shoppingCartPage.clickButtonGotoCheckout();

    checkout.firstName(datosCheckout.nombre);
    checkout.lastName(datosCheckout.apellido);
    checkout.cardNumber(datosCheckout.tarjeta);
    checkout.purchaseButton();

    cy.wait(8000);
    recipt.checkName(datosCheckout.nombre);
    recipt.checkLastName(datosCheckout.apellido);

    recipt.checkProduct(datosProducts.productoUnoNombre);
    recipt.checkProduct(datosProducts.productoDosNombre);

    recipt.checkCreditCard(datosCheckout.tarjeta);
    recipt.checkTotalPrice(
      datosProducts.productoUnoPrecio + datosProducts.productoDosPrecio
    );
  });

  after("Deleting User", () => {
    cy.request({
      url: `https://pushing-it-backend.herokuapp.com/api/deleteuser/${user}`,
      method: "DELETE",
    });
  });
});
