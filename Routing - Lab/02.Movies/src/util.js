import { getMovieById } from "./api/data.js";

export function getUserData() {
	return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data) {
	return sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData() {
	return sessionStorage.removeItem('userData');
}

export function loadMovie(ctx, next) {
	const moviePromise = getMovieById(ctx.params.id);
	ctx.movie = moviePromise;
	next();
}