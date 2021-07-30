import axios, { AxiosResponse } from 'axios';

export interface UserType {
    username: string; 
    password: string;
}

export interface SessionToken {
    id: string;
    token: string;
    timestamp: Date;
    userId: string;

    // references 
    user: UserType;
}

const instance = axios.create({
    baseURL: 'https://intake-api.hulan.nl'
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    post: (url: string, body: {}) => instance.post(url, body).then(responseBody)
};

export const User = {
    createUser: (user: UserType): Promise<SessionToken> =>
        requests.post('/authentication/', user)
};