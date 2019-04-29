import React from "react";
// import { navigate } from "gatsby-link";
import Layout from '../components/Layout'
import Map from '../components/Map'


export default class MapPage extends React.Component {

  render() {
    return (
      <Layout>
        <Map />
      </Layout>
    );
  }
}