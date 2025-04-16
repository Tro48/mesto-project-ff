export const configApi = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-36',
    headers: {
        authorization: 'c4e8465c-47ec-436d-be1a-e5e1faad7127',
        contentTypeJson: 'application/json'
    },
    response: function(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}