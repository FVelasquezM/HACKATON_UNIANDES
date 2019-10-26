import React, { Component } from "react";
import tableau from "tableau-api";

class TableauComponent extends Component {
  componentDidMount() {
    this.initViz();
  }

  initViz() {
    const vizUrl = this.props.url;
    const vizContainer = this.vizContainer;
    let viz = new window.tableau.Viz(vizContainer, vizUrl);
  }
  render() {
    return (
      <div
        className="graficaTableau"
        ref={div => {
          this.vizContainer = div;
        }}
      ></div>
    );
  }
}

export default TableauComponent;
