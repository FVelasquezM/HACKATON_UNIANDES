import React, { Component } from "react";
import "./SideMenu.css";
import Producto from "./Producto/Producto";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setSelected(producto) {
    this.setState({ selected: producto.nombre });
  }

  render() {
    return (
      <div className="fondoVerde">
        <h1>Productos</h1>
        <ul className="listaTitulos">
          {this.props.miEstado.productos.map(producto => (
            <Producto
              key={producto}
              producto={producto}
              selected={this.props.miEstado.selected}
              setSelected={this.props.setSelected}
            />
          ))}
        </ul>
        <h1>¿Qué debo hacer?</h1>
        <p className="margenTutorial">
          1. Explore los grupos de productores asociados a cada uno de los
          productos
        </p>
        <p className="margenTutorial">
          2. Si se encuentra interesado en unirse alguno de los grupos,
          seleccione el boton de "Seleccionar este Grupo"
        </p>
      </div>
    );
  }
}

export default SideMenu;
