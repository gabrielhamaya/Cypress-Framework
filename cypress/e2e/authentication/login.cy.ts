import { UserType } from "../../support/types/user";

describe("Login Test", () => {
  afterEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
  });

  it("Should login successfully with valid credentials", () => {
    cy.login(UserType.validUser).then((user) => {
      cy.get(".username").should("have.text", user.username);
      cy.get("#signin").should("have.text", "Logout");
      cy.title().should("contain", "StackDemo");
      cy.url().should("contain", "signin=true");

      cy.log("sessionStorage", JSON.stringify(sessionStorage));

      cy.window()
        .its("sessionStorage")
        .invoke("getItem", "username")
        .should("exist");

      cy.get(".username").should("exist").should("have.text", user.username);
    });
  });

  it("Should show error message with no credentials", () => {
    cy.visit("/signin");

    cy.get("#login-btn").click();

    cy.get(".api-error")
      .should("exist")
      .should("have.text", "Invalid Username");
  });

  it("Should show error message with invalid credentials", () => {
    cy.login(UserType.invalidUser);

    cy.get(".api-error")
      .should("exist")
      .should("have.text", "Invalid Username");
  });

  it("Should logout successfully", () => {
    cy.login(UserType.validUser);
    cy.logout();
    cy.get("#signin").should("have.text", "Sign In");

    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "username")
      .should("not.exist");

    cy.get(".username").should("not.exist");
  });
});
