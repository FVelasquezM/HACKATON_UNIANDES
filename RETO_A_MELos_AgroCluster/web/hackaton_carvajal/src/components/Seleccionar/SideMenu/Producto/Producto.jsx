import React, { Component } from "react";

class Producto extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.producto.nombre === this.props.selected) {
      return <li className="selected">{this.props.producto.nombre}</li>;
    } else {
      return (
        <li
          className="item"
          onClick={() => this.props.setSelected(this.props.producto)}
        >
          {this.props.producto.nombre}
        </li>
      );
    }
  }
}

export default Producto;
