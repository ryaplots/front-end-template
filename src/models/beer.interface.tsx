import { Brewer } from './brewery.interface';

export enum BeerType {
    PILSNER,
    IPA,
    WHEAT,
    BROWN,
    PORTER,
    STOUT,
    SOUR
}

export interface Beer {
    id: string;
    name: string;
    description: string;
    type: BeerType;
    percentage: number;

    // references 
    brewers?: Brewer[];
}

export interface PostBeer {
    name: string,
    description: string,
    type: BeerType,
    percentage: number
}

export interface BeerResponse {
    id: string,
    name: string,
    description: string,
    type: BeerType,
    percentage: number
}

export interface OverwriteBeer {
    id: string,
    name: string,
    description: string,
    type: BeerType,
    percentage: number,
}