import React from "react";
import axios from 'axios';
import styled from "styled-components"
import CheckpointBox from "./CheckpointBox";
import { checkpointData, checkpointLocations, checkpointMarkers } from "./checkpointData";
import { routeLineGeojson } from "./routeLineGeojson";
import DonationsRaised from '../DonationsRaised'
import mapboxgl from 'mapbox-gl';
import { Box } from '@rebass/grid'
import Chevron from '../Chevron'

mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

const MapContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 0px;
  bottom: 0;
  left: 0;
  z-index: -1;
`

const CheckpointsContainer = ({ className, totalDonationAmount }) => (
  <Box px={[3, 4, 6]} pt={[6, 6, 6]}>
    {checkpointData.map((checkpoint, index) => (
      <CheckpointBox id={checkpoint.id}
        title={checkpoint.title}
        description={checkpoint.description}
        checkpointNumber={index + 1}
        totalCheckpoints={checkpointData.length}
        key={index} />
    ))
    }
    <CheckpointBox id={'donate'}
      title='Donate'
      description='While Skylar will be funding the travel himself, Adventures for Alopecia will need money to host support group events, raise awareness, and advance research. Any amount of support you can offer is greatly appreciated. Thank you for helping people with Alopecia.'
      checkpointNumber={checkpointData.length + 1}
      totalCheckpoints={checkpointData.length}
    >
      <DonationsRaised donationAmount={totalDonationAmount} />
    </CheckpointBox>
  </Box>
)

export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startCoords: [-78.223, -4], // Near Panama 
      checkpointNames: Object.keys(checkpointLocations),
      activeCheckpointName: '',
      totalDonationAmount: '...........',
      platform: 'desktop',
      showChevron: true,
      currentLocationCoords: [0, 0],
    };
    this.rafId = undefined;
    this.updateMapOnRepaint = this.updateMapOnRepaint.bind(this);
    // Commenting below line for performance
    // this.updateWindowDimensions = this.updateWindowDimensions.bind(this); // Bind to watch for resize events
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.updateWindowDimensions(); // Get current window dimensions to determine if on mobile
    // Commenting below line for performance
    // window.addEventListener('resize', this.updateWindowDimensions); // Watch for resize events

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      zoom: 1.75, // starting zoom
      center: this.state.startCoords,
      style: 'mapbox://styles/sweaver12/cjqvo46nh69sp2ssl08nerz6r',
    });
    // this.addNavigationToMap();

    this.map.on('load', () => {
      this.addAdventureRouteLine(); // Add Route to map
      this.setActiveCheckpoint(this.state.checkpointNames[0], true); // Set initial map painting to first checkpoint
      this.setLocationMarkers();
      // On every scroll event, check which element is on screen and repaint map accordinly
      window.addEventListener('scroll', this.updateMapOnRepaint, false);
    })
    this.getCurrentLocation();
    this.getCurrentDonationAmount();
  }

  async getCurrentLocation() {
    try {
      const locationDataRes = await axios.get(`${process.env.SERVER_GET_LOCATION_DATA_URL}`)
      console.log('locationDataRes: ', [locationDataRes.data.values[0][2], locationDataRes.data.values[0][1]]);
      this.setState({
        currentLocationCoords: [locationDataRes.data.values[0][2], locationDataRes.data.values[0][1]],
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async getCurrentDonationAmount() {
    try {
      const donationDataRes = await axios.get(`${process.env.SERVER_GET_DONATION_DATA_URL}`)
      const donationAmounts = [];
      donationDataRes.data.values.map((a) => donationAmounts.push(a[0]));
      const totalDonationAmount = donationAmounts.reduce((partial_sum, donationString) => {
        const donationInt = parseInt(donationString.slice(1).replace(/,/g, ''));
        return partial_sum + donationInt;
      }, 0);
      this.setState({
        totalDonationAmount: totalDonationAmount.toLocaleString(),
      });
    } catch (error) {
      console.log('error: ', error);
      this.setState({
        totalDonationAmount: '...........',
      });
    }
  }

  // Adds navigation capability to the map
  addNavigationToMap() {
    // this.map.addControl(new mapboxgl.NavigationControl());
    this.map.dragRotate.disable();
    this.map.dragPan.disable();
    this.map.touchZoomRotate.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollZoom.disable();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateMapOnRepaint, false) // Cancel scroll listener
    window.cancelAnimationFrame(this.state.timeout); // Cancel repaint request
    window.removeEventListener('resize', this.updateWindowDimensions);
    this.map.remove();
  }

  updateMapOnRepaint() {
    // If there's a timer, cancel it
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }
    // Setup the new requestAnimationFrame()
    this.rafId = window.requestAnimationFrame(() => {
      // Run our scroll functions
      for (let i = 0; i < this.state.checkpointNames.length; i++) {
        const checkpointName = this.state.checkpointNames[i];
        if (this.isElementOnScreen(checkpointName)) {
          this.setActiveCheckpoint(checkpointName);
          break;
        }
      }
    });
  }

  setActiveCheckpoint(checkpointName, firstElement = false) {
    if (checkpointName === this.state.activeCheckpointName) return;

    // Remove layers that were associated with previous checkpoint
    if (!firstElement) this.removePriorLayers(this.state.activeCheckpointName);
    if (!firstElement) this.setState({ showChevron: false }) // Hide chevron after first element passes
    // Set layers that are associated with current checkpoint
    this.setGeoJsonLines(checkpointName);
    this.setMarkers(checkpointName);
    // Fly to Checkpoint location
    const currentCheckpointZoom = checkpointLocations[checkpointName][this.state.platform];
    // Not every checkpoint has mobile-specific settings, so find default zoom
    const currentDefaultCheckpointZoom = checkpointLocations[checkpointName];
    // Default to desktop zoom in case no mobile zoom exists
    if (checkpointLocations[checkpointName] !== undefined) this.map.flyTo(currentCheckpointZoom || currentDefaultCheckpointZoom);
    this.setState({
      activeCheckpointName: checkpointName,
    });
  }

  removePriorLayers(checkpointName) {
    if (checkpointMarkers[checkpointName] !== undefined) {
      this.map.removeLayer(checkpointName);
      this.map.removeSource(checkpointName);
    } else {
      console.log(`No marker data to remove for checkpoint: ${checkpointName}`);
    }
    // if (checkpointLines[checkpointName] !== undefined) {
    // this.map.removeLayer(`${checkpointName}-route`);
    // this.map.removeSource(`${checkpointName}-route`);
    // } else {
    // console.log(`No route data for checkpoint: ${checkpointName}`);
    // }
  }

  setLocationMarkers(checkpointName) {
    // create a DOM element for the current location mark
    var el = document.createElement('div');
    el.style.backgroundImage = "url('img/moto-flip.gif')";
    el.style.width = '50px';
    el.style.height = '50px';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundSize = 'contain';

    // Add current location marker to map
    new mapboxgl.Marker(el)
      .setLngLat(this.state.currentLocationCoords)
      .addTo(this.map);
  }

  setMarkers(checkpointName) {
    // Set marker for each checkpoint
    if (checkpointMarkers[checkpointName] !== undefined) {
      this.map.addLayer({
        "id": checkpointName,
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": checkpointMarkers[checkpointName],
          }
        },
        "layout": {
          "icon-image": "{icon}-15",
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [3, 0.6],
          "text-anchor": "top"
        }
      })
    }
    else {
      console.log(`No marker data to add for checkpoint: ${checkpointName}`);
    }
  }

  addAdventureRouteLine() {
    this.map.addLayer({
      "id": "adventureRoute",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": routeLineGeojson,
          }
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#ed5b35",
        "line-width": 4,
      }
    }, 'country-label-sm');
  }

  setGeoJsonLines(checkpointName) {

  }

  isElementOnScreen(id) {
    var element = document.getElementById(id);
    if (element === null) return false; // Prevents errors when changing page while scrolling
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
  }

  updateWindowDimensions() {
    if (window.innerWidth < 900) {
      this.setState({ platform: 'mobile' });
    } else {
      this.setState({ platform: 'desktop' });
    }
  }

  render() {

    return (
      <div>
        <MapContainer ref={el => this.mapContainer = el} />
        <CheckpointsContainer totalDonationAmount={this.state.totalDonationAmount} />
        <Chevron mb={4} justifyContent='center' show={this.state.showChevron} map='true' />
      </div >
    )
  }
}