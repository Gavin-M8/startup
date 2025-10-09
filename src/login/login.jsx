import React from 'react';
import "./login.css";

export function Login() {
  return (
    <main className="bg-light text-dark">
        <h2>Please Log In</h2>
            <form method="get" action="cook.html">
                <div>
                    <input type="text" className="form-control" placeholder="email" />
                </div>
                <div>
                    <input type="password" className="form-control" placeholder="password" />
                </div>
                <button className="btn btn-dark shadow" type="submit">Login</button>
                <button className="btn btn-dark shadow" type="submit">Create</button>
            </form>
        <br />
    </main>
  );
}