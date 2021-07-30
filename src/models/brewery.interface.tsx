import { Beer } from './beer.interface';

export interface Brewer {
    id: string,
    name: string,
    city: string,
    beerIds: string[],

    // references 
    beers?: Beer[],
}

export interface PostBrewer {
    name: string,
    city: string,
    beerIds: string[],
}

export interface OverwriteBrewer {
    id: string,
    name: string,
    city: string,
    beerIds: string[],
}