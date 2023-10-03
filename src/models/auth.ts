export interface LoginError {
  isError: boolean;
  message: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
