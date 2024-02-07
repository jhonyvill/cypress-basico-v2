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

  it("keeps the phone field empty when a non-numeric value is entered", () => {
    cy.get("#phone").type("abcdefghijklmnopqrstuvwxyz").should("have.text", "");
  });

  it("display error message when phone number is required but is empty", () => {
    cy.get("#firstName").type("firstName mock");
    cy.get("#lastName").type("lastName mock");
    cy.get("#email").type("mock@email.com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("test");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it("fill in and clear the name, surname, email and telephone fields", () => {
    cy.get("#firstName")
      .type("name mock")
      .should("have.value", "name mock")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("last name mock")
      .should("have.value", "last name mock")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("mock@email.com")
      .should("have.value", "mock@email.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("999999999")
      .should("have.value", "999999999")
      .clear()
      .should("have.value", "");
  });

  it("displays an error message when submitting form without required fields", () => {
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });
});
