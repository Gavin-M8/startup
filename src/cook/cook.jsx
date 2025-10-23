import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { AuthState } from '../login/authState';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./cook.css";


export function Cook(props) {

    const username = localStorage.getItem("userName");
    const navigate = useNavigate();


    function logout() {
        localStorage.removeItem("userName");
        props.setAuthState(AuthState.Unauthenticated);
        props.onLogout?.();
        navigate("/login");
    }


    function incrementRecipeCount() {
        const username = localStorage.getItem("userName");
        if (!username) return;
        const userCounts = JSON.parse(localStorage.getItem("userRecipeCounts")) || {};
        userCounts[username] = (userCounts[username] || 0) + 1;
        localStorage.setItem("userRecipeCounts", JSON.stringify(userCounts));
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


    function WhatsCookin() {
        const [users, setUsers] = useState([]);

        const randomUsers = ["BillyBob", "CoolPerson225", "ChefMaster", "Foodie42", "EggLover", "NoodleKing", "SauceBoss"];
        const activities = ["just generated a recipe!", "just logged in", "just logged out"];

        useEffect(() => {
            const interval = setInterval(() => {
            const name = randomUsers[Math.floor(Math.random() * randomUsers.length)];
            const recipes = Math.floor(Math.random() * 2000) + 1;
            const activity = activities[Math.floor(Math.random() * activities.length)];
            const newUser = { id: Date.now(), name, recipes, activity };

            setUsers(prev => {
                const updated = [...prev, newUser];
                return updated.slice(-5); // keep only the 5 most recent
            });

            // Remove this specific user after 5 seconds
            setTimeout(() => {
                setUsers(prev => prev.filter(u => u.id !== newUser.id));
            }, 5000);
            }, 3000); // new user every 3 seconds

            return () => clearInterval(interval);
        }, []);

        return (
            <div>
            <h2>What's Cookin'</h2>
            <hr />
            <div className="user-list">
                <AnimatePresence>
                {users.map(user => (
                    <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="shadow-sm p-2 mb-3 rounded bg-white border"
                    >
                    <strong>{user.name}</strong> — <em>{user.activity}</em>
                    <br />
                    <span style={{ color: "#666" }}>Recipes Generated: {user.recipes}</span>
                    </motion.div>
                ))}
                </AnimatePresence>
            </div>
            </div>
        );
        }


     function IngredientsForm() {
        
        const handleChange = (event) => {
            const { name, checked } = event.target;
            setSelectedIngredients(prevState => ({
            ...prevState,
            [name]: checked
            }));
        };

          useEffect(() => {
            const audio = new Audio("/sound-ding.mp3");
            audio.play();
            }, [selectedIngredients]);

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

                <WhatsCookin />

            </div>

            {recipeDisplay || getRandomRecipe(Object.keys(selectedIngredients).filter(ing => selectedIngredients[ing]))}

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
                onClick={() =>
                    setRecipeDisplay(
                    getRandomRecipe(Object.keys(selectedIngredients).filter(ing => selectedIngredients[ing]))
                    )
                }
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