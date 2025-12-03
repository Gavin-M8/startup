import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { AuthState } from '../login/authState';
import { useEffect, useState, useRef } from "react";
import WhatsCookin from "./whatsCookin";
import "./cook.css";


export function Cook(props) {

    const username = localStorage.getItem("userName");
    const navigate = useNavigate();

    const socketRef = useRef(null);

    useEffect(() => {
    if (socketRef.current) return;

    const socket = new WebSocket("ws://localhost:4000");
    socketRef.current = socket;

    socket.onopen = () => {
        socket.send(JSON.stringify({
        type: "new_user",
        value: username
        }));
    };

    return () => {
        socket.close();
    };
    }, [username]);



    function logout() {
        localStorage.removeItem("userName");
        props.setAuthState(AuthState.Unauthenticated);
        props.onLogout?.();
        navigate("/login");
    }


    async function incrementRecipeCount() {
        const username = localStorage.getItem("userName");
        if (!username) return;
        
        try {
            const response = await fetch('/api/increment', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to update recipe count')
            }

            const data = await response.json();

            localStorage.setItem('recipeCount', data.recipeCount);
        } catch (err) {
            console.error(err);
        }
    }



   const food = [
        {
            name: "Chicken Alfredo Pasta",
            ingredients: ["flour", "eggs", "cheese", "chicken", "milk"],
            image: "/alfredo.png",
            recipe: "Cook pasta, grill chicken, make Alfredo sauce with flour, milk, and cheese. Combine all and serve hot."
        },
        {
            name: "Cheesy Chicken Quesadilla",
            ingredients: ["flour", "cheese", "chicken"],
            image: "/quesadilla.png",
            recipe: "Place cooked chicken and cheese on a flour tortilla, fold, and cook on skillet until golden and cheese melts."
        },
        {
            name: "Homemade Pancakes",
            ingredients: ["flour", "eggs", "milk"],
            image: "/pancakes.png",
            recipe: "Mix flour, eggs, and milk to make batter. Pour onto hot griddle and cook until golden on both sides. Serve with syrup."
        },
        {
            name: "Chicken Pot Pie",
            ingredients: ["flour", "eggs", "chicken", "milk"],
            image: "/pie.png",
            recipe: "Make a dough with flour and eggs, cook chicken, make creamy sauce with milk, assemble, and bake until crust is golden."
        },
        {
            name: "Cheese Omelette",
            ingredients: ["eggs", "cheese", "milk"],
            image: "/omelet.png",
            recipe: "Beat eggs with milk, pour into pan, add cheese, fold omelette, and cook until set."
        }
        ];

    const [selectedIngredients, setSelectedIngredients] = useState({
        flour: false,
        eggs: false,
        cheese: false,
        chicken: false,
        milk: false,
    });

    const [recipeDisplay, setRecipeDisplay] = useState(null);

     function IngredientsForm() {
        
        const handleChange = (event) => {
            const { name, checked } = event.target;
            setSelectedIngredients(prevState => ({
            ...prevState,
            [name]: checked
            }));
        };

        return (
            <form>
            <label>
                <input
                type="checkbox"
                name="flour"
                checked={selectedIngredients.flour}
                onChange={handleChange}
                />
                Flour
            </label>
            <br />
            <label>
                <input
                type="checkbox"
                name="eggs"
                checked={selectedIngredients.eggs}
                onChange={handleChange}
                />
                Eggs
            </label>
            <br />
            <label>
                <input
                type="checkbox"
                name="cheese"
                checked={selectedIngredients.cheese}
                onChange={handleChange}
                />
                Cheese
            </label>
            <br />
            <label>
                <input
                type="checkbox"
                name="chicken"
                checked={selectedIngredients.chicken}
                onChange={handleChange}
                />
                Chicken
            </label>
            <br />
            <label>
                <input
                type="checkbox"
                name="milk"
                checked={selectedIngredients.milk}
                onChange={handleChange}
                />
                Milk
            </label>
            </form>
        );
        }

  function getRandomRecipe(selectedIngredients) {
    const matchingRecipes = food.filter(recipe =>
        recipe.ingredients.every(ing => selectedIngredients.includes(ing))
    );

    if (matchingRecipes.length === 0 || selectedIngredients.length < 2) {
        return (
        <div id="center-div" className="container-fluid text-center">
            <h2>Choose Some Ingredients</h2>
            <br />
            <img
            src="/lechef.png"
            alt="placeholder"
            className="shadow"
            style={{ border: "1px solid black" }}
            />
            <br /> <br />
            <h5>
            Select more ingredients to generate a recipe!
            </h5>
        </div>
        );
    }

    incrementRecipeCount();


   const socket = socketRef.current;

    if (!socket) {
   
    } else {
    
    socket.send(JSON.stringify({
        type: "activity",
        value: {
        username,
        activity: "generated a recipe!"
        }
    }));

    }



    const randomRecipe =
        matchingRecipes[Math.floor(Math.random() * matchingRecipes.length)];

            return (
                <div id="center-div" className="container-fluid">
                <h2>{randomRecipe.name}</h2>
                <img
                    src={randomRecipe.image}
                    alt={randomRecipe.name}
                    className="shadow"
                    style={{ border: "1px solid black" }}
                />
                <br />
                <p style={{ whiteSpace: "pre-line" }}>{randomRecipe.recipe}</p>
                <br />
                </div>
            );
    }

  return (
    <main className="bg-light text-dark">
        <h1 align="center">Recipe Generator</h1>
      
        <hr style={{ border: "1px solid black", width: "80%" }} />
        <br /><br /><br />

        <div id="main-div">

            <div id="left-div" className="container-fluid">

                <WhatsCookin username={username} socketRef={socketRef} />


            </div>

            {recipeDisplay ? (
                recipeDisplay
                ) : (
                <div id="center-div" className="container-fluid text-center">
                    <h2>Choose Some Ingredients</h2>
                    <br />
                    <img
                    src="/lechef.png"
                    alt="placeholder"
                    className="shadow"
                    style={{ border: "1px solid black" }}
                    />
                    <br /><br />
                    <h5>Select more ingredients to generate a recipe!</h5>
                </div>
            )}

                <div id="right-div" className="container-fluid">

                <div className="user-bar" align="center">
                    <div className='playerName'><h5>{username}</h5></div>
                    <Button className="btn btn-dark shadow" variant='secondary' onClick={() => logout()}>Logout</Button>
                </div>

                <br /><br /><br /><br />

                <h2>Ingredients</h2>
                <IngredientsForm />
                <br />
                <button
                className="btn btn-dark shadow"
                onClick={() => {
                    // Filter selected ingredients
                    const selected = Object.keys(selectedIngredients).filter(
                    (ing) => selectedIngredients[ing]
                    );

                    // Generate a recipe
                    const recipe = getRandomRecipe(selected);
                    setRecipeDisplay(recipe);

                    // Play the ding only when a recipe is generated
                    const audio = new Audio("/sound-ding.mp3");
                    audio.play();
                }}
                >
                Generate Recipe
                </button>
                <br />
                {/* <h2 id="saved-recipes">Saved Recipes</h2>
                <ul>
                    <li>Ice Cream</li>
                    <li>Fried Chicken</li>
                    <li>Apple Pie</li>
                    <li>Artisan Bread</li>
                </ul> */}
                </div>
        </div>
    </main>
  );
}