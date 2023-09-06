export interface UsersAddOption {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface UsersLoginOption {
  email: string;
  password: string;
}

export interface UsersToken {
  token: string;
  expiryInDays: number;
}
