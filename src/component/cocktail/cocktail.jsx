import React, { Component} from 'react'
import AddCocktail from './add-cocktail'
import { BASE_URL } from './constant'
import axios from 'axios'
import './cocktail.css'


class Cocktail extends Component{

  state = {
    cocktail: []
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
          <span>{cocktail.name}</span>
          <span 
            onClick={() => this.deleteCocktail(cocktail.id)}>
            &times;
          </span>
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