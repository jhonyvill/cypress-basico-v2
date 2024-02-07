
///<reference types="Cypress"/>
describe("Customer Service Center TAT", () => {
  it("check the application title", () => {
    cy.visit("./src/index.html");
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
});