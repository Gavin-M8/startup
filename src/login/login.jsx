import React from 'react';
import "./login.css";

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className="bg-light text-dark">
        <div>
            {authState !== AuthState.Unkown && <h2>Please Log In</h2>}
            {authState === AuthState.Authenticated && (
            <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
            )}
            {authState === AuthState.Unauthenticated && (
            <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
                onAuthChange(loginUserName, AuthState.Authenticated);
                }}
                />
            )}
        </div>
    </main>
  );
}

/* <h2>Please Log In</h2>
            <form method="get" action="cook.html">
                <div>
                    <input type="text" className="form-control" placeholder="email" />
                </div>
                <div>
                    <input type="password" className="form-control" placeholder="password" />
                </div>
                <button className="btn btn-dark shadow" type="submit">Login</button>
                <button className="btn btn-dark shadow" type="submit">Create</button>
            </form>
        <br /> */