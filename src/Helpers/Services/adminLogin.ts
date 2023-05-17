import ajax from "./ajax";

export const adminLogin = () =>
  ajax.post("login", {
    email:'admin',
    password:'admin'
  });