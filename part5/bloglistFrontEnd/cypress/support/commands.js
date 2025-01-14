Cypress.Commands.add("login", ({ username, password }, y=true) => {
  cy.visit("");

  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("#login-button").click();

  if (y === true) {
      cy.contains("Blogs");
  } else {
    return;
  }
});

Cypress.Commands.add("loginAutomatic", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/api/login`, {
    username,
    password,
  }).then(({body}) => {
    localStorage.setItem("loggedBlogappUser", JSON.stringify(body))
    cy.visit("");
    });

});
