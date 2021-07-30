import { FC } from 'react';
import * as React from 'react'
import { useState } from "react";
import BeerForm from './beerForm'
import { Beers } from '../services/beers';
import { ModalProp } from '../models/modal.interface';
import { Beer, BeerType } from "../models/beer.interface";
import { SessionToken } from '../services/login';

interface BeerProps extends ModalProp {
    user: SessionToken[];
    beers: Beer[];
    setBeers: any;
    setBeerList: any;
}

const BeerList: FC<BeerProps> = ({ user, beers, setBeers, setBeerList }) => {
    const [beerName, setBeerName] = useState('');
    const [beerDescription, setBeerDescription] = useState('');
    const [beerType, setBeerType] = useState('');
    const [beerPercentage, setBeerPercentage] = useState('');
    const [toShowForm, setShowForm] = useState(false);
    let token: {};

    const handleBeerNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setBeerName(e.currentTarget.value);
    };

    const handleBeerDescriptionChange = (e: React.FormEvent<HTMLInputElement>) => {
        setBeerDescription(e.currentTarget.value);
    };

    const handleBeerTypeChange = (e: React.FormEvent<HTMLInputElement>) => {
        setBeerType(e.currentTarget.value);
    };

    const handleBeerPercentageChange = (e: React.FormEvent<HTMLInputElement>) => {
        setBeerPercentage(e.currentTarget.value);
    };

    const handleBeerSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        token = {
            headers: {
                'Authorization': 'Bearer ' + user[0].token
            }
        }

        const beer = {
            name: beerName,
            description: beerDescription,
            type: BeerType[beerType.toUpperCase()],
            percentage: parseInt(beerPercentage)
        }

        Beers.createBeer(beer, token)
            .then((data) => {
                console.log(data);
                beers.unshift(data);
                setBeerName('');
                setBeerDescription('');
                setBeerType('');
                setBeerPercentage('');
                setShowForm(false);
            })
            .catch((err) => {
                console.log(err);
            });
        return () => { };
    };

    /* const editBeer = (id: string) => {
        token = {
            headers: {
                'Authorization': 'Bearer ' + user[0].token
            }
        }

        const beerToEdit = beers.find(beer => beer.id === id);

        if (beerToEdit !== undefined) {
            const beer = {
                id: id,
                name: beerToEdit?.name,
                description: beerToEdit?.description,
                type: beerToEdit?.type,
                percentage: beerToEdit?.percentage,
            }

            Beers.updateBeer(beer, id, token)
                .then((data) => {
                    let updatedBeerList = beers.filter((beer) => beer.id !== id);
                    setBeers([data, ...updatedBeerList]);
                    console.log(data)
                })
                .then((err) => {
                    console.log(err);
                });
        } else {
            return
        }
    } */

    const deleteBeer = (id: string) => {

        token = {
            headers: {
                'Authorization': 'Bearer ' + user[0].token
            }
        }

        Beers.deleteBeer(id, token)
            .then((data) => {
                let updatedBeerList = beers.filter((beer) => beer.id !== id);
                setBeers(updatedBeerList);
                Beers.getBeers(token)
                    .then((data) => {
                        setBeerList(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .then((err) => {
                console.log(err);
            });
    }

    const showForm = () => {
        if (toShowForm === false) {
            setShowForm(true)
            return true
        } else {
            setShowForm(false)
            return false
        }

    }

    return (
        <div>
            <h1>Beers <span onClick={showForm} className="add"> +</span></h1>
            <BeerForm submitForm={handleBeerSubmit}
                handleBeerNameinput={handleBeerNameChange}
                handleBeerDescriptionInput={handleBeerDescriptionChange}
                handleBeerTypeInput={handleBeerTypeChange}
                handleBeerPercentageInput={handleBeerPercentageChange}
                showForm={toShowForm}>
            </BeerForm>
            {beers.map(beer =>
                <div className="container">
                    <div style={{ display: "flex" }}>
                        <img src="../beer-bottle.png" alt="black beer bottle"></img>
                        <h2>{beer.name}</h2>
                    </div>
                    <p>{BeerType[beer.type]} - {beer.percentage}%</p>
                    <p>{beer.description}</p>
                    <div className="control">
                        <button onClick={() => deleteBeer(beer.id)}>Delete</button>
                    </div>

                </div>
            )}
            <br />

        </div>
    )
}

export default BeerList;