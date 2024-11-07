it.only('test the privacy policy page independently.', () => {
    cy.visit('./src/privacy.html');
    cy.contains('Talking About Testing').should('be.visible');
})