import axios from 'axios';
import { getUserToken } from '../utils/localStorage.utils';

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
    }
});

export const  objectToQueryString = (obj) => {
    const queryString = Object.keys(obj)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&');
    return queryString;
}