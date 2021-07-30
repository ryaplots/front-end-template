import { FC } from 'react';
import * as React from 'react'
import { ModalProp } from '../models/modal.interface';

interface LoginProps extends ModalProp {
    handleSubmit: any;
    username: string;
    handleUsernameChange: any;
    password: string;
    handlePasswordChange: any;
    isSubmitted: boolean;
}

const LoginForm: FC<LoginProps> = ({ handleSubmit, username, handleUsernameChange, password, handlePasswordChange, isSubmitted }) => { 
    
    return (
    <div>
        <p className="welcome" style={{display: isSubmitted === true ? 'inline' : 'none' }}>Welcome to your beer-land, {username}!</p>
        <form  style={{visibility: isSubmitted === true ? 'hidden' : 'visible' }} onSubmit={handleSubmit} >
            <div className="input">
                user:<br />
            <input type="text" value={username} onChange={handleUsernameChange} />
            </div>

            <div className="input">
                password:<br />
            <input type="password" value={password} onChange={handlePasswordChange} />
            </div>

            <button type='submit'>
                Login
            </button>
        </form >
    </div>
)} 

export default LoginForm;