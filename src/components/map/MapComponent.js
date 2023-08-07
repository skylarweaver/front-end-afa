import React from "react";
import axios from 'axios';
import styled from "styled-components"
import CheckpointBox from "./CheckpointBox";
import { checkpointData, checkpointLocations, checkpointMarkers } from "./checkpointData";
import { routeLineGeojson } from "./routeLineGeojson";
import DonationsRaised from '../DonationsRaised'
import mapboxgl from 'mapbox-gl';
import { Box } from '@rebass/grid';
import Chevron from '../Chevron';
import Link from '../GatsbyLink'
import locateIcon from '../../img/icons/locate-icon.png';
import locateIconBack from '../../img/icons/locate-icon-back.png';
import riderGif from '../../img/icons/rider-small.gif';
import estimoteSmallIcon from '../../img/logos/estimote-small.png';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

const MapContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  bottom: 0;
  left: 0;
  z-index: ${(props) => props.showCheckpointContainer ? '-1' : '0'};
`

const LocateSkylarIcon = styled.img`
  display: ${(props) => props.showCheckpointContainer ? 'initial' : 'none'};
  position: fixed;
  left: 50px;
  bottom: 50px;
  height: 100px;
  width: 100px;
  box-shadow: -2px 2px 5px 2px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: 200ms;
  &:focus {
  }
  &:hover {
    cursor: pointer;
    box-shadow: -2px 2px 7px 6px rgba(0,0,0,0.3);
  };
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    left: 25px;
    bottom: 25px;
    height: 75px;
    width: 75px;
  }
`
const LocateSkylarIconBack = styled.img`
  display: ${(props) => props.showCheckpointContainer ? 'none' : 'initial'};
  position: fixed;
  left: 50px;
  bottom: 50px;
  height: 100px;
  width: 100px;
  box-shadow: -2px 2px 5px 2px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: 300ms;
  &:focus {
  }
  &:hover {
    cursor: pointer;
    box-shadow: -2px 2px 7px 6px rgba(0,0,0,0.3);
  };
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    left: 25px;
    bottom: 25px;
    height: 75px;
    width: 75px;
  }
`
const EstimoteLink = styled(Link)`
  display: ${(props) => props.showCheckpointContainer ? 'none' : 'initial'};
  position: fixed;
  right: 50px;
  bottom: 50px;
  text-align: center;
  font-size: 12px;
  color: black;
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    right: 20px;
    bottom: 25px;
  &:hover {
    text-decoration: none!important;
    cursor: pointer;
  };
}
`
const EstimoteIcon = styled.img`
  height: 20px;
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    height: 15px;
  }
`

const CheckpointsContainer = ({ totalDonationAmount }) => (
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
      title='Thank you'
      description='While Skylar funded the travel himself, donations were used to host support group events, raise awareness, and advance research. Your support and encouragement is greatly appreciated. Thank you for helping people with Alopecia.'
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
      showCheckpointContainer: true,
    };
    this.rafId = undefined;
    this.updateMapOnRepaint = this.updateMapOnRepaint.bind(this);
    this.showSkylar = this.showSkylar.bind(this);
    this.showCheckpoints = this.showCheckpoints.bind(this);
    // Stop scrolling on this component when in Skylar's location map view
    const targetRef = React.createRef();
    this.targetElement = targetRef.current;
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
    this.map.on('load', () => {
      this.addAdventureRouteLine(); // Add Route to map
      this.setActiveCheckpoint(this.state.checkpointNames[0], true); // Set initial map painting to first checkpoint
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
      const currentLocationCoords = [locationDataRes.data.values[0][2], locationDataRes.data.values[0][1]];
      this.setLocationMarkers(currentLocationCoords);
      this.setState({ currentLocationCoords })
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

  // Removes navigation capability from the map
  removeNavigationFromMap() {
    this.map.dragRotate.disable();
    this.map.dragPan.disable();
    this.map.touchZoomRotate.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollZoom.disable();
  }

  // Adds navigation capability to the map
  addNavigationToMap() {
    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  }

  componentWillUnmount() {
    this.removeEventListeners();
    clearAllBodyScrollLocks();
    this.map.remove();
  }

  removeEventListeners() {
    window.removeEventListener('scroll', this.updateMapOnRepaint, false) // Cancel scroll listener
    window.cancelAnimationFrame(this.state.timeout); // Cancel repaint request
    // window.removeEventListener('resize', this.updateWindowDimensions);
  }

  addEventListeners() {
    window.addEventListener('scroll', this.updateMapOnRepaint, false);
  }

  updateMapOnRepaint() {
    // If there's a timer, cancel it
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }
    // Setup the new requestAnimationFrame()
    this.rafId = window.requestAnimationFrame(() => {
      // Update active checkpoint based on scroll position 
      for (let i = 0; i < this.state.checkpointNames.length; i++) {
        const checkpointName = this.state.checkpointNames[i];
        if (this.isElementOnScreen(checkpointName)) {
          this.setActiveCheckpoint(checkpointName);
          break;
        }
      }
    });
  }

  setActiveCheckpoint(checkpointName, firstCheckpoint = false) {
    if (checkpointName === this.state.activeCheckpointName) return;

    // Remove layers that were associated with previous checkpoint
    if (!firstCheckpoint) this.removePriorLayers(this.state.activeCheckpointName);
    if (!firstCheckpoint) this.setState({ showChevron: false }) // Hide chevron after first element passes
    // Set layers that are associated with current checkpoint
    this.setGeoJsonLines(checkpointName);
    this.setMarkers(checkpointName);

    this.zoomToCheckpoint(checkpointName);

    this.setState({
      activeCheckpointName: checkpointName,
    });
  }

  zoomToCheckpoint(checkpointName) {
    // Fly to Checkpoint location
    const currentCheckpointZoom = checkpointLocations[checkpointName][this.state.platform];
    // Not every checkpoint has mobile-specific settings, so find default zoom
    const currentDefaultCheckpointZoom = checkpointLocations[checkpointName];
    // Default to desktop zoom in case no mobile zoom exists
    if (checkpointLocations[checkpointName] !== undefined) this.map.flyTo(currentCheckpointZoom || currentDefaultCheckpointZoom);
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

  setLocationMarkers(currentLocationCoords) {
    // create a DOM element for the current location mark
    var riderGifEl = document.createElement('div');
    // el.style.backgroundImage = "url('img/moto-flip.gif')";
    riderGifEl.style.backgroundImage = `url(${riderGif})`;
    riderGifEl.style.width = '75px';
    riderGifEl.style.height = '75px';
    riderGifEl.style.backgroundRepeat = 'no-repeat';
    riderGifEl.style.backgroundSize = 'contain';

    // Add current location marker to map
    new mapboxgl.Marker(riderGifEl)
      .setLngLat(currentLocationCoords)
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
        'line-dasharray': [3, 3],

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

  showSkylar() {
    this.removeEventListeners();
    this.setState({ showCheckpointContainer: false })
    if (this.state.currentLocationCoords !== undefined) this.map.flyTo({
      center: this.state.currentLocationCoords,
      zoom: 5,
      pitch: 0
    });
    disableBodyScroll(this.targetElement);
    this.setState({ showChevron: false });
  }

  showCheckpoints() {
    this.zoomToCheckpoint(this.state.activeCheckpointName);
    this.addEventListeners();
    this.updateMapOnRepaint();
    this.setState({ showCheckpointContainer: true })
    enableBodyScroll(this.targetElement);
    this.setState({ showChevron: true });
  }

  render() {

    return (
      <div>
        <MapContainer ref={el => this.mapContainer = el} showCheckpointContainer={this.state.showCheckpointContainer} />
        <CheckpointsContainer totalDonationAmount={this.state.totalDonationAmount} />
        <Chevron mb={4} justifyContent='center' show={this.state.showChevron} map='true' />
        <LocateSkylarIcon src={locateIcon} onClick={this.showSkylar} alt="Go to Skylar's current location" showCheckpointContainer={this.state.showCheckpointContainer} />
        <LocateSkylarIconBack src={locateIconBack} onClick={this.showCheckpoints} alt="Go to back to planned route" showCheckpointContainer={this.state.showCheckpointContainer} />
        <EstimoteLink to="https://estimote.com" showCheckpointContainer={this.state.showCheckpointContainer}>
          Tracking by
          <br></br>
          <EstimoteIcon src={estimoteSmallIcon} />
        </EstimoteLink>
      </div >
    )
  }
}