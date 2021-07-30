import axios, { AxiosResponse } from 'axios';
import { Beer, PostBeer, BeerResponse, OverwriteBeer } from '../models/beer.interface';

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

export const Beers = {
    getBeers: (token: {}): Promise<Beer[]> => requests.get('/beers/', token),
    createBeer: (beer: PostBeer, token: {}): Promise<BeerResponse> =>
        requests.post('/beers/', beer, token),
    updateBeer: (beer: OverwriteBeer, id: string, token: {}): Promise<BeerResponse> =>
        requests.put('/beers/', beer, token),
    deleteBeer: (id: string, token: {}): Promise<BeerResponse> => requests.delete(`/beers/${id}`, token)
};