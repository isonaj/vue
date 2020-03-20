import axios from 'axios';
import NProgress from 'nprogress';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  console.log('request');
  NProgress.start();
  return config;
});
apiClient.interceptors.response.use(response => {
  console.log('response');
  NProgress.done();
  return response;
});
export default {
  getEvents(perPage, page) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`);
  },
  getEvent(id) {
    return apiClient.get('/events/' + id);
  },
  createEvent(event) {
    return apiClient.post('/events', event);
  }
};
