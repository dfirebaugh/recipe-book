import {recipes} from './App.js';

export function populateStorage() {
  if(!localStorage.recipeBook || localStorage.recipeBook === "[]"){
    localStorage.setItem("recipeBook", JSON.stringify(recipes));
  }
}
