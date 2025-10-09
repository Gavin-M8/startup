import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
  <body className="bg-light text-dark">

        <header className="bg-dark text-light container-fluid">
        <nav className="navbar navbar-dark">
            <div className="nav-div">
                <menu className="navbar-nav">
                    <a id="brand" className="navbar-brand" href="#">Recipes Please</a>
                    <li className="nav-item"><a className="nav-link active" href="index.html" >Home</a></li>
                    <li className="nav-item"><a className="nav-link active" href="login.html" >Login</a></li>
                    <li className="nav-item"><a className="nav-link active" href="cook.html" >Cook</a></li>
                </menu>
            </div>
        </nav>
        <hr />
        </header>


        <main className="bg-light text-dark"> Content Here </main>


        <footer className="bg-dark text-light">
            <hr />
            <span>Gavin Mobley</span>
            <br />
            <a className="github nav-link" href="https://github.com/Gavin-M8/startup?tab=readme-ov-file"> -- GitHub -- </a> 
            <hr />
        </footer>

    </body>
    );
}