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
  console.log(userObject)
  if (Date.now() / 1000 > userObject.exp) {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("User");
    return false
  }
 
  return Date.now() / 1000 < userObject.exp;
};
