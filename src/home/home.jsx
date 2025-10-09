import React from 'react';

export function Home() {
  return (
    <main className="bg-light text-dark">
        <div className="main-container">
            <div className="welcome">
                <h1 align="center"><strong>Welcome to Recipes Please!</strong></h1>
                    <hr />
                <h3 align="center"><em>"To chef one's food is one's own destiny."</em><br /> - Anonymous</h3>
            </div>
            <div className="pizza">
                <img className="shadow" src="recipes-please-icon.png" alt="chef" border="1"/>
            </div>
        </div>
    </main>
  );
}