import React, {Component} from 'react'

class AddCocktail extends Component {
  input = null

  handleInputChange(event) {
    console.log(event.target)
  }

  render() {
    return(
      <p>
        <input
          onChange = {this.handleInputChange}
          ref={(element) => this.input = element} />
      </p>
    )
  }
}

export default AddCocktail;