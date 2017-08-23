import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import {update} from './update.js';

var Panel = ReactBootstrap.Panel, Accordion = ReactBootstrap.Accordion;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var ListGroup = ReactBootstrap.ListGroup,ListGroupItem = ReactBootstrap.ListGroupItem;
var globalTitle = "", globalIngredients = [];


class RenderRecipes extends React.Component{
  constructor(){
    super()
    this.state = { showModal:false,isModalOpen: false, titleValue:"",typed:'',ingredientsValue:'',mode:'Add',isEditable:false}
  }

  handleDelete(index){
    this.props.recipes.splice(index,1);

    update()
    }

  onBlur(event){
    this.setState({typed: event.target.value});
  }

  handleEdit(index){
    globalTitle = this.props.recipes[index].title;
    globalIngredients = this.props.recipes[index].ingredients;

    (this.state.isEditable ? this.setState({isEditable:false}) : this.setState({isEditable:true}))

    if(this.state.isEditable){
      if(this.state.typed !== ''){
        var splitIng = this.state.typed.split(',')
        this.handleDelete(index);
        this.props.recipes.push({title:globalTitle,ingredients:splitIng})
        this.setState({typed:''});
        update();
      }
      else{
        console.log('no changes were made.')
      }

    }
  }
  render(){
    let that = this;
    function SeparatedIngreds(recipe){

      const LgiListed = recipe.ingreds.map((ingred,index) => <ListGroupItem key={index}>{ingred}</ListGroupItem> );

      return(<div>{(that.state.isEditable ? <input type='text' className="input" id={globalTitle+"Input"} onBlur={that.onBlur.bind(that)} contentEditable="true" defaultValue={(that.state.typed === '' ? globalIngredients.toString() : that.state.typed)}></input>:<span>{LgiListed}</span>)}
                                           </div>)
    }
    const listItems = this.props.recipes.map((recipe,index) =>
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

export default RenderRecipes;
