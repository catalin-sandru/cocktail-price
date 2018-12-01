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
    // console.log(data)
    }

  componentDidMount(){
    this.getCocktail();
  }

  addCocktailToState = (something) => {
    console.log(`this test should result in ${something}`)
    this.setState({
      cocktail: [...this.state.cocktail, {
        name: something,
        id: this.state.cocktail.length
      }]
    })
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
    console.log(`cocktail with id "${id}" has been deleted`)
    await axios.delete(`${BASE_URL}cocktail/${id}`, {
      'Content-Type': 'aplication/json',
      method: 'DELETE'
    }).then(result => {
        console.log(result)
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

  setCurrentCocktail(id) {
    console.log(id)
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