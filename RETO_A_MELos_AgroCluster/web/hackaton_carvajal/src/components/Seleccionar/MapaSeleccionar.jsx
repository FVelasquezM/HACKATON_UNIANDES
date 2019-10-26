import React, { Component } from "react";
import SideMenu from "./SideMenu/SideMenu";
import "./MapaSeleccionar.css";
import GoogleMapReact from "google-map-react";
import { withRouter } from "react-router";

class MapaSeleccionar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bounds: this.props.location.bounds,
      cluster: this.props.cluster
    };
  }

  handleGoogleMapApi = google => {
    const map = google.map;

    var locations = [];
    var fileType = "m";
    var color = "blue";
    let lat = this.state.bounds.getCenter().lat();
    let lng = this.state.bounds.getCenter().lng();
    if (this.props.miEstado.selected === "Papa") {
      fileType = "m";
      locations = [
        { lat: lat - 0.1, lng: lng },
        { lat: lat - 0.1, lng: lng - 0.1 },
        { lat: lat - 0.175, lng: lng - 0.25 },
        { lat: lat - 0.16, lng: lng - 0.2 },
        { lat: lat - 0.18, lng: lng - 0.22 },
        { lat: lat - 0.18, lng: lng - 0.075 },
        { lat: lat - 0.18, lng: lng - 0.095 },
        { lat: lat - 0.28, lng: lng - 0.195 },
        { lat: lat + 0.18, lng: lng + 0.095 },
        { lat: lat - 0.25, lng: lng - 0.095 },
        { lat: lat - 0.15, lng: lng + 0.095 },
        { lat: lat, lng: lng - 0.2 },
        { lat: lat + 0.2, lng: lng - 0.2 },
        { lat: lat + 0.25, lng: lng - 0.23 },
        { lat: lat + 0.16, lng: lng - 0.2 },
        { lat: lat - 0.16, lng: lng - 0.27 },
        { lat: lat - 0.15, lng: lng + 0.095 },
        { lat: lat, lng: lng - 0.2 },
        { lat: lat + 0.25, lng: lng + 0.2 },
        { lat: lat + 0.258, lng: lng + 0.23 },
        { lat: lat + 0.196, lng: lng + 0.2 },
        { lat: lat - 0.136, lng: lng + 0.27 }
      ];
      color = "blue";
    } else if (this.props.miEstado.selected === "Yuca") {
      locations = [
        { lat: lat, lng: lng - 0.02 },
        { lat: lat - 0.01, lng: lng - 0.025 },
        { lat: lat - 0.05, lng: lng - 0.06 },
        { lat: lat - 0.1, lng: lng - 0.12 },
        { lat: lat - 0.025, lng: lng - 0.12 },
        { lat: lat + 0.125, lng: lng - 0.12 },
        { lat: lat - 0.1, lng: lng + 0.12 },
        { lat: lat - 0.125, lng: lng - 0.075 },
        { lat: lat + 0.05, lng: lng - 0.09 },
        { lat: lat + 0.035, lng: lng - 0.01 },
        { lat: lat + 0.085, lng: lng + 0.03 },
        { lat: lat - 0.05, lng: lng },
        { lat: lat - 0.125, lng: lng - 0.03 },
        { lat: lat + 0.175, lng: lng + 0.101 },
        { lat: lat + 0.175, lng: lng - 0.075 },
        { lat: lat - 0.155, lng: lng + 0.025 }
      ];
      fileType = "k";
      color = "red";
    } else if (this.props.miEstado.selected === "Maíz") {
      fileType = "f";
      color = "yellow";
      locations = [
        { lat: lat - 0.25, lng: lng + 0.325 },
        { lat: lat - 0.15, lng: lng - 0.045 },
        { lat: lat - 0.29, lng: lng + 0.225 },
        { lat: lat - 0.23, lng: lng - 0.025 },
        { lat: lat + 0.33, lng: lng + 0.125 },
        { lat: lat + 0.5, lng: lng - 0.35 },
        { lat: lat + 0.255, lng: lng + 0.425 },
        { lat: lat + 0.075, lng: lng + 0.325 },
        { lat: lat + 0.195, lng: lng + 0.125 },
        { lat: lat - 0.255, lng: lng + 0.425 },
        { lat: lat - 0.075, lng: lng + 0.325 },
        { lat: lat - 0.195, lng: lng + 0.125 }
      ];
    }
    let url = "http://maps.google.com/mapfiles/ms/icons/";
    url += color + "-dot.png";
    var markers = locations.map(function(location, i) {
      return new window.google.maps.Marker({
        position: location,
        icon: url
      });
    });

    var MarkerClusterer = require("node-js-marker-clusterer");
    new MarkerClusterer(map, markers, {
      imagePath: "images/" + fileType
    });
  };

  render() {
    if (this.state.bounds != null) {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 col-md-3 col-lg-3 noPadding">
              <SideMenu
                miEstado={this.props.miEstado}
                setSelected={this.props.setSelected}
              />
            </div>
            <div className="col-9 col-md-9 col-lg-9 noPadding">
              <div className="contenedorPrincipal">
                <div style={{ height: "100vh", width: "100%" }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
			//TODO, insertar llave de Google maps, removida por privacidad.
                      key: "",
                      libraries: ["drawing"].join(",")
                    }}
                    defaultCenter={{
                      lat: this.state.bounds.getCenter().lat(),
                      lng: this.state.bounds.getCenter().lng()
                    }}
                    r
                    defaultZoom={11}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={this.handleGoogleMapApi.bind(this)}
                  >
                    <Marker
                      lat={this.state.bounds.getCenter().lat()}
                      lng={this.state.bounds.getCenter().lng()}
                    />
                  </GoogleMapReact>
                </div>
              </div>
              <button
                onClick={() => this.props.history.push("cluster")}
                className="botonVerde align-bottom"
              >
                Seleccionar este Grupo
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      this.props.history.push("/");
      return <div></div>;
    }
  }
}

export default withRouter(MapaSeleccionar);

const Marker = () => {
  return (
    <div className="SuperAwesomePin">
      <img className="imagenPersona" src={"images/arrow.png"} alt="Logo" />
    </div>
  );
};
