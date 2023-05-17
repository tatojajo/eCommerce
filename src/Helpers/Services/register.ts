import ajax from "./ajax";

export const registerUser = (user:RegisterInitialValue) =>
  ajax.post("register", {
    "firstName": user.firstName,
    "lastName": user.lastName,
    "phoneNumber": user.phoneNumber,
    "email": user.email,
    "password": user.password
  });