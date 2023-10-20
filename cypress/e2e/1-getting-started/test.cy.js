/// <reference types="cypress" />

describe('Vue.js App Test', () => {
    beforeEach(() => {
      // Visit your Vue.js app's URL
      cy.visit('http://127.0.0.1:5173/');
    });
  
    it('Filters items by brand', () => {
      // Click on the "Adidas" category
      cy.contains('Adidas').click();
  
      // Assert that the filtered items match the brand
      cy.get('.card-wrapper').each((card) => {
        cy.wrap(card).find('.card-content p:first').should('contain', 'Adidas');
      });
  
      // Click on the "All" category to reset the filter
      cy.contains('All').click();
  
      // Assert that all items are displayed
      cy.get('.card-wrapper').should('have.length', 6); // Adjust the count according to your data
  
      
    });
  
    it('Checks content after clicking the "More Details" button', () => {
      // Click the "More Details" button on the first item
      cy.get('.card-wrapper').first().find('button').click();
  
      // Assert that the details page is displayed
      cy.url().should('include', '/ProductDetails/');
  
    });
  });
  