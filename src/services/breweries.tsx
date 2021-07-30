import axios, { AxiosResponse } from 'axios';
import { Brewer, PostBrewer, OverwriteBrewer } from '../models/brewery.interface';

const instance = axios.create({
    baseURL: 'https://intake-api.hulan.nl'
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string, token: {}) => instance.get(url, token).then(responseBody),
    post: (url: string, body: {}, token: {}) => instance.post(url, body, token).then(responseBody),
    put: (url: string, body: {}, token: {}) => instance.put(url, body, token).then(responseBody),
    delete: (url: string, token: {}) => instance.delete(url, token).then(responseBody)
};

export const Brewery = {
    getBrewery: (token: {}): Promise<Brewer[]> => requests.get('/brewers/', token),
    createBrewery: (brewer: PostBrewer, token: {}): Promise<Brewer> =>
        requests.post('/brewers/', brewer, token),
    updateBrewery: (brewer: OverwriteBrewer, id: string, token: {}): Promise<Brewer> =>
        requests.put('/brewers/', brewer, token),
    deleteBrewery: (id: string, token: {}): Promise<Brewer> => requests.delete(`/brewers/${id}`, token)
};