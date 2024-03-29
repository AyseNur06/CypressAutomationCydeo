const username = `user${Math.floor(Math.random() * 100000 + 100000)
                .toString()
                .substring(1)}`;
const passWord = "Test123456!";

describe('E2E - Test API integrated with UI', () => {
    beforeEach('create a user and generate a token from API and set cookies', () => {
        // following API request is for creating user and setting cookies for the test
        cy.request({
            method : 'POST',
            url : `${Cypress.env('apiUrl')}${Cypress.env('generateUser')}`,
            body : {
                username: username,
                password: passWord,
            }
        }).then ((response) => {
           cy.setCookie('UserID', response.body.userID);
           cy.setCookie('UserName', response.body.username);
        });

        // following request is for creating token and storing into cookies
        cy.request({
            method : 'POST',
            url : `${Cypress.env('apiUrl')}${Cypress.env('generateToken')}`,
            body : {
                username: username,
                password: passWord,
            }
        }).then ((response) => {
           cy.setCookie('token', response.body.token);
           cy.setCookie('expires', response.body.expires);
        });
    })
  
    //  afterEach('Deleting USER created for test purposes', () => {
    //     // we are chaining API requests to login then delete
    //     cy.request({
    //         method : 'POST',
    //     //    url : `${Cypress.env('apiUrl')}${Cypress.env('loginAPI')}`,
    //         url : 'https://demoqa.com/login',
    //         body : {
    //             username: username,
    //             password : passWord,
    //         }
    //     }).then ((response) => {
    //        cy.request({
    //         method : 'DELETE',
    //         headers : {
    //             authorization: `Bearer ${response.body.token}`,
    //         },
    //         url : `${Cypress.env('apiUrl')}${Cypress.env('generateUser')}/${response.body.userId}`,
    //        });        
    //     });
     });


    it('Verify Bookstore Books collection with GET request', {baseUrl: "https://demoqa.com/"}, () =>{
       cy.visit('/profile');
       cy.get('#username-value').contains(username).should('be.visible');
    })
// })