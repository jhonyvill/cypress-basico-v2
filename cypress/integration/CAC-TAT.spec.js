
///<reference types="Cypress"/>
describe("Customer Service Center TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("check the application title", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("fill in the required fields and submit the form", () => {
    cy.get('#firstName').type("firstName mock");
    cy.get('#lastName').type("lastName mock");
    cy.get('#email').type("mock@email.com");
    cy.get('#open-text-area').type("text mock");
    cy.get('button[type="submit"]').click();
    cy.get('.success').should("be.visible");
  });
});