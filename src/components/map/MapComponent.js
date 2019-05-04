import React from "react";
import { navigate } from "gatsby-link";
import styled from "styled-components"
import CheckpointBox from "./CheckpointBox";
import { checkpointData, checkpointLocations, checkpointMarkers } from "./checkpointData";
import { routeLineGeojson } from "./routeLineGeojson";
import mapboxgl from 'mapbox-gl';
import { Flex, Box } from '@rebass/grid'

mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

const MapContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 50px; /* The height of the header */
  bottom: 0;
  left: 0;
  z-index: -1;
`

export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startCoords: [-78.223, -4], // Near Panama 
      checkpointNames: Object.keys(checkpointLocations),
      activeCheckpointName: '',
      timeout: undefined,
    };
    this.updateMapOnRepaint = this.updateMapOnRepaint.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      zoom: 3.25, // starting zoom
      style: 'mapbox://styles/sweaver12/cjqvo46nh69sp2ssl08nerz6r',
    });
    this.map.setCenter(this.state.startCoords);
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.dragRotate.disable();
    this.map.dragPan.disable();
    this.map.touchZoomRotate.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollZoom.disable();

    this.map.on('load', () => {
      this.setActiveCheckpoint(this.state.checkpointNames[0], true); // Set initial map painting to first checkpoint
      this.addAdventureRouteLine(); // Add Route to map
      // On every scroll event, check which element is on screen and repaint map accordinly
      window.addEventListener('scroll', this.updateMapOnRepaint, false);

    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateMapOnRepaint, false) // Cancel scroll listener
    window.cancelAnimationFrame(this.state.timeout); // Cancel repaint request
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
    // Set layers that are associated with current checkpoint
    this.setGeoJsonLines(checkpointName);
    this.setMarkers(checkpointName);
    // Fly to Checkpoint location
    if (checkpointLocations[checkpointName] !== undefined) this.map.flyTo(checkpointLocations[checkpointName]);
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
          "text-offset": [0, 0.6],
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
        "line-color": "#888888",
        "line-width": 4,
      }
    });
  }

  setGeoJsonLines(checkpointName) {

  }

  isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
  }

  render() {
    const CheckpointsContainer = (className) => (
      <Box pl={6} pt={6}>
        {checkpointData.map((checkpoint, index) => (
          <CheckpointBox id={checkpoint.id}
            title={checkpoint.title}
            description={checkpoint.description}
            checkpointNumber={index + 1}
            totalCheckpoints={checkpointData.length}
            key={index} />
        ))
        }
      </Box>
    )

    return (
      <div>
        <MapContainer ref={el => this.mapContainer = el} />
        <CheckpointsContainer />
      </div >
    )
  }
}