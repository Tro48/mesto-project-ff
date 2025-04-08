const configApi = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-36',
    headers: {
        authorization: 'c4e8465c-47ec-436d-be1a-e5e1faad7127',
        ContentType: 'application/json'
    }
}

export const userData = () => {
    return fetch(`${configApi.baseUrl}/users/me`, {
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.ContentType
        }
    }).then(res => res.json())
}

export const cardsData = () => {
    return fetch(`${configApi.baseUrl}/cards`, {
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.ContentType
        }
    }).then(res => res.json())
}

export const editProfile = (name, about) => {
    return fetch(`${configApi.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.ContentType,
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(res => res.json())
}

export const addAvatar = (url) => {
    return fetch(`${configApi.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.ContentType,
        },
        body: JSON.stringify({
            avatar: url
        })
    })
        .then(res => res.json())
}

export const addLike = (cardId) => {
    return fetch(`${configApi.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.ContentType,
        },
    })
        .then(res => res.json())
}

export const removeLike = (cardId) => {
    return fetch(`${configApi.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.ContentType,
        },
    })
        .then(res => res.json())
}

export const addNewCard = (name, link) => {
    return fetch(`${configApi.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.ContentType
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(res => res.json())
}

export const deleteCard = (cardId) => {
    return fetch(`${configApi.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: configApi.headers.authorization,
            'Content-Type': configApi.headers.ContentType
        },
    })
}
