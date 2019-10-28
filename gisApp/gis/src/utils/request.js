import { camelizeKeys, decamelizeKeys } from 'humps'

export const API_ROOT = `https://localhost:3000/api`

export function fetchData  (apiPath, request = {}) {
    const url = `${API_ROOT}/${apiPath}`;
    const { headers, body, method } = request;
    let customRequest = {};
    if (method) {
        customRequest.method = method.toUpperCase();
    }
    if (body) {
        customRequest.body = JSON.stringify(decamelizeKeys(JSON.parse(body)));
    }
    if (headers) {
        const { contentType} = headers;
        customRequest.headers = {};

        if (contentType) {
            customRequest.headers['Content-Type'] = contentType;
        }
    }
    return (
        fetch(url, customRequest)
            .then(res => res.json().then(json => {
        
                if (!json.status) {
                    return Promise.reject(json);
                }
                const camelizedJsondata = camelizeKeys(json);
                return camelizedJsondata;
                }
            ))
    );
};
