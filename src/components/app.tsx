import { useState } from "react";
import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { Brewery } from '../services/breweries';
import { Beers } from '../services/beers';
import { User, SessionToken } from '../services/login';
import { Brewer } from "../models/brewery.interface";
import { Beer } from "../models/beer.interface";
import LoginForm from './loginForm';
import BeerList from './beer';
import BreweryList from "./brewery";
import '../css/main.css'

const App: React.FC = (props: RouteComponentProps) => {

    const [user, setUser] = useState<SessionToken[]>([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [breweryList, setBreweryList] = useState<Brewer[]>([]);
    const [beerList, setBeerList] = useState<Beer[]>([]);
    let token: {};

    /* const credentials = {
        username: 'daryaplotnytska',
        password: 'Waa16z'
    } */

    const handleUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value);
    };

    const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    };

    const handleLoginSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        const credentials = {
            username: username,
            password: password
        }

        User.createUser(credentials)
            .then((data) => {
                setUser([data]);
                setSubmitted(true);
                return data;
            })
            .catch((err) => {
                console.log(err);
            });

        return () => { };
    };

    const showBreweries = () => {
        token = {
            headers: {
                'Authorization': 'Bearer ' + user[0].token
            }
        }

        Brewery.getBrewery(token)
            .then((data) => {
                setBreweryList(data);
            })
            .catch((err) => {
                console.log(err);
            });

        Beers.getBeers(token)
            .then((data) => {
                setBeerList(data);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const showBeers = () => {
        token = {
            headers: {
                'Authorization': 'Bearer ' + user[0].token
            }
        }

        Beers.getBeers(token)
            .then((data) => {
                setBeerList(data);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    return (
        <Router>
            <div
                style={{
                    fontFamily: "sans-serif",
                    maxWidth: 600,
                    padding: 20,
                    margin: "0 auto",
                }}
            >
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <h1>Hulan <br />Beers</h1>
                    <img style={{
                        height: 70,
                        width: "auto",
                        marginLeft: 5
                    }} src="../beer-bottle.png" alt="black beer bottle"></img>
                </div>

                <nav style={{ display: "table", margin: "0 auto", }}>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li className="link" style={{ display: submitted === true ? 'none' : 'inline' }}>
                            <Link exact="true" to="/">Login</Link>
                        </li>
                        <li className="link" style={{ display: submitted === true ? 'inline' : 'none' }}>
                            <Link onClick={showBreweries} to="/breweries">Breweries | </Link>
                        </li>
                        <li className="link" style={{ display: submitted === true ? 'inline' : 'none' }}>
                            <Link onClick={showBeers} to="/beers"> Beers</Link>
                        </li>
                    </ul>
                </nav>

                <Route path="/" exact
                    render={() => (
                        <LoginForm handleSubmit={handleLoginSubmit}
                            username={username}
                            handleUsernameChange={handleUsernameChange}
                            password={password}
                            handlePasswordChange={handlePasswordChange}
                            isSubmitted={submitted} />
                    )}
                />

                <Route path="/breweries" render={() => (
                    <BreweryList breweries={breweryList} user={user} setBreweryList={setBreweryList} beerList={beerList} />)}
                />

                <Route path="/beers" render={() => (
                    <BeerList beers={beerList} user={user} setBeers={setBeerList} setBeerList={setBeerList} />)}
                />
            </div>
        </Router>
    )
};

export default App