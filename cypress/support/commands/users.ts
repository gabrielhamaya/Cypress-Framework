import { User, UserType } from "../types/user";

Cypress.Commands.add("login", (userType: UserType) => {
  cy.fixture<User>(`users/${userType}.json`).then((user) => {
    const { username, password } = user;

    cy.visit("/signin");
    cy.get("#username").type(`${username}{enter}`);
    cy.get("#password").type(`${password}{enter}`);
    cy.get("#login-btn").click();

    cy.wrap(user);
  });
});

Cypress.Commands.add("logout", () => {
  cy.get("#signin").click();
});
