export interface User {
  username: string;
  password: string;
}

export enum UserType {
  validUser = "valid-user",
  unregisteredUser = "unregistered-user",
}

export type LoginOptions = {
  skipUsername?: boolean;
  skipPassword?: boolean;
};
