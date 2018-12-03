import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from './constant';
import AddIngredient from './add-ingredient';
import './ingredient.css';

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
      .map(({id, name, measure, price, currency, quantity}, key) =>
        <tr key={key}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{measure}</td>
          <td>{price}{currency}</td>
          <td>{quantity}</td>
          <td>act</td>
        </tr> );
  }

  render() {
    return (
      [<table className="ingredient__full-table">
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Measure</td>
            <td>Price</td>
            <td>Currency</td>
            <td>Quantity</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {this.renderIngredientList()}
        </tbody>
      </table>,
      <AddIngredient />]
    )
  }
}

export default Ingredient;