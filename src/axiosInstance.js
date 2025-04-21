import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '082ccab2f184d41322dc316b5860ef80',
    language: 'en-US',
    region: 'US',
  },
});

export default axiosInstance;

