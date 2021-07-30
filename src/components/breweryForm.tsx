import { FC } from 'react';
import * as React from 'react';
import { ModalProp } from '../models/modal.interface';
import { Beer } from "../models/beer.interface";

interface BreweryFromProps extends ModalProp {
    submitForm: any
    handleBreweryNameChange: any
    handleBreweryCityChange: any
    handleBreweryBeersChange: any
    showFrom: boolean
    beerList: Beer[]
}

const BreweryFrom: FC<BreweryFromProps> = ({ submitForm, handleBreweryNameChange, handleBreweryCityChange, handleBreweryBeersChange, showFrom, beerList }) => {

    if (showFrom === true) {
        return (
            <div>
                <form onSubmit={submitForm}>
                    <div className="input">
                        Name:<br />
                        <input type="text" onChange={handleBreweryNameChange} />
                    </div>
                    <div className="input">
                        City:<br />
                        <input type="text" onChange={handleBreweryCityChange} />
                    </div>
                    <div className="input">
                        Beers sold:<br />
                        <select name="cars" id="cars" onChange={handleBreweryBeersChange}>
                            {beerList.map(beer =>
                                <option value={beer.id}>{beer.name}</option>)}
                        </select>
                    </div>

                    <button type='submit'>
                        Add Brewery
                    </button>
                </form>
            </div>
        )
    } else {
        return <p></p>
    }
}

export default BreweryFrom;
