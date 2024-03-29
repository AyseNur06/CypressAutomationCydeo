describe('Testing alerts in Cypress environment', { baseUrl: "https://demoqa.com/"}, () => {

beforeEach(() => {
    cy.clearAllCookies();
    cy.visit('/alerts'); 
})

    it ('Check alert confirmation', () => {
     //   cy.get('#confirmButton').click();  // this triggers alert! But we don't use it.

     /**
     Browser commands: window:alert, window:confirmation, window:on etc...
      */
     const stub = cy.stub();
     cy.on('window:confirm', stub); //this action stores confirmation into stub function
     cy.get('#confirmButton')
     .click()
     .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?')
     });
     cy.on('window:confirm', () => true);
     cy.contains('You selected Ok').should('be.visible');
    })

    it('Check alert cancellation', () => {
        const stub = cy.stub();
        cy.on('window:confirm', stub); //this action stores confirmation into stub function
        cy.get('#confirmButton')
        .click()
        .then(() => {
           expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?')
        });
        cy.on('window:confirm', () => false);
        cy.contains('You selected Cancel').should('be.visible');
    })
})