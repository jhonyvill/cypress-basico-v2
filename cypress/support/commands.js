Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("form").within(() => {
    cy.get("#firstName").type("firstName mock");
    cy.get("#lastName").type("lastName mock");
    cy.get("#email").type("mock@email.com");
    cy.get("#open-text-area").type("text");
    cy.contains('button', "Enviar").click();
  });
})