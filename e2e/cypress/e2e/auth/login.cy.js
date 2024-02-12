describe("Login Flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3003");
  });

  it("Login", () => {
    cy.contains("Empieza aquí").click();
    cy.contains("Accede").click();
    cy.get('input[placeholder="Email"]').first().type("test@cypress.com");
    cy.get('input[placeholder="Contraseña"]').type("Cypress123");
    cy.contains("Iniciar Sesión").click();
    cy.get('input[placeholder="Cuál es tu dirección?"]').type("nuclio");
    cy.get("ul > li").first().click();
    cy.get("._restaurantGrid_1be8d_15", { timeout: 10000 })
      .should("be.visible")
      .find("._mainContainer_17otr_1")
      .first()
      .click();
    // cy.get('button[class="button._addToCart_1e8zj_50"]').first().click();
  });
});

// it("Hacer un pedido", () => {
//   cy.get('input[placeholder="Cuál es tu dirección?"]').type("nuclio");
// });
