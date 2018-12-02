import React, { Component } from 'react';

class Ingredient extends Component {
  state = {
    ingredient: []
  }

  renderIngredientList = () => {
    return this.state.ingredient
      .map(({id, name, unit, price, currency, quantity}, key) =>
        <tr key={key}>
          <td>${id}</td>
          <td>${name}</td>
          <td>${unit}</td>
          <td>${price}${currency}</td>
          <td>${quantity}</td>
          <td>act</td>
        </tr> );
  }

  render() {
    return (
      <table>
        <thead>
          <tr>Id</tr>
          <tr>Name</tr>
          <tr>Unit</tr>
          <tr>Price</tr>
          <tr>Currency</tr>
          <tr>Quantity</tr>
          <tr>Action</tr>
        </thead>
        <tbody>
          {this.renderIngredientList()}
        </tbody>
      </table>
    )
  }
}

export default Ingredient;