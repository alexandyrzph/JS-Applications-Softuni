import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// this is different in other SPA Apps

const endpoints = {
	allmovies: '/data/movies',
	movieById: '/data/movies/',
};

export async function getAllMovies() {
	return api.get(endpoints.allmovies);
}

export async function getMovieById(id) {
	return api.get(endpoints.movieById + id);
}