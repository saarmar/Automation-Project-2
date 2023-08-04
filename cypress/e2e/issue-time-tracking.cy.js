

describe('Issue time tracking', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.visit(url + '/board?modal-issue-create=true');
    });
  });

  const testName = 'Time_Tracking_Test';
  const firstEstimate = '10'
  const editEstimate = '20'
  const timeSpent = '2'
  const timeRemaining = '5'

  it('Creates an issue. Adds, edits and removes time estimation', () => {

    //Creates an issue
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').type('Test time tracking');
      cy.get('input[name="title"]').type(testName);
      cy.get('button[type="submit"]').debounced('click');
    });

    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    cy.contains(testName).debounced('click');

    //Time estimation is 0. Change to 10
    cy.get('input[placeholder="Number"]').should('be.visible').should('be.empty').should('have.value', '');
    cy.contains('No time logged').should('be.visible');
    cy.get('input[placeholder="Number"]');
    cy.get('input[placeholder="Number"]').debounced('type', firstEstimate);
    cy.contains(`${firstEstimate}h estimated`).should('be.visible');
    cy.get('[data-testid="icon:close"]').click();

    cy.contains(testName).click();
    cy.get('input[placeholder="Number"]').should('have.value', firstEstimate);
    cy.contains(`${firstEstimate}h estimated`).should('be.visible');

    //Edit time estimation to 20
    cy.get('input[placeholder="Number"]').clear().debounced('type', editEstimate);
    cy.contains(`${editEstimate}h estimated`).should('be.visible');
    cy.contains(`${firstEstimate}h estimated`).should('not.exist');
    cy.get('[data-testid="icon:close"]').click();

    cy.contains(testName).click();
    cy.get('input[placeholder="Number"]').should('have.value', editEstimate);
    cy.contains(`${editEstimate}h estimated`).should('be.visible');
    cy.contains(`${firstEstimate}h estimated`).should('not.exist');

    //Removes time estimation
    cy.get('input[placeholder="Number"]').debounced('clear');
    cy.contains(`${editEstimate}h estimated`).should('not.exist');
    cy.get('[data-testid="icon:close"]').click();

    cy.contains(testName).click();
    cy.get('input[placeholder="Number"]').should('be.visible').should('be.empty').should('have.value', '');
    cy.contains(`${editEstimate}h estimated`).should('not.exist');

  });


  it('Should create issue and add/remove logged time', () => {

    //Creates an issue
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').type('Test time logging');
      cy.get('input[name="title"]').type(testName);
      cy.get('button[type="submit"]').debounced('click');
    });

    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    cy.contains(testName).debounced('click');

    //Checks that no time is logged and changes it
    cy.contains('No time logged').should('be.visible')
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').should('be.visible').within(() => {
      cy.get('input[placeholder="Number"]').first().type(timeSpent);
      cy.get('input[placeholder="Number"]').last().type(timeRemaining);
      cy.contains('Done').debounced('click');
    });

    cy.contains('No time logged').should('not.exist');
    cy.contains(`${timeSpent}h logged`).should('be.visible');
    cy.contains(`${timeRemaining}h remaining`).should('be.visible');
    cy.get('[data-testid="icon:close"]').click();

    cy.contains(testName).click();
    cy.contains('No time logged').should('not.exist');
    cy.contains(`${timeSpent}h logged`).should('be.visible');
    cy.contains(`${timeRemaining}h remaining`).should('be.visible');

    //Removes logged time
    cy.contains(`${timeSpent}h logged`).should('be.visible');
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.get('input[placeholder="Number"]').first().clear();
      cy.get('input[placeholder="Number"]').last().clear();
      cy.contains('Done').debounced('click');
    });

    cy.contains('No time logged').should('be.visible');
    cy.contains(`${timeSpent}h logged`).should('not.exist');
    cy.contains(`${timeRemaining}h remaining`).should('not.exist');
    cy.get('[data-testid="icon:close"]').click();

    cy.contains(testName).click();
    cy.contains('No time logged').should('be.visible');
    cy.contains(`${timeSpent}h logged`).should('not.exist');
    cy.contains(`${timeRemaining}h remaining`).should('not.exist');

  });

});