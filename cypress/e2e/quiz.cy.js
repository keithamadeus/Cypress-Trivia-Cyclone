describe('Quiz E2E', () => {
    beforeEach(() => {
      // Intercept the API call to return mock data for the quiz questions
      cy.intercept(
        {
          method: 'GET',
          url: '/api/questions/random', // Adjust the URL if necessary
        },
        {
          fixture: 'questions.json', // Mocked questions data
          statusCode: 200,           // Simulate successful response
        }
      ).as('getRandomQuestion');
  
      // Visit the main page (adjust path as needed based on your routing)
      cy.visit('/');
    });
  
    it('should start the quiz and display the first question', () => {
      // Ensure the "Start Quiz" button is present and click it
      cy.get('button').contains('Start Quiz').click();
  
      // Wait for the mock questions to load
      cy.wait('@getRandomQuestion');
  
      // Ensure the question card is visible
      cy.get('.card').should('be.visible');
  
      // Check that the question text is populated (it shouldn't be empty)
      cy.get('h2').should('not.be.empty');
    });
  
    it('should answer questions and complete the quiz', () => {
      // Start the quiz by clicking the "Start Quiz" button
      cy.get('button').contains('Start Quiz').click();
  
      // Wait for the questions data to load
      cy.wait('@getRandomQuestion');
  
      // Answer the first question (click the "1" button for the first answer option)
      cy.get('button').contains('1').click();
  
      // Optionally, answer other questions here if needed, repeating the process
      // For now, assume 1 question is enough to proceed to the completion screen
  
      // Verify that the quiz has completed and the score is visible
      cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
    });
  
    it('should restart the quiz after completion', () => {
      // Start the quiz by clicking the "Start Quiz" button
      cy.get('button').contains('Start Quiz').click();
  
      // Wait for the questions data to load
      cy.wait('@getRandomQuestion');
  
      // Answer the first question
      cy.get('button').contains('1').click();
  
      // Wait for quiz completion (check for the score message)
      cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
  
      // Restart the quiz by clicking the "Take New Quiz" button
      cy.get('button').contains('Take New Quiz').click();
  
      // Verify that the quiz has restarted and the first question is visible
      cy.get('.card').should('be.visible');
      cy.get('h2').should('not.be.empty');
    });
  });