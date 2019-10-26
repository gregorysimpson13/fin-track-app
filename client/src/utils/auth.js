import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete the auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const storeAuthToken = token => {
  localStorage.setItem("authToken", token);
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
};

export const isAuthenticated = () => {
  return localStorage.getItem("authToken") ? true : false;
};
