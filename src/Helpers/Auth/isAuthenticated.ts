import jwtDecode from "jwt-decode";

export type UserObject = {
  exp: number;
  isAdmin: boolean;
  userId: string;
};

export type AuthenticationResult = {
  isUser: boolean;
  isAdmin: boolean;
  userToken?: string;
};

export const isAuthenticated = (): AuthenticationResult => {
  const userToken = localStorage.getItem("AccessToken");
  if (!userToken) {
    return { isUser: false, isAdmin: false };
  }
  const userObject: UserObject = jwtDecode(userToken);
  console.log(userObject);
  if (Date.now() / 1000 > userObject.exp) {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("User");
    return { isUser: false, isAdmin: false };
  }

  return { isUser: true, isAdmin: userObject.isAdmin, userToken };
};
console.log(isAuthenticated());
