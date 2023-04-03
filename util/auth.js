import axios from "axios";
import { BACKEND_URL } from "@env";
export const creatUser = async (email, password) => {
  try {
    const response = await axios.post(BACKEND_URL + "/users/signup", {
      email,
      password,
    });
       return response.data;
  } catch (err) {
    throw new Error(err.message || "Somthing went wrong,please try again.");
  }
  
};
export const login = async (email, password) => {
  try {
    const response = await axios.post(BACKEND_URL + "/users/login", {
      email,
      password,
    });
    
    return response.data;
  } catch (err) {
    throw new Error(err.message || "Somthing went wrong,please try again.");
  }
};

