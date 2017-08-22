import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactBootstrap from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';


var Panel = ReactBootstrap.Panel, Accordion = ReactBootstrap.Accordion;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var ListGroup = ReactBootstrap.ListGroup,ListGroupItem = ReactBootstrap.ListGroupItem;
var Modal = ReactBootstrap.Modal;
// var recipeBook = localStorage.recipeBook;


const recipes = (typeof localStorage['recipeBook'] !== 'undefined' || localStorage['recipeBook'] === "") ? JSON.parse(localStorage['recipeBook']) : [{title:"Pizza",ingredients:['tomato','dough','cheese']},{title:'Apple Pie',ingredients:['apples','pie crust','other pie stuff']},{title:'Apple Juice',ingredients:['apples','sugar','water']}];
// const recipeBook = JSON.parse(localStorage.recipeBook);
var globalTitle = "", globalIngredients = [];
// console.log(localStorage)
// console.log(!localStorage.recipeBook)

localStorage.clear()

populateStorage();

class App extends React.Component {
  constructor(){
    super()
    this.state = { showModal:false,isModalOpen: false, titleValue:"",ingredientsValue:'',mode:'Add'}
  }
  openModal() {
    this.setState({ isModalOpen: true, showModal:true })
  }
  closeModal() {
    this.setState({ isModalOpen: false, showModal:false })
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

class RenderRecipes extends React.Component{
  constructor(){
    super()
    this.state = { showModal:false,isModalOpen: false, titleValue:"",typed:'',ingredientsValue:'',mode:'Add',isEditable:false}
  }

  handleDelete(index){
    this.props.recipes.splice(index,1);
    // console.log(this.props.recipes)
    update()
    }
  onBlur(event){
    this.setState({typed: event.target.value});

    // console.log(event.target.id);
  }
  handleEdit(index){
    globalTitle = this.props.recipes[index].title;
    globalIngredients = this.props.recipes[index].ingredients;

    (this.state.isEditable ? this.setState({isEditable:false}) : this.setState({isEditable:true}))

    if(this.state.isEditable){
      if(this.state.typed !== ''){
        // console.log('reset typed');
        // console.log(this.state.typed);
        var splitIng = this.state.typed.split(',')
        this.handleDelete(index);
        recipes.push({title:globalTitle,ingredients:splitIng})
        // console.log(recipes)
        this.setState({typed:''});
        update();
        // document.getElementById('')
      }
      else{
        console.log('no changes were made.')
      }

    }

    // console.log("GLOBAL: " + globalTitle)
    // console.log('GLOBAL: ' + globalIngredients.toString())

  }
  render(){
    // console.log(this.state.isEditable)
    let that = this;
    // console.log(localStorage.recipeBook)
    function SeparatedIngreds(recipe){

      // const listed = recipe.ingreds.map((ingred,index) => <span>{ingred},</span>);
      const LgiListed = recipe.ingreds.map((ingred,index) => <ListGroupItem key={index}>{ingred}</ListGroupItem> );

      return(<div>{(that.state.isEditable ? <input type='text' className="input" id={globalTitle+"Input"} onBlur={that.onBlur.bind(that)} contentEditable="true" defaultValue={(that.state.typed === '' ? globalIngredients.toString() : that.state.typed)}></input>:<span>{LgiListed}</span>)}
                                           </div>)
    }
    const listItems = recipes.map((recipe,index) =>
                                  <Panel key={index} header={recipe.title} bsStyle="info" eventKey={index + 1} >
                                  <ListGroup id={index + recipe.title}>
                                    <SeparatedIngreds ingreds={recipe.ingredients} />
                                    <hr />
                                    <ButtonToolbar>
                                      <Button bsStyle="danger" onClick={this.handleDelete.bind(this,index)}> Delete</Button>
                                      <Button id={index+recipe.title} onClick={this.handleEdit.bind(this,index)}>{(this.state.isEditable ? "Submit" : "Edit")}</Button>
                                    </ButtonToolbar>
                                  </ListGroup>

                                </Panel>)

                                return(
                                <div>
                                  <Accordion>
                                    {listItems}
                                    </Accordion>
                                </div>)
  }
}


function populateStorage() {
  if(!localStorage.recipeBook || localStorage.recipeBook === "[]"){
    // console.log(localStorage.recipeBook == "[]")

    localStorage.setItem("recipeBook", JSON.stringify(recipes));
    // console.log(recipes)
    // update();
  }
}

function update() {
  localStorage.setItem("recipeBook", JSON.stringify(recipes));
  //console.log(localStorage.recipeBook)
  // localStorage.clear()
    // var rows = [];
  // for (var i=0; i < recipes.length; i++) {
  //   rows.push(
  //     <Panel header={recipes[i].title} eventKey={i} bsStyle="success">
  //       <SeparatedIngreds title={recipes[i].title} ingredients={recipes[i].ingredients} index={i}/>
  //     </Panel>
  //   );
  // }
  ReactDOM.render(<App />, document.getElementById("root"));
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
