import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllGamesPage() {
    return api.get('/data/games?sortBy=_createdOn%20desc');
}

export async function getAllGames() {
    return api.get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export async function createGame(game) {
    return api.post('/data/games', game);
}

export async function getGameById(id) {
    return api.get('/data/games/' + id);
}

export async function deleteGame(id) {
    return api.del('/data/games/' + id);
}

export async function updateGame(id, data) {
    return api.put('/data/games/' + id, data)
}

export async function getMyBooks(userId) {
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function likeBook(bookId) {
    return api.post('/data/likes', bookId);
}

export async function getLikes(bookId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function getAllComments(gameId) {
    return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function commentPost(data) {
    return api.post('/data/comments', data);
}