// cypress/integration/example.spec.js

describe('My Example Test', () => {
    it('Visits the local app, enters text, and checks content', () => {
      // Visit your local web application's URL
      cy.visit('http://127.0.0.1:5173/');
  
      // Find the input field and type text into it
      cy.get('input[type="text"]').type('Cypress is awesome!');
  
      // Find the button and click it
      cy.get('button').click();
  
      // Assert that the updated content is displayed
      cy.get('#updated-content').should('contain', 'Cypress is awesome!');
    });
  });
  