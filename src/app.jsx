import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Cook } from './cook/cook';
import { Home } from './home/home';
import { AuthState } from './login/authState';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
        <div className=" body bg-light text-dark">
            <header className="bg-dark text-light container-fluid">
            <nav className="navbar navbar-dark">
                <div className="nav-div">
                    <menu className="navbar-nav">
                        <NavLink id="brand" className="navbar-brand" to="/">Recipes Please</NavLink>
                        <li className="nav-item"><NavLink className="nav-link active" to="/" >Home</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link active" to="/login" >Login</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link active" to="/cook" >Cook</NavLink></li>
                    </menu>
                </div>
            </nav>
            <hr />
            </header>

            <Routes>
                <Route
                    path='/login'
                    element={
                    <Login
                        userName={userName}
                        authState={authState}
                        onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUserName(userName);
                        }}
                    />
                    }
                    exact
                />
                <Route path='/' element={<Home />} exact />
                <Route path='/cook' element={<Cook />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="bg-dark text-light">
                <hr />
                <span>Gavin Mobley</span>
                <br />
                <NavLink className="github nav-link" to="https://github.com/Gavin-M8/startup?tab=readme-ov-file"> -- GitHub -- </NavLink> 
                <hr />
            </footer>
        </div>
    </BrowserRouter>
    );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}