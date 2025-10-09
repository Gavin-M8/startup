import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
        <body className="bg-light text-dark">

            <header className="bg-dark text-light container-fluid">
            <nav className="navbar navbar-dark">
                <div className="nav-div">
                    <menu className="navbar-nav">
                        <NavLink id="brand" className="navbar-brand" to="#">Recipes Please</NavLink>
                        <li className="nav-item"><NavLink className="nav-link active" to="index.html" >Home</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link active" to="login.html" >Login</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link active" to="cook.html" >Cook</NavLink></li>
                    </menu>
                </div>
            </nav>
            <hr />
            </header>

            import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
            import { Login } from './login/login';
            import { Cook } from './cook/cook';
            import { Home } from './home/home';


            <footer className="bg-dark text-light">
                <hr />
                <span>Gavin Mobley</span>
                <br />
                <NavLink className="github nav-link" to="https://github.com/Gavin-M8/startup?tab=readme-ov-file"> -- GitHub -- </NavLink> 
                <hr />
            </footer>

        </body>
    </BrowserRouter>
    );
}