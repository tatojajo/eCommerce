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
  if (Date.now() / 1000 > userObject.exp) {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("User");
    return { isUser: false, isAdmin: false };
  }
  if (userObject.isAdmin) {
    return { isUser: false, isAdmin: true, userToken };
  }
  if (!userObject.isAdmin) {
    return { isUser: true, isAdmin: false, userToken };
  }
  return { isUser: false, isAdmin: false };
};
