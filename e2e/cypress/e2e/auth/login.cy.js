describe("Login Flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3003");
  });

  it("can click empieza aqui button", () => {
    cy.contains("Empieza aquí");
  });
});
