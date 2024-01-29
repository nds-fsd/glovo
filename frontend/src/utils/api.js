import axios from "axios";
import { getUserToken } from "../utils/localStorage.utils";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const objectToQueryString = (obj) => {
  const queryString = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
  return queryString;
};
