import { FC } from 'react';
import * as React from 'react'
import { ModalProp } from '../models/modal.interface';
import { BeerType } from "../models/beer.interface";

interface BeerFormProps extends ModalProp {
    submitForm: any
    handleBeerNameinput: any
    handleBeerDescriptionInput: any
    handleBeerTypeInput: any
    handleBeerPercentageInput: any
    showForm: boolean
}

const BeerForm: FC<BeerFormProps> = ({ submitForm, handleBeerNameinput, handleBeerDescriptionInput, handleBeerTypeInput, handleBeerPercentageInput, showForm }) => {

    if (showForm === true) {
        return (
            <div>
                <form onSubmit={submitForm}>
                    <div className="input">
                        Name:<br />
                        <input type="text" onChange={handleBeerNameinput} /> <br />
                    </div>
                    <div className="input">
                        Description:<br />
                        <input style={{height: 70}} type="text" onChange={handleBeerDescriptionInput} /> <br />
                    </div>
                    <div className="input">
                        Type:<br />
                        <select onChange={handleBeerTypeInput}>
                            {(Object.keys(BeerType) as Array<keyof typeof BeerType>).map(type =>
                                <option value={type}>{type}</option>
                            )}
                        </select>
                    </div>
                    <div className="input">
                        Percentage of alcohol:<br />
                        <input type="number" onChange={handleBeerPercentageInput} /> <br />
                    </div>

                    <button type='submit'>
                        Add Beer
                    </button>
                </form>
            </div>
        )
    } else {
        return <p></p>
    }
}

export default BeerForm