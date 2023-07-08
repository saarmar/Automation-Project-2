import { faker } from '@faker-js/faker';

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //System will already open issue creating modal in beforeEach block  
      cy.visit(url + '/board?modal-issue-create=true');
    });
  });

  it('Should create an issue and validate it successfully', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {

      //open issue type dropdown and choose Story
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]')
        .trigger('click');

      //Type value to description input field
      cy.get('.ql-editor').type('TEST_DESCRIPTION');

      //Type value to title input field
      //Order of filling in the fields is first description, then title on purpose
      //Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type('TEST_TITLE');

      //Select Lord Gaben from reporter dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');

    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')
        .contains('TEST_TITLE');
      //Assert that correct avatar and type icon are visible
      cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
      cy.get('[data-testid="icon:story"]').should('be.visible');
    });
  });

  it('Should validate title is required field if missing', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      //Try to click create issue button without filling any data
      cy.get('button[type="submit"]').click();

      //Assert that correct error message is visible
      cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });


  //Assignment 2. Test1
  it('Should create an issue and validate it successfully 1', () => {

    const issueData = {
      title: "Bug",
      type: "Bug",
      description: "My bug description",
      assignee: "Lord Gaben",
      reporter: "Pickle Rick",
      priority: "Highest",
    };

    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {

      //open issue type dropdown and choose Bug
      cy.get('[data-testid="select:type"]').click();
      cy.get(`[data-testid="select-option:${issueData.type}"]`)
        .trigger('click');

      //Type value to description input field
      cy.get('.ql-editor').type(issueData.description);

      //Type value to title input field
      //Order of filling in the fields is first description, then title on purpose
      //Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type(issueData.title);

      //Select Priority "Highest" from priority dropdown
      cy.get('[data-testid="select:priority"]').click();
      cy.get(`[data-testid="select-option:${issueData.priority}"]`).click();

      //Select Pickle Rick from reporter dropdown
      cy.get(`[data-testid="select:reporterId"]`).click()
      cy.get(`[data-testid="select-option:${issueData.reporter}"]`).click()

      //Select Lord Gaben from assignee dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get(`[data-testid="select-option:${issueData.assignee}"]`).click();

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');

    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')
        .contains(issueData.title);
      //Assert that correct avatar and type icon are visible
      cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
      cy.get('[data-testid="icon:story"]').should('be.visible');
    });
  });


  //Assignment 2. Test2
  it.only('Should create an issue and validate it successfully 2', () => {

    const issueData = {
      title: faker.lorem.word(),
      type: "Task",
      description: faker.lorem.sentence(),
      assignee: "Baby Yoda",
      reporter: "Baby Yoda",
      priority: "Low",
    };

    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {

      //assert issue type 'task' selected
      cy.get('[data-testid="icon:task"]').should('be.visible')

      //Type value to description input field
      cy.get('.ql-editor').type(issueData.description);

      //Type value to title input field
      //Order of filling in the fields is first description, then title on purpose
      //Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type(issueData.title);

      //Select Priority "Highest" from priority dropdown
      cy.get('[data-testid="select:priority"]').click();
      cy.get(`[data-testid="select-option:${issueData.priority}"]`).click();

      //Select user from assignee dropdown
      cy.get('[data-testid="select:userIds"]').click()
      cy.get(`[data-testid="select-option:${issueData.assignee}"]`).click()

      //Select Lord Gaben from reporter dropdown
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get(`[data-testid="select-option:${issueData.reporter}"]`).click();

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');

    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')
        .contains(issueData.title);
      //Assert that correct avatar and type icon are visible
      cy.get(`[data-testid="avatar:${issueData.reporter}"]`).should('be.visible');
      cy.get('[data-testid="icon:story"]').should('be.visible');


    });
  });
});