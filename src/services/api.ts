import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.itbook.store/1.0',
});
