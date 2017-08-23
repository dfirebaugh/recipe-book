import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {recipes} from './App.js';

export function update() {
  localStorage.setItem("recipeBook", JSON.stringify(recipes));
  ReactDOM.render(<App />, document.getElementById("root"));
}
