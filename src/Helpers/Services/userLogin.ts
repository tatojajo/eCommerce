import ajax from "./ajax";

export const userlogin = (user: SignInInitialValue) =>
  ajax.post("login", {
    email: user.email,
    password: user.password,
  });
