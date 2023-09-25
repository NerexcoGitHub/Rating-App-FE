import axios from 'axios';

const BASE_URL = 'https://prompt-rating-e4d47952e7d8.herokuapp.com/';
// const BASE_URL = 'http://localhost:6001';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
