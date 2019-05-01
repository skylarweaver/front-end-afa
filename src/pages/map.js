import React from "react";
// import { navigate } from "gatsby-link";
import Layout from '../components/Layout'
import MapComponent from '../components/map/MapComponent'


export default class MapPage extends React.Component {

  render() {
    return (
      <Layout>
        <MapComponent />
      </Layout>
    );
  }
}