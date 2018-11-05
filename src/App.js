import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/home";
import Food from "./components/food";
import Restaurants from "./components/restaurants";

export default class App extends Component {
  render() {
    return (
      <div className = "App">
          <Router>
              <div className="route-page">
                  <Route exact path = "/" component = {Home} />
                  <Route path = "/food" component = {Food} />
                  <Route path = "/restaurant" component = {Restaurants} />
              </div>
          </Router>
      </div>
    );
  }
}

