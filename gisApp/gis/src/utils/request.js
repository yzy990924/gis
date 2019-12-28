import {
    camelizeKeys,
    decamelizeKeys
} from 'humps'

export const API_ROOT = `http://192.168.43.146:8085/laravel6/public/api`

export function fetchData(apiPath, request = {}) {
    const url = `${API_ROOT}/${apiPath}`;
    const {
        headers,
        body,
        method
    } = request;
    let customRequest = {};
    if (method) {
        customRequest.method = method.toUpperCase();
    }
    if (body) {
        customRequest.body = JSON.stringify(decamelizeKeys(JSON.parse(body)));
    }
    if (headers) {
        const {
            contentType
        } = headers;
        customRequest.headers = {};
        if (contentType) {
            customRequest.headers['Content-Type'] = contentType;
        }
    }

    return (
        fetch(url, customRequest)
        .then(json => {
            return json

        })
        .then(res => {
            return res.json()
        })

    );
};