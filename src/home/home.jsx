import React from 'react';

export function Home() {
  return (
    <main className="bg-light text-dark">
        <div className="main-container">
            <div className="welcome">
                <h1 align="center"><strong>Welcome to Recipes Please!</strong></h1>
                    <hr />
                <h3 align="center"><em>"To chef one's food is one's own destiny."</em></h3>
                <br />
                
            </div>
            <div className="pizza">
                <img className="shadow" src="/lechef.png" alt="chef" border="1"/>
            </div>

            <h4 align="center">some quote</h4><br /><h5 align="center">- some person</h5>
        </div>
    </main>
  );
}