import Quiz from "../../client/src/components/Quiz";
import "@testing-library/cypress/add-commands";

describe("Quiz Component", () => {
    beforeEach(() => {
        cy.intercept({
            method: "GET",
            url: "/api/questions/random",
        }, 
        {
            fixture: "questions.json",
            statusCode: 200,
        }
        ).as("getQuestions");
    });

    it('should display a question and start quiz', () => {
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').click();
        cy.get('card').should('be.visible');
        cy.get('h2').should('not.be.empty');
    });

    it('should select answers for questions and finish quiz', () => {
        cy.mount(<Quiz />);
        cy.get('button').contains('Start Quiz').click();

        cy.get('button').contains('1').click();
        cy.get('.alert-success').should('be.visible').and('contain', 'Quiz Completed');
        
    });
    

})
