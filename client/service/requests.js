import { api } from './api.js'


export function deleteUser(user) {
    return api
        .delete('cadastroUser/' + user.id, user)
        .then()
}

export function listUser() {
    return api
        .get('/cadastroUser')
        .then()
}

export function getUser(id) {
    return api
        .get('/cadastroUser/' + id)

}

export function postUser(user) {
    return api
        .post('/cadastroUser', user)
        .then()
}

export function putUser(user) {
    return api
        .put('/cadastroUser/' + user.id, user)
        .then()
}

export function getAllLeaks() {
    return api
        .get('/pesquisarVazamento')
        .then()
}