describe("blog app", () => {
  beforeEach(function () {
    // Reset the database before each test
    cy.request("POST", `${Cypress.env("BACKEND")}/reset`);

    // Create two default users
    const userDefault1 = {
      username: "gabl123",
      name: "Gabriel",
      password: "senha",
    };

    const userDefault2 = {
      username: "rayk123",
      name: "Rayka",
      password: "senha",
    };

    // Register the default users
    cy.request("POST", `${Cypress.env("BACKEND")}/api/users`, userDefault1);
    cy.request("POST", `${Cypress.env("BACKEND")}/api/users`, userDefault2);
  });

  after(function () {
    // Reset the database after all tests are finished
    cy.request("POST", `${Cypress.env("BACKEND")}/reset`);

    // Re-create default users for potential future runs
    const userDefault1 = {
      username: "gabl123",
      name: "Gabriel",
      password: "senha",
    };

    const userDefault2 = {
      username: "rayk123",
      name: "Rayka",
      password: "senha",
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/api/users`, userDefault1);
    cy.request("POST", `${Cypress.env("BACKEND")}/api/users`, userDefault2);
  });

  it("when pag open sucess", () => {
    // Visit the root URL and check if the login message is displayed
    cy.visit("");
    cy.contains("log in to application");
  });

  it("when login can be did", function () {
    // Perform a login with valid credentials
    cy.login({'username': 'gabl123', 'password': 'senha'});
  });

  it("when create a new blog", function () {
    // Login automatically
    cy.loginAutomatic({'username': 'gabl123', 'password': 'senha'});

    // Click the create button
    cy.get("#create-button").click();
    cy.contains("Create New");

    // Fill in the blog form
    cy.get("#title").type("testTitle for cypress");
    cy.get("#author").type("Cypress");
    cy.get("#url").type("testUrl");

    // Submit the form
    cy.get("#create-buttonInsideForm").click();
    cy.contains("testTitle for cypress"); 
  });

  it("when delete a created blog", function () {
    // Login automatically
    cy.loginAutomatic({'username': 'gabl123', 'password': 'senha'});

    // Create a new blog
    cy.get("#create-button").click();
    cy.contains("Create New");
    cy.get("#title").type("testTitle for cypress");
    cy.get("#author").type("Cypress");
    cy.get("#url").type("testUrl");
    cy.get("#create-buttonInsideForm").click();

    // Wait for a short period
    cy.wait(2000);

    // View and then delete the created blog
    cy.get("#viewButton0").click();
    cy.get("#deleteButton0").click();
  });

  it("when login and logout", function () {
    // Login 
    cy.login({'username': 'gabl123', 'password': 'senha'});

    // Click the logout button
    cy.get("#buttonLogout").click();
    cy.contains("log in to application");
  });

  it("login faled", function(){
    // Attempt to login with invalid credentials
    cy.login({'username': 'gabl123', 'password': 'senhaErrada'}, false);

    // Verify the error message and its styling
    cy.get('#notificationRed').contains('wrong username or password')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border', '2.72727px solid rgb(255, 0, 0)' || '3px solid rgb(255, 0, 0)');

    // Wait for a short period
    cy.wait(4000);

    // Ensure the blog list is not displayed
    cy.get('html').should("not.contain", "Blogs"); 
  });

  it("user2 cant delete a note created by user1", function () {
    // Login as user1
    cy.loginAutomatic({'username': 'gabl123', 'password': 'senha'});

    // Create a new blog as user1
    cy.get("#create-button").click();
    cy.contains("Create New");
    cy.get("#title").type("testTitle for cypress");
    cy.get("#author").type("Cypress");
    cy.get("#url").type("testUrl");
    cy.get("#create-buttonInsideForm").click();
    cy.contains("testTitle for cypress");

    // Logout 
    cy.get("#buttonLogout").click();
    cy.contains("log in to application");

    // Login as user2
    cy.login({'username': 'rayk123', 'password': 'senha'}, true);

    // Verify that the delete button is not present for the blog created by user1
    cy.contains("testTitle for cypress"); 
    cy.get("#viewButton0").click();
    cy.get("html").should('not.contain', /delete/i); 
  });

  it("user2 like a blog of user1 and vice-verce", function () {
    // Login as user1
    cy.loginAutomatic({'username': 'gabl123', 'password': 'senha'});

    // Create a new blog as user1
    cy.get("#create-button").click();
    cy.contains("Create New");
    cy.get("#title").type("testTitle for cypress");
    cy.get("#author").type("Gabriel");
    cy.get("#url").type("testUrl");
    cy.get("#create-buttonInsideForm").click();
    cy.contains("testTitle for cypress Gabriel");

    // Logout
    cy.get("#buttonLogout").click();
    cy.contains("log in to application");

    // Login as user2
    cy.login({'username': 'rayk123', 'password': 'senha'}, true);

    // View and like the blog created by user1
    cy.contains("testTitle for cypress Gabriel"); 
    cy.get("#viewButton0").click();
    cy.get("#likeButton0").click();

    // Verify the success message and the number of likes
    cy.get("#notificationGreen").contains('liked').should('have.css', 'color', 'rgb(0, 128, 0)');
    cy.get('html').should("contain", "likes: 1");

    // Create a new blog as user2
    cy.get("#create-button").click();
    cy.contains("Create New");
    cy.get("#title").type("testTitle for cypress");
    cy.get("#author").type("Rayka");
    cy.get("#url").type("testUrl");
    cy.get("#create-buttonInsideForm").click();
    cy.contains("testTitle for cypress Rayka");

    // View and like the blog created by user2
    cy.get("#viewButton1").click();
    cy.get("#likeButton1").click();

    // Logout
    cy.get("#buttonLogout").click();
    cy.contains("log in to application");

    // Login as user1
    cy.login({'username': 'gabl123', 'password': 'senha'}, true);

    // View and like the blog created by user2
    cy.contains("testTitle for cypress Rayka"); 
    cy.get("#viewButton1").click();
    cy.get("#likeButton1").click();

    // Verify the success message and the number of likes
    cy.get("#notificationGreen").contains('liked').should('have.css', 'color', 'rgb(0, 128, 0)');
    cy.get('html').should("contain", "likes: 1");
  });

  it("if blogs are sorted by number likes", function () {
    // Login as user1
    cy.loginAutomatic({'username': 'gabl123', 'password': 'senha'});

    // Create a new blog as user1
    cy.get("#create-button").click();
    cy.contains("Create New");
    cy.get("#title").type("testTitle for cypress");
    cy.get("#author").type("Gabriel");
    cy.get("#url").type("testUrl");
    cy.get("#create-buttonInsideForm").click();
    
    // Verify that the blog created by user1 is displayed
    cy.contains("testTitle for cypress Gabriel"); 

    // Logout
    cy.get("#buttonLogout").click();
    cy.contains("log in to application");

    // Login as user2
    cy.login({'username': 'rayk123', 'password': 'senha'}, true);

    // Verify that the blog created by user1 is displayed
    cy.contains("testTitle for cypress Gabriel"); 

    // View and like the blog created by user1
    cy.get("#viewButton0").click();
    cy.get("#likeButton0").click();

    // Verify the success message and the number of likes
    cy.get("#notificationGreen").contains('liked').should('have.css', 'color', 'rgb(0, 128, 0)');
    cy.get('html').should("contain", "likes: 1");

    // Create a new blog as user2
    cy.get("#create-button").click();
    cy.contains("Create New");
    cy.get("#title").type("testTitle for cypress");
    cy.get("#author").type("Rayka");
    cy.get("#url").type("testUrl");
    cy.get("#create-buttonInsideForm").click();
    cy.contains("testTitle for cypress Rayka");

    // View and like the blog created by user2
    cy.get("#viewButton1").click();
    cy.get("#likeButton1").click();

    // Logout
    cy.get("#buttonLogout").click();
    cy.contains("log in to application");

    // Login as user1
    cy.login({'username': 'gabl123', 'password': 'senha'}, true);

    // Verify that the blog created by user2 is displayed
    cy.contains("testTitle for cypress Rayka"); 

    // View and like the blog created by user2
    cy.get("#viewButton1").click();
    cy.get("#likeButton1").click();

    // Verify the success message and the number of likes
    cy.get("#notificationGreen").contains('liked').should('have.css', 'color', 'rgb(0, 128, 0)');
    cy.get('html').should("contain", "likes: 1");

    // Logout
    cy.get("#buttonLogout").click();
    cy.contains("log in to application");

    // Login as user2
    cy.login({'username': 'rayk123', 'password': 'senha'}, true);

    // View the blog created by user1
    cy.get('#viewButton0').click();

    // Verify that the blog now has 2 likes
    cy.get('html').should("contain", "likes: 2");

  });
  
});
