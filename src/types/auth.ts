export type ILogin = {
  emailOrUsername: string;
  password: string;
};

export type IRegister = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type IForgotPassword = {
  email: string;
};

export type IResetPassword = {
  password: string;
  password_confirmation: string;
};
