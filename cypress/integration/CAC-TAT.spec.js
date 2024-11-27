///<reference types="Cypress"/>
describe("Customer Service Center TAT", () => {
  const THREE_SECONDS_IN_MILLISENCONDS= 3000;

  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("check the application title", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("fill in the required fields and submit the form", () => {
    const longText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus eos sint eligendi vel dolore, consequatur voluptate cumque ea numquam consequuntur repellendus, excepturi laborum labore quasi unde et perferendis, harum enim.";

    cy.clock();
    cy.get("#firstName").type("firstName mock");
    cy.get("#lastName").type("lastName mock");
    cy.get("#email").type("mock@email.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains('button', "Enviar").click();

    cy.get(".success").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MILLISENCONDS);
    cy.get(".success").should("not.be.visible");
  });

  it("display error message when submitting the form with an email in invalid format", () => {
    cy.clock();
    cy.get("#firstName").type("firstName mock");
    cy.get("#lastName").type("lastName mock");
    cy.get("#email").type("test");
    cy.get("#open-text-area").type("test");
    cy.contains('button', "Enviar").click();

    cy.get(".error").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MILLISENCONDS);
    cy.get(".error").should("not.be.visible");
  });

  it("keeps the phone field empty when a non-numeric value is entered", () => {
    cy.get("#phone").type("abcdefghijklmnopqrstuvwxyz").should("have.text", "");
  });

  it("display error message when phone number is required but is empty", () => {
    cy.clock();
    cy.get("#firstName").type("firstName mock");
    cy.get("#lastName").type("lastName mock");
    cy.get("#email").type("mock@email.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("test");
    cy.contains('button', "Enviar").click();

    cy.get(".error").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MILLISENCONDS);
    cy.get(".error").should("not.be.visible");
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
    cy.clock();
    cy.contains('button', "Enviar").click();
    cy.get(".error").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MILLISENCONDS);
    cy.get(".error").should("not.be.visible");
  });

  it("successfully submits the form using a custom command", () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MILLISENCONDS);
    cy.get(".success").should("not.be.visible");
  });

  it("select a product (YouTube) by its text", () => {
    cy.get("#product")
      .select("YouTube")
      .should("have.value", "youtube");
  });

  it("select a product (Mentorship) by its value", () => {
    cy.get("#product")
      .select("mentoria")
      .should("have.value", "mentoria");
  });

  it("select a product (Blog) by its index", () => {
    cy.get("#product")
      .select(1)
      .should("have.value", "blog");
  });
  
  it('checkmark the type of service as "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it('checkmark each type of service', () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each($radio => {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it('check both checkboxes, then uncheck the last one.', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked');
  });
  
  it('select a file from the fixtures folder.', () => {
    cy.get('input[type=file]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function(input){
      expect(input[0].files[0].name).to.equal('example.json')
    });
  });

  it('select a file by simulating a drag-and-drop.', () => {
    cy.get('input[type=file]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function(input){
      expect(input[0].files[0].name).to.equal('example.json')
    });
  });

  it('select a file using a fixture that has been given an alias.', () => {
    cy.fixture("example.json").as('sampleFile')
    cy.get('input[type=file]')
    .should('not.have.value')
    .selectFile('@sampleFile')
    .should(function(input){
      expect(input[0].files[0].name).to.equal('example.json')
    });
  });

  it('check that the privacy policy opens in another tab without the need for a click.', () => {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank');
  });

  it('access the privacy policy page by removing the target and then clicking the link.', () => {
    cy.get('#privacy a')
      .invoke('removeAttr','target')
      .click();

      cy.contains('Talking About Testing').should('be.visible');
  })

  it('display and hide success and error messages using .invoke()', () => {
    cy.get(".success")
      .invoke("show")
      .should("be.visible")
      .and("contain","Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .invoke("show")
      .should("be.visible")
      .and("contain","Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  })

  it("fills the text area using the invoke command", () => {
    const longText = Cypress._.repeat("0123456789", 20);
    cy.get("#open-text-area")
    .invoke("val", longText)
    .should("have.value", longText);
  })

});
