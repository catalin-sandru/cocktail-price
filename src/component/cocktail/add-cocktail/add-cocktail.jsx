import React, {Component} from 'react';
import { BASE_URL } from '../constant';
import axios from 'axios'

class AddCocktail extends Component {
  constructor(props) {
    super(props)
    this.input = null;
    this.pushCocktail = this.pushCocktail.bind(this)
  }

  async pushCocktail(){
    try {
      await axios
        .post(
          `${BASE_URL}cocktail`,
          {
            name: this.input.value
          },
          {
            'Content-Type': 'aplication/json'
          }
        )
      this.props.orice(this.input.value);
    } catch(e) {
    }
  }

  render() {
    return(
      <p>
        <input
          ref={e => this.input = e} />
        <button
          onClick = {this.pushCocktail}>
        click </button> 
      </p>
    )
  }
}

export default AddCocktail;