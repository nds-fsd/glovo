import { jwtDecode } from "jwt-decode";

export const getStorageObject = (key) => {
  if (key === "token") {
    const token = localStorage.getItem("token");
    if (token) {
      return jwtDecode(token);
    }
  } else {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
  }
  return null;
};

export const setStorageObject = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteStorageObject = (key) => {
  localStorage.removeItem(key);
};

export const getUserToken = () => {
  const session = getStorageObject("user-session");
  if (session) {
    return session.token;
  }
  return null;
};

export const getUserSession = () => {
  const session = getStorageObject("user");
  if (session) {
    return session;
  }
  return null;
};

export const setUserSession = (sessionData) => {
  setStorageObject("user-session", JSON.stringify(sessionData));
};

export const removeSession = () => {
  deleteStorageObject("user-session");
};
