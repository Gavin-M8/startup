import React from 'react';
import { useEffect, useState } from "react";

export function Home() {

    const quotes = [
    { text: "Cooking is love made visible.", author: "Unknown" },
    { text: "People who love to eat are always the best people.", author: "Julia Child" },
    { text: "A recipe has no soul. You, as the cook, must bring soul to the recipe.", author: "Thomas Keller" },
    { text: "The secret ingredient is always love.", author: "Grandma" },
    { text: "To eat is a necessity, but to cook is an art.", author: "Unknown" },
  ];

  const [quote, setQuote] = useState('Loading...');
  const [author, setAuthor] = useState('unknown');

  useEffect(() => {
    fetch('/api/quote')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data[0].q);
        setAuthor(data[0].a);  
      })
      .catch((error) => {
      console.error('Error fetching quote:', error);
      });
  }, []);
    
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

            <h4 align="center">{quote}</h4>
            <br />
            <h5 align="center">- {author}</h5>

        </div>
    </main>
  );
}