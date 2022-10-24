/// <reference types="cypress" />

import { LoginPage } from "../support/pages/loginPage";
import { RegistroPage } from "../support/pages/registroPage";
import { HomePage } from "../support/pages/homePage";
import { Products } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";

describe("Esperas", () => {
  let datosLogin;
  let datosProducts;
  const loginPage = new LoginPage();
  const registroPage = new RegistroPage();
  const homepage = new HomePage();
  const products = new Products();
  const shoppingCartPage = new ShoppingCartPage();

  before("before", () => {
    cy.fixture("datosUsuario").then((data) => {
      datosLogin = data;
    });
    cy.fixture("datosProductos").then((data2) => {
      datosProducts = data2;
    });
  });

  beforeEach("beforeEach", () => {
    cy.visit("");
    registroPage.ClickRegisterTogleButton();
    loginPage.login(
      datosLogin.datosValidos.usuario,
      datosLogin.datosValidos.contraseña
    );
  });

  it("Deberia agregar 3 tareas al todo list", () => {
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
  });
});
