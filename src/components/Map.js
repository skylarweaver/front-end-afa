import React from "react";
// import { navigate } from "gatsby-link";
import styled from "styled-components"

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3dlYXZlcjEyIiwiYSI6ImNqcGhqbGRlZzBqZ3Aza21zYjBkdmVuMGYifQ.O7nsKv_zctk373QJ17nYUg';

const MapContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 50px; /* The height of the header */
  bottom: 0;
  left: 0;
`

// function encode(data) {
//   return Object.keys(data)
//     .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
//     .join("&");
// }

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidated: false,
      startCoords: [-74.005, 40.712], // New York City
    };
  }

  componentDidMount() {
    console.log('here');
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [11.255, 43.77], // starting position
      zoom: 2.25, // starting zoom
      style: 'mapbox://styles/mapbox/streets-v9'
    });
    this.map.setCenter(this.state.startCoords);
    this.map.dragRotate.disable();
    this.map.dragPan.disable();
    this.map.touchZoomRotate.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollZoom.disable();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <MapContainer ref={el => this.mapContainer = el}>
      </MapContainer>
    );
  }
}