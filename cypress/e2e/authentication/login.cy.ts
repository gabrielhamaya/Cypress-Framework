import { UserType } from "../../support/types/user";

describe("Login Test", () => {
  afterEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
  });

  describe("Successful login with valid user", () => {
    it("Should login successfully with valid credentials", () => {
      cy.login(UserType.validUser).then((user) => {
        cy.get(".username").should("exist").and("have.text", user.username);
        cy.get("#signin").should("have.text", "Logout");
        cy.title().should("contain", "StackDemo");
        cy.url().should("contain", "signin=true");
        cy.window()
          .its("sessionStorage")
          .invoke("getItem", "username")
          .should("exist");
      });
    });

    it("Should logout successfully when logged in", () => {
      cy.login(UserType.validUser);
      cy.logout();
      cy.get("#signin").should("have.text", "Sign In");
      cy.get(".username").should("not.exist");
      cy.window()
        .its("sessionStorage")
        .invoke("getItem", "username")
        .should("not.exist");
    });
  });

  describe("Unsuccessful login", () => {
    describe("Login with unregistered user", () => {
      it("Should show error message with unregistered user", () => {
        cy.login(UserType.unregisteredUser);
        cy.get(".api-error")
          .should("exist")
          .and("have.text", "Invalid Username");
      });

      it("Should show error message with unregistered passwordless user", () => {
        cy.login(UserType.unregisteredUser, { skipPassword: true });
        cy.get(".api-error")
          .should("exist")
          .and("have.text", "Invalid Username");
      });

      it("Should show error message with unregistered usernameless user", () => {
        cy.login(UserType.unregisteredUser, { skipUsername: true });
        cy.get(".api-error")
          .should("exist")
          .and("have.text", "Invalid Username");
      });
    });

    describe("Login with valid user but missing credentials", () => {
      it("Should show error message with no credentials", () => {
        cy.visit("/signin");
        cy.get("#login-btn").click();
        cy.get(".api-error")
          .should("exist")
          .and("have.text", "Invalid Username");
      });

      it("Should show error message with valid passwordless credentials", () => {
        cy.login(UserType.validUser, { skipPassword: true });
        cy.get(".api-error")
          .should("exist")
          .and("have.text", "Invalid Password");
      });

      it("Should show error message with valid usernameless credentials", () => {
        cy.login(UserType.validUser, { skipUsername: true });
        cy.get(".api-error")
          .should("exist")
          .and("have.text", "Invalid Username");
      });
    });
  });
});
