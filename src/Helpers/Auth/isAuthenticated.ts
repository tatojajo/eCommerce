import jwtDecode from "jwt-decode";

type UserObject = {
  exp: number;
  isAdmin: boolean;
  userId: string;
};

export const isAuthenticated = () => {
  const userToken = localStorage.getItem("AccessToken");
  if (!userToken) return false;
  const userObject: UserObject = jwtDecode(userToken);
  return Date.now() / 1000 < userObject.exp;
};
