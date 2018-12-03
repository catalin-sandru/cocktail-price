import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from './constant';
import './ingredient.css'

class Ingredient extends Component {
  state = {
    ingredient: []
  }

  componentWillMount() {
    axios
      .get(`${BASE_URL}ingredient`)
      .then(({data}) => {
        this.setState({ingredient: data})
      })
  }

  renderIngredientList = () => {
    return this.state.ingredient
      .map(({id, name, unit, price, currency, quantity}, key) =>
        <tr key={key}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{unit}</td>
          <td>{price}{currency}</td>
          <td>{quantity}</td>
          <td>act</td>
        </tr> );
  }

  render() {
    return (
      <table className="ingredient__full-table">
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Unit</td>
            <td>Price</td>
            <td>Currency</td>
            <td>Quantity</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {this.renderIngredientList()}
        </tbody>
      </table>
    )
  }
}

export default Ingredient;