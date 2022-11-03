import axios from 'axios';
import authHeader from './auth-header';

import { BASE_URL } from '../API'



class UserService {
    getUsers() {
        return axios.get(BASE_URL + 'users');
    }

    getMovies() {
        return axios.get(BASE_URL + 'movies', { headers: authHeader() });
    }

    getReviews() {
        return axios.get(BASE_URL + 'reviews', { headers: authHeader() });
    }

    getActors() {
        return axios.get(BASE_URL + 'actors', { headers: authHeader() });
    }
}

export default new UserService();