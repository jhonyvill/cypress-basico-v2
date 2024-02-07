///<reference types="Cypress"/>
describe("Customer Service Center TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("check the application title", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("fill in the required fields and submit the form", () => {
    const longText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus eos sint eligendi vel dolore, consequatur voluptate cumque ea numquam consequuntur repellendus, excepturi laborum labore quasi unde et perferendis, harum enim.";

    cy.get("#firstName").type("firstName mock");
    cy.get("#lastName").type("lastName mock");
    cy.get("#email").type("mock@email.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();
    cy.get(".success").should("be.visible");
  });

  it("display error message when submitting the form with an email in invalid format", () => {
    cy.get("#firstName").type("firstName mock");
    cy.get("#lastName").type("lastName mock");
    cy.get("#email").type("test");
    cy.get("#open-text-area").type("test");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });
});
