import React from "react";
import "./App.css";
import Search from "./Components/Search";
import Bookhome from "./Components/Bookhome";
import { Route } from "react-router-dom";

/**
 * Functional stateless Component Does the main routing for /search or / 
 *
 * @returns the component based on the url
 */
function BooksApp() {
    return (
        <div className="app">
            <Route exact path="/search" render={() => <Search />} />
            <Route exact path="/" render={() => <Bookhome />} />
        </div>
    );
}

export default BooksApp;