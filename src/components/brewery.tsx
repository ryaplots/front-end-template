import { FC } from 'react';
import * as React from 'react'
import { useState } from "react";
import BreweryForm from './breweryForm'
import { Brewery } from '../services/breweries';
import { Brewer } from "../models/brewery.interface";
import { ModalProp } from '../models/modal.interface';
import { Beer } from "../models/beer.interface";
import { SessionToken } from '../services/login';

interface BrewerProps extends ModalProp {
    user: SessionToken[];
    breweries: Brewer[];
    setBreweryList: any;
    beerList: Beer[];
}

const BreweryList: FC<BrewerProps> = ({ user, breweries, setBreweryList, beerList }) => {
    const [brewerName, setBrewerName] = useState('');
    const [brewerCity, setBrewerCity] = useState('');
    const [beersSold, setBeersSold] = useState<string[]>([]);
    const [toShowForm, setShowForm] = useState(false);

    let token: {};

    const handleBreweryName = (e: React.FormEvent<HTMLInputElement>) => {
        setBrewerName(e.currentTarget.value);
    };

    const handleBreweryCity = (e: React.FormEvent<HTMLInputElement>) => {
        setBrewerCity(e.currentTarget.value);
    };

    const handleBreweryBeers = (e: React.FormEvent<HTMLInputElement>) => {
        beersSold.push(e.currentTarget.value);
        console.log(beersSold);
    };

    const handleBrewerSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        token = {
            headers: {
                'Authorization': 'Bearer ' + user[0].token
            }
        }

        const brewer = {
            name: brewerName,
            city: brewerCity,
            beerIds: beersSold,
        }

        Brewery.createBrewery(brewer, token)
            .then((data) => {
                breweries.unshift(data);
                setBrewerName('');
                setBrewerCity('');
                setBeersSold([]);
                setShowForm(false);
            })
            .catch((err) => {
                console.log(err);
            });
        return () => { };
    };

    const deleteBrewery = (id: string) => {
        token = {
            headers: {
                'Authorization': 'Bearer ' + user[0].token
            }
        }

        Brewery.deleteBrewery(id, token)
            .then((data) => {
                let updatedBreweryList = breweries.filter((brewery) => brewery.id !== id);
                setBreweryList(updatedBreweryList);
            })
            .then((err) => {
                console.log(err);
            });
    }

    const showForm = () => {
        if (toShowForm === false) {
            setShowForm(true)
        } else {
            setShowForm(false)
        }
    }

    return (
        <div>
            <h1>Breweries<span className="add" onClick={showForm}> +</span></h1>
            <BreweryForm submitForm={handleBrewerSubmit}
                handleBreweryNameChange={handleBreweryName}
                handleBreweryCityChange={handleBreweryCity}
                handleBreweryBeersChange={handleBreweryBeers}
                showFrom={toShowForm}
                beerList={beerList}>
            </BreweryForm>
            {breweries.map(brewery =>
                <div className="container">
                    <div style={{ display: "flex" }}>
                        <img src="../beer-bottle.png" alt="black beer bottle"></img>
                        <h2>{brewery.name}</h2>
                    </div>
                    <p>{brewery.city}</p>
                    <div className="control">
                        <button onClick={() => deleteBrewery(brewery.id)}>Delete</button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default BreweryList;