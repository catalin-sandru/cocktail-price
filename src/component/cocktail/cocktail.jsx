import React, { Component} from 'react'
import AddCocktail from './add-cocktail'
import { BASE_URL } from './constant'
import axios from 'axios'
import './cocktail.css'


class Cocktail extends Component{

  state = {
    cocktail: [],
    current: null
  }

  async getCocktail() {
    let {data} = await axios.get(`${BASE_URL}cocktail`)
    this.setState({cocktail: data})
    }

  componentDidMount(){
    this.getCocktail();
  }

  addCocktailToState = (something) => {
    this.setState({
      cocktail: [...this.state.cocktail, {
        name: something,
        id: this.state.cocktail.length
      }]
    })
  }

  handleEditCocktail = (event) => {
    const { keyCode: key } = event;
    // if esc is pressed (27)
    if(key === 27){
      this.setState({
        current: null
      })
    } else if (key === 13) {
      this.saveCocktail({
        id: this.state.current,
        name: event.target.value
      })
    }
    // if enter is pressed (13)
  }


  renderCocktail = () => {
    return this
      .state
      .cocktail
      .map((cocktail, key) =>
        <p key={key} className='cocktail__item'>
          <span>
            {
              this.state.current !== cocktail.id && 
              <span>{cocktail.name}</span>
            }
            {
              this.state.current === cocktail.id &&
            <input 
              type="text" 
              defaultValue={cocktail.name} 
              onKeyDown={this.handleEditCocktail}
              autoFocus/>}
          </span>
          <button 
            onClick={() => this.deleteCocktail(cocktail.id)}>
            &times;
          </button>
          <button onClick={() => this.setCurrentCocktail(cocktail.id)}>
            Edit
          </button>
        </p>
      )
  }

  async deleteCocktail(id) {
    await axios.delete(`${BASE_URL}cocktail/${id}`, {
      'Content-Type': 'aplication/json',
      method: 'DELETE'
    }).then(result => {
        // remove the cocktail from state
        this.setState({
          cocktail: this.state.cocktail
            .filter(cocktail => cocktail.id !== id)
        })
    })
    // await axios.delete(`${BASE_URL}cocktail`, {
    //   id
    // }, {
    //   'Content-type': 'aplication/json'
    // })
  }
  async saveCocktail(cocktailObject) {
    await axios.put(`${BASE_URL}cocktail/${cocktailObject.id}`, {
      'Content-Type': 'aplication/json',
      ...cocktailObject,
      method: 'PUT'
    }).then(result => {
        // remove the cocktail from state
        this.setState({
          cocktail: this.state.cocktail
            .map(cocktail => cocktail.id !== cocktailObject.id ? 
              cocktail:
              {...cocktailObject}
            )
        })
    })
    this.setState({
      current: null
    })
  }

  setCurrentCocktail(id) {
    this.setState({
      current: id
    })
  }

  render(){
    return (
      <div>
        <div>{this.renderCocktail()}</div>,
        <AddCocktail 
          orice={this.addCocktailToState}
           />
      </div>
    )
  }
}

export default Cocktail;