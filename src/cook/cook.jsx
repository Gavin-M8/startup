import React from 'react';
import "./cook.css";

export function Cook() {
  return (
    <main className="bg-light text-dark">
        <h1 align="center">Recipe Generator</h1>
        <div id="main-div">
            <div id="left-div" className="container-fluid">
                <p id="user"><strong>Homme-le-Chef</strong></p>
                <button className="btn btn-dark shadow">Logged In</button>
                <br />
                <br />
                <br />
                <h2>What's Cookin'</h2>
                <hr />
                <table className="table">
                    <tr>
                        <th align="left">User</th>
                        <th align="right">Recipes Generated</th>
                        <th align="right">Activity</th>
                    </tr>
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
                </table>
                <br />
                <button className="btn btn-dark shadow">Refresh</button>
                <br />
            </div>

                <div id="center-div" className="container-fluid">
                <h2>Pizza</h2>
                <img src="recipes-please-pizza.png" alt="pizza" className="shadow" border="1"/>
                <br />
                <ul>
                    <li>Mix flour, salt, and water to make dough</li>
                    <li>Add sauce, cheese, and pepperonis</li>
                    <li>Bake in oven for 20 minutes at 400 degrees</li>
                </ul>
                <br />
                <button className="btn btn-dark shadow">Save Recipe</button>
                <br />
                </div>

                <div id="right-div" className="container-fluid">
                <h2>Ingredients</h2>
                        <form>
                            <label>
                                <input type="checkbox" name="ing1" value="flour" />
                                Flour
                            </label> <br />
                            <label>
                                <input type="checkbox" name="ing2" value="eggs" />
                                Eggs
                            </label> <br />
                            <label>
                                <input type="checkbox" name="ing3" value="cheese" />
                                Cheese
                            </label> <br />
                            <label>
                                <input type="checkbox" name="ing4" value="chicken" />
                                Chicken
                            </label> <br />
                            <label>
                                <input type="checkbox" name="ing5" value="milk" />
                                Milk
                            </label>
                        </form>
                <br />
                <button className="btn btn-dark shadow">Generate Recipe</button>
                <br />
                <h2 id="saved-recipes">Saved Recipes</h2>
                <ul>
                    <li>Ice Cream</li>
                    <li>Fried Chicken</li>
                    <li>Apple Pie</li>
                    <li>Artisan Bread</li>
                </ul>
                </div>
        </div>
    </main>
  );
}