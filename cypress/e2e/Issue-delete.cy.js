
describe('Issue deletion assignment', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            //opens first available issue in backlog column 
            cy.get('[data-testid="board-list:backlog"]').children().eq(0).click();
            //asserts that issue detail view is visible
            cy.get('[data-testid="board-list:backlog"]').children().eq(0).should('be.visible')
        });
    });

    it('Should delete the issue and not display it on Jira board', () => {

        // delete issue
        cy.get('[data-testid="icon:trash"]').click()
        cy.get('[data-testid="modal:confirm"]').should('be.visible')
        cy.contains('Delete issue').click()

        //confirms that confirmation window is no longer visible
        cy.get('[data-testid="modal:confirm"]').should('not.exist')

        //asserts that issue is deleted and not displayed on the Jira board
        cy.get('[data-testid="list-issue"]').contains('This is an issue of type: Task').should('not.exist')

    });



        it('cancelling deletion process assignment 2', () => {

            //asserts that issue detail view is visible
            cy.get('[data-testid="board-list:backlog"]').children().eq(0).should('be.visible')

            //cancelling the deletion process
            cy.get('[data-testid="icon:trash"]').click()
            cy.get('[data-testid="modal:confirm"]').should('be.visible')
            cy.contains('Cancel').click()

            //confirms that confirmation window is not visible
            cy.get('[data-testid="modal:confirm"]').should('not.exist')

            //confirms that issue is not deleted and stil displayed on the Jira board
            cy.get('[data-testid="board-list:backlog"]').children().eq(0).should('be.visible')

        });
});