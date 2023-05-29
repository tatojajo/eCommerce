import ajax from "./ajax";
import axios from "axios";
import { isAuthenticated } from "../Auth/isAuthenticated";
const { userToken } = isAuthenticated();

export const userlogin = (user: SignInInitialValue) =>
  ajax.post("login", {
    email: user.email,
    password: user.password,
  });

// export const getMyInfo = async () => {
//   const { userToken } = isAuthenticated();
//   try {
//     const { data } = await axios.get("http://localhost:8080/me", {
//       headers: {
//         Authorization: userToken,
//       },
//     });
//     console.log(data);
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     throw error;
//   }
// };
export const editPersonalInfo = (userPersonalInfo:User) =>
  ajax.post("http://localhost:8080/user",userPersonalInfo, {
    headers: {
      Authorization: userToken,
    },
  });
