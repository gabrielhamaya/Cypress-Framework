import { User, LoginOptions, UserType } from "./user";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Used to perform login action with provided email and password, it clears cookies, visits the signin page, fills in the credentials and submits the form.
       * @param {UserType} userType - The type of user for login.
       */
      login(userType: UserType, options?: LoginOptions): Chainable<User>;

      /**
       * Used to perform logout action, it clears cookies and visits the signout page.
       */
      logout(): Chainable<void>;
    }
  }
}
