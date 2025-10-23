import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { AuthState } from '../login/authState';
import { useEffect, useState } from "react";
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

     function IngredientsForm() {
        const [selectedIngredients, setSelectedIngredients] = useState({
            flour: false,
            eggs: false,
            cheese: false,
            chicken: false,
            milk: false,
        });

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

  function getRandomRecipe() {
        const randomRecipe = food[Math.floor(Math.random() * food.length)];

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
            {/* <button className="btn btn-dark shadow">Save Recipe</button>
            <br /> */}
            </div>
        );
        }

  return (
    <main className="bg-light text-dark">
        <h1 align="center">Recipe Generator</h1>
        <div id="main-div">
            <div id="left-div" className="container-fluid">
                <div className='playerName'>{username}</div>
                <Button variant='secondary' onClick={() => logout()}>Logout</Button>
                <br />
                <br />
                <br />
                <h2>What's Cookin'</h2>
                <hr />
                <table className="table">
                    <thead>
                    <tr>
                        <th align="left">User</th>
                        <th align="right">Recipes Generated</th>
                        <th align="right">Activity</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Billy Bob</td>
                        <td align="center">9001</td>
                        <td>just generated a recipe!</td>
                    </tr>
                    <tr>
                        <td>normal guy</td>
                        <td align="center">153</td>
                        <td>just logged out</td>
                    </tr>
                    <tr>
                        <td>coolperson225</td>
                        <td align="center">79</td>
                        <td>just logged in</td>
                    </tr>
                    <tr>
                        <td>Jimbo</td>
                        <td align="center">42</td>
                        <td>just generated a recipe!</td>
                    </tr>
                    </tbody>
                </table>
                {/* <br />
                <button className="btn btn-dark shadow">Refresh</button>
                <br /> */}
            </div>

            {getRandomRecipe()}

                <div id="right-div" className="container-fluid">
                <h2>Ingredients</h2>
                <IngredientsForm />
                <br />
                <button className="btn btn-dark shadow">Generate Recipe</button>
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