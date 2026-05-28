export interface User {
  username: string;
  password: string;
}

export enum UserType {
  validUser = "valid-user",
  invalidUser = "invalid-user",
}
