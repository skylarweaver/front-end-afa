import React from "react";
import axios from 'axios';
import styled from "styled-components"
import CheckpointBox from "./CheckpointBox";
import { checkpointData, checkpointLocations, checkpointMarkers } from "./checkpointData";
import { routeLineGeojson } from "./routeLineGeojson";
import DonationsRaised from '../DonationsRaised'
import mapboxgl from 'mapbox-gl';
import { Flex, Box } from '@rebass/grid'
import Navbar from '../Navbar'
import chevron from '../../img/icons/chevron-primary.png'

mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

const MapContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 0px;
  bottom: 0;
  left: 0;
  z-index: -1;
`

const MapNavbar = styled(Navbar)`

`

export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startCoords: [-78.223, -4], // Near Panama 
      checkpointNames: Object.keys(checkpointLocations),
      activeCheckpointName: '',
      timeout: undefined,
      totalDonationAmount: '...........',
      platform: 'desktop',
      showChevron: true,
    };
    this.updateMapOnRepaint = this.updateMapOnRepaint.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.updateWindowDimensions(); // Get current window dimensions to determine if on mobile
    window.addEventListener('resize', this.updateWindowDimensions); // Watch for resize events

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      zoom: 3.25, // starting zoom
      style: 'mapbox://styles/sweaver12/cjqvo46nh69sp2ssl08nerz6r',
    });
    this.map.setCenter(this.state.startCoords);
    // this.addNavigationToMap();

    this.map.on('load', () => {
      this.addAdventureRouteLine(); // Add Route to map
      this.setActiveCheckpoint(this.state.checkpointNames[0], true); // Set initial map painting to first checkpoint
      // On every scroll event, check which element is on screen and repaint map accordinly
      window.addEventListener('scroll', this.updateMapOnRepaint, false);

    })
    this.getCurrentDonationAmount();
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
    if (this.state.timeout) {
      window.cancelAnimationFrame(this.state.timeout);
    }
    // Setup the new requestAnimationFrame()
    const newTimeout = window.requestAnimationFrame(() => {
      // Run our scroll functions
      console.log('debounced');
      for (let i = 0; i < this.state.checkpointNames.length; i++) {
        const checkpointName = this.state.checkpointNames[i];
        if (this.isElementOnScreen(checkpointName)) {
          this.setActiveCheckpoint(checkpointName);
          break;
        }
      }
    });
    this.setState({
      timeout: newTimeout,
    })
  }

  setActiveCheckpoint(checkpointName, firstElement = false) {
    if (checkpointName === this.state.activeCheckpointName) return;

    // Remove layers that were associated with previous checkpoint
    if (!firstElement) this.removePriorLayers(this.state.activeCheckpointName);
    if (!firstElement) this.setState({showChevron: false}) // Hide chevron after first element passes
    // Set layers that are associated with current checkpoint
    this.setGeoJsonLines(checkpointName);
    this.setMarkers(checkpointName);
    // Fly to Checkpoint location
    const currentCheckpointZoom = checkpointLocations[checkpointName][this.state.platform];
    const currentDesktopCheckpointZoom = checkpointLocations[checkpointName]['desktop'];
    const currentDefaultCheckpointZoom = checkpointLocations[checkpointName];
    // Default to desktop zoom in case no mobile zoom exists
    if (checkpointLocations[checkpointName] !== undefined) this.map.flyTo(currentCheckpointZoom || currentDesktopCheckpointZoom || currentDefaultCheckpointZoom);
    // Set class on active checkpoint element
    // document.getElementById(chapterName).setAttribute('class', 'active');
    // document.getElementById(this.state.activeChapterName).setAttribute('class', '');
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

  setMarkers(checkpointName) {
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
    const CheckpointsContainer = (className) => (
      <Box px={[3, 4, 6]} pt={[6, 4, 6]}>
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
          description='While Skylar will be funding the travel himself, Adventures for Alopecia will need monetary support to host support group events, raise awareness, and advance research. Any amount of support you can offer is greatly appreciated. Thank you for helping people with Alopecia.'
          checkpointNumber={checkpointData.length + 1}
          totalCheckpoints={checkpointData.length}
        >
          <DonationsRaised donationAmount={this.state.totalDonationAmount} />
        </CheckpointBox>
      </Box>
    )


    const Chevron = ({ className }) => (
      <Flex className={className} mb={2}>
          <img src={chevron} alt='' width="50" height="100%" />
      </Flex>
    )
    const StyledChevron = styled(Chevron)`
      display: ${props => props.show ? 'initial' : 'none'};
      position: fixed;
      bottom: 0;
      left: 50%;
      margin-left: -25px;
      width: 50px;
    `

    return (
      <div>
        <MapContainer ref={el => this.mapContainer = el} />
        <Box pt={[3, 3, 4]} px={[3, 4, 6]}>
          <MapNavbar dark map />
        </Box>
        <CheckpointsContainer />
        <StyledChevron mb={4} justifyContent='center' show={this.state.showChevron}>
          {/* <Parallax y={["0px", "-100px"]} tagOuter="figure"> */}
            <img src={chevron}  alt='' width="50" height="100%" />
          {/* </Parallax> */}
        </StyledChevron>
      </div >
    )
  }
}