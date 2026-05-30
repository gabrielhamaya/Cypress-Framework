import { User, LoginOptions, UserType } from "../types/user";

Cypress.Commands.add("login", (userType: UserType, options?: LoginOptions) => {
  cy.fixture<User>(`users/${userType}.json`).then((user) => {
    const { username, password } = user;

    cy.visit("/signin");

    if (!options?.skipUsername) cy.get("#username").type(`${username}{enter}`);

    if (!options?.skipPassword) cy.get("#password").type(`${password}{enter}`);

    cy.get("#login-btn").click();

    cy.wrap(user);
  });
});

Cypress.Commands.add("logout", () => {
  cy.get("#signin").click();
});
