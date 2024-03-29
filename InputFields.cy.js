describe('Different TYpe Input Fields Tests', () =>{
    beforeEach('Navigate to Login page', () =>{
        cy.clearCookies();
        cy.visit('/registration_form');
    })

    xit('Input Boxes', () => {
        cy.get('input[name="firstname"]').type('Mike');
        cy.get('input[name="lastname"]').type('Brown');
        cy.get('input[name="username"]').type('CrazyHeart');
        cy.get('input[name="email"]').type('testuser123@cydeo.com');
        cy.get('input[name="password"]').type('Cy123asdfgh');
        cy.get('input[name="phone"]').type('555-000-1234');
    })

    xit('Check different radio button actions', ()=>{
        cy.get('.radio')
        .find('[type=radio]')
        .then((radioButtons) =>{
            // get all radio buttons, find the first one check it and assert whether it is checked
        cy.wrap(radioButtons).first().check().should('be.checked');    
        // use index of the list element then check it is checked
        cy.wrap(radioButtons).eq(1).check().should('be.checked');
        //verify that 3rd one is not checked
        cy.wrap(radioButtons).eq(2).should('not.be.checked');
    })
  })

  xit ('Check different type of checkbox actions', ()=>{
    cy.get('[type="checkbox"]').then((checkbox) =>{
        // check Java is selected and verify checked
        cy.wrap(checkbox).eq(1).check().should('be.checked');
        //uncheck and assert it is unchecked
        cy.wrap(checkbox).eq(1).uncheck().should('not.be.checked');
        //verify that third box value is JavaScript 
        cy.wrap(checkbox).eq(2).should('have.value', 'javascript').check().should('be.checked');
    })

  xit('Check Select Dropdown and select single choice', ()=>{
    // locate top select menu locator then use select function
    cy.get('select[name="job_title"]').select('SDET');

    //locate the same menu again and verify value contains SDET
    cy.get('select[name="job_title"]').contains('SDET').should('have.value','SDET');
    })
})

it('Select all of the dropdown options', ()=>{
    cy.fixture('departments').then((departments) => {
        cy.get('select[name="department"] > option').each((option, index, allOptions) => {
            // get each option text
            const optionText = option.text();

        cy.get('select[name="department"]')
        .select(optionText)
        .should('have.value', option.val())
      //  .contains(departments[index])    
          })
       })
      })
 })
