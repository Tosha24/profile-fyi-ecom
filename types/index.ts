export type CreateUserParams = {
  email: string;
  password: string;
};

export interface CookieData {
  userId?: string;
}

export type CheckUserExistsParams = {
  email: string;
  password: string;
};
