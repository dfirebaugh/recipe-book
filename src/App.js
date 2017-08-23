import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import RenderRecipes from './RenderRecipes.js';
import {update} from './update.js';
// import logo from './logo.svg';
import {populateStorage} from './populateStorage.js';
import './App.css';


var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Modal = ReactBootstrap.Modal;

export const recipes = (typeof localStorage['recipeBook'] !== 'undefined' || localStorage['recipeBook'] === "") ? JSON.parse(localStorage['recipeBook']) : [{title:"Pizza",ingredients:['tomato','dough','cheese']},{title:'Apple Pie',ingredients:['apples','pie crust','other pie stuff']},{title:'Apple Juice',ingredients:['apples','sugar','water']}];
// localStorage.clear()

populateStorage();

class App extends React.Component {
  constructor(){
    super()
    this.state = { showModal:false,titleValue:"",ingredientsValue:'',mode:'Add'}
  }
  openModal() {
    this.setState({ showModal:true })
  }
  closeModal() {
    this.setState({ showModal:false })
  }
  add(){
    var title = document.getElementById('title').value
    var ingreds1 = document.getElementById('ingredients').value
    if(title!=="" && ingreds1 !==""){
      // console.log(title + " " + ingreds1)
      var splitIngreds = ingreds1.split(',')
      recipes.push({title:title,ingredients:splitIngreds})
      update();
      document.getElementById('closeBtn').click()
    }
    else{
      console.log('Enter things CORRECTLY!')
    }
  }

  render(){
    return(
        <div className="container">
        <br />
        <RenderRecipes recipes={recipes} />
        <Button bsStyle="primary" onClick={() => this.openModal()} id="addButton">Add</Button>
        <Modal show={this.state.showModal} onHide={() => this.closeModal()} >
          <form >
            <h4> Enter Recipe</h4>
            <p><input type='text' id='title' label='Recipe' placeholder='Recipe Name'  /></p>
            <input type='textarea' label="Ingredients" placeholder="Enter Ingredients,Separated,By Commas" id='ingredients' />
          </form>
          <ButtonToolbar>
              <p><Button bsStyle="primary" onClick={this.add}>Add Recipe</Button><Button id='closeBtn' onClick={() => this.closeModal()}>Close</Button></p></ButtonToolbar>
</Modal>
        </div>
      )
    }
  }

export default App;
