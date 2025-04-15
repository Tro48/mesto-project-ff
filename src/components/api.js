import { configApi } from "./config_api.js"

export const userData = () => {
    return fetch(`${configApi.baseUrl}/users/me`, {
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.contentTypeJson
        }
    }).then(res => {
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {console.log(err)});
}

export const cardsData = () => {
    return fetch(`${configApi.baseUrl}/cards`, {
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.contentTypeJson
        }
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => { console.log(err) });
}

export const editProfile = (name, about) => {
    return fetch(`${configApi.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.contentTypeJson,
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch((err) => { console.log(err) });
}

export const addAvatar = (url) => {
    return fetch(`${configApi.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.contentTypeJson,
        },
        body: JSON.stringify({
            avatar: url
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch((err) => { console.log(err) });
}

export const addLike = (cardId) => {
    return fetch(`${configApi.baseUrl}/cards/likes/${cardId}/`, {
        method: 'PUT',
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.contentTypeJson,
        },
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch((err) => { console.log(err) });
}

export const removeLike = (cardId) => {
    return fetch(`${configApi.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.contentTypeJson,
        },
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch((err) => { console.log(err) });
}

export const addNewCard = (name, link) => {
    return fetch(`${configApi.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.contentTypeJson
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => { console.log(err) });
}

export const deleteCard = (cardId) => {
    return fetch(`${configApi.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.contentTypeJson
        },
    })
}
