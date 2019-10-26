import React from "react";
import SideMenu from "./SideMenu/SideMenu";
import Modal from "react-bootstrap/Modal";
import "./MapaPrincipal.css";
import GoogleMapReact from "google-map-react";
import { withRouter } from "react-router-dom";

function MapaPrincipal(props) {
  const [modalShow2, setModalShow2] = React.useState(false);
  const [polygon, setPolygon] = React.useState(false);

  function handleCancel() {
    polygon.setMap(null);
  }

  function handelConfirm() {
    var bounds = new window.google.maps.LatLngBounds();
    polygon.latLngs.g[0].g.forEach(element => {
      bounds.extend(element);
    });
    props.history.push({
      pathname: "/seleccionar",
      bounds: bounds
    });
  }

  function handleGoogleMapApi(google) {
    const map = google.map;
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
      polygonOptions: {
        fillColor: "#518cc0",
        fillOpacity: 0.6,
        strokeWeight: 5,
        strokeColor: "#518cc0",
        clickable: false,
        editable: false,
        zIndex: 1
      }
    });

    google.maps.event.addListener(
      drawingManager,
      "polygoncomplete",
      polygon => {
        setPolygon(polygon);
        setTimeout(() => {
          setModalShow2(true);
        }, 500);
      }
    );

    drawingManager.setMap(map);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 col-md-3 col-lg-3 noPadding">
          <SideMenu />
        </div>
        <div className="col-9 col-md-9 col-lg-9 noPadding">
          <div className="contenedorPrincipal">
            <div style={{ height: "100vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
		//TODO, agregar llave de Google Maps, removida por privacidad.
                  key: "",
                  libraries: ["drawing"].join(",")
                }}
                defaultCenter={{
                  lat: props.myLocation.lat,
                  lng: props.myLocation.lng
                }}
                defaultZoom={props.myLocation.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={handleGoogleMapApi.bind(this)}
              >
                <Marker lat={props.myLocation.lat} lng={props.myLocation.lng} />
              </GoogleMapReact>
            </div>

            <Modal
              show={modalShow2}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Confirmar
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>¿Está seguro que quiere registrar este terreno?</h4>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="botonRojo"
                  onClick={() => {
                    handleCancel();
                    setModalShow2(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="botonVerde2 align-bottom"
                  onClick={() => {
                    handelConfirm();
                  }}
                >
                  Confirmar
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MapaPrincipal);

const Marker = props => {
  return (
    <div className="SuperAwesomePin">
      <img className="imagenPersona" src={"images/me.png"} alt="Logo" />
    </div>
  );
};
