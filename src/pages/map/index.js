import React from "react";
// import { navigate } from "gatsby-link";
import Layout from '../../components/Layout'

import mapboxgl from 'mapbox-gl';
// or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1Ijoic3dlYXZlcjEyIiwiYSI6ImNqcGhqbGRlZzBqZ3Aza21zYjBkdmVuMGYifQ.O7nsKv_zctk373QJ17nYUg';

// function encode(data) {
//   return Object.keys(data)
//     .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
//     .join("&");
// }

export default class Map extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = { isValidated: false };

  // }

  componentDidMount() {
    console.log('here');
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [11.255, 43.77], // starting position
      zoom: 13, // starting zoom
      style: 'mapbox://styles/mapbox/streets-v9'
    });
  }
  componentWillUnmount() {
    this.map.remove();
  }

  // handleChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const form = e.target;
  //   fetch("/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: encode({
  //       "form-name": form.getAttribute("name"),
  //       ...this.state
  //     })
  //   })
  //     .then(() => navigate(form.getAttribute("action")))
  //     .catch(error => alert(error));
  // };

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Map</h1>
              <div ref={el => this.mapContainer = el} />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}