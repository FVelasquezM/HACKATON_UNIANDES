import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MapaPrincipal from "./components/MapaPrincipal/MapaPrincipal";
import Seleccionar from "./components/Seleccionar/MapaSeleccionar";
import ClusterDetail from "./components/ClusterDetail/ClusterDetail";
import { geolocated } from "react-geolocated";

class App extends Component {
  // One-shot position request.

  constructor(props) {
    super(props);
    this.state = {
      location: { lat: 3.5592541, lng: -73.7307292, zoom: 6 },
      selected: "Papa",
      productos: [
        {
          nombre: "Papa"
        },
        {
          nombre: "Yuca"
        },
        {
          nombre: "Maíz"
        }
      ]
    };

    navigator.geolocation.getCurrentPosition(this.saveLocation);
    if (
      this.props.isGeolocationAvailable &&
      this.props.isGeolocationEnabled &&
      this.props.coords
    ) {
      this.setState({
        location: {
          lat: this.props.coords.latitude,
          lng: this.props.coords.longitude,
          zoom: 14
        }
      });
    }
  }

  saveLocation = position => {
    this.setState({
      location: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 14
      }
    });
  };
  setSelected(producto) {
    this.setState({ selected: producto.nombre });
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <MapaPrincipal myLocation={this.state.location} />}
          />
          <Route
            path="/seleccionar"
            component={() => (
              <Seleccionar
                miEstado={this.state}
                setSelected={this.setSelected.bind(this)}
              />
            )}
          />
          <Route
            path="/cluster"
            component={() => <ClusterDetail miEstado={this.state} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(App);
