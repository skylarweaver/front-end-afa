// Specifies content for each checkpoint
export const checkpointData = [
  {
    id: 'panAmericanHighway',
    title: 'The Projected Route',
    // Format and spacing matter b/c it's markdown content
    description: `August 2023 Update: Skylar began the adventure departing from Washington, DC in August 2019, and reached Ushuaia in December 2023. The trip took 3.5 years in total and covered 21,000 miles and 14 countries. Along the way, Skylar raised awareness of Alopecia and tried to meet with as many people with Alopecia as he could. See <a target="_blank" href="https://mailchi.mp/2290b7299c97/afa-adventure-report-2023" rel="noopener">here</a> to read more about the adventure summary.  
    
  The actual path taken deviates slightly from the path shown here on the map, but the general direction and most of the checkpoints remain true, although exact order of events may be slightly different. I am leaving the planned map and checkpoints here in their original form for historical purposes. Enjoy and thank your for your support!`    
  },
  {
    id: 'washington',
    title: 'Washington, DC',
    description: 'Skylar started in Washington, DC, where he lived for the past 3 years working as a software developer. Quitting his job and utilizing his savings for the travel expenses, Skylar kicked off the adventure on August 26th 2019!'
  },
  {
    id: 'mexicoCity',
    title: 'Mexico City',
    description: 'Along the way, Skylar is working with Adventures for Alopecia to host support events for those living with Alopecia. The first of these events was held with the Children\'s Alopecia Project support group in Xalapa, Mexico. Check <a target="_blank" href="https://www.facebook.com/2195004050813768/posts/2349757368671768/?d=n" rel="noopener">Facebook</a> or <a target="_blank" href="https://www.instagram.com/p/B4lFHz7FaZ_/" rel="noopener">Instagram</a> for pics!'
  },
  {
    id: 'panamaCity',
    title: 'Panama City',
    description: 'After Mexico City, Skylar will make his way to Panama city where he will have to figure out how to get himself and his motorcycle to Colombia.'
  },
  {
    id: 'darienGap',
    title: 'The Darién Gap',
    description: 'The one known obstacle along the way is a 100-mile swath of treacherous jungle between Colombia and Panama named the Darién Gap. It’s separates the northern Pan-American highway from its southern counterpart, and Skylar will need to either circumnavigate it via a boat from Panama to Colombia, or trek through the Gap with his motorcycle.'
  },
  {
    id: 'southAmerica',
    title: 'South America',
    description: 'Upon entering South America, Skylar will begin in Colombia, hugging the western side of the continent while meandering his way to various support group locations, natural wonders, and his ultimate destination: Patagonia.',
    descriptionOld: 'Throughout the trip, Skylar will meeting locals and foreigners, keeping an active <a href="https://www.instagram.com/adventuresforalopecia/" target="_blank" rel="noopener noreferrer">social media presence</a>, and reaching out to press outlets along the route all to try to increase education of Alopecia. If you have any contacts who may be able to help, or you know someone with Alopecia in Central or South America, please <a href="mailto:info@projectAFA.org?subject=Adventures for Alopecia Inquiry" target="_blank" rel="noopener noreferrer">let me know</a>.'
  },
  {
    id: 'buenosAires',
    title: 'Buenos Aires',
    description: 'Another Alopecia support event will be hosted in Buenos Aires, where there is a substantial Alopecia support network.'
  },
  {
    id: 'tierraDelFuego',
    title: 'Tierra Del Fuego',
    description: 'The ultimate destination: the land of the fire. At the southern tip of South America lies this remote mining area. With winter conditions year-round, it’ll be a chilly ride, but the area supposedly brings views more impressive than its name.'
  },
]

// Specifies zoom location and level for each checkpoint
export const checkpointLocations = {
  'panAmericanHighway': {
    desktop: {
      duration: 1000,
      center: [-78.223, -4],
      zoom: 2,
      pitch: 0
    },
    mobile: {
      duration: 1000,
      center: [-78.223, -4],
      zoom: 1.75,
      pitch: 0
    }
  },
  'washington': {
    desktop: {
      center: [-81.431, 37.875],
      zoom: 6,
      pitch: 0
    },
    mobile: {
      center: [-77.0369, 38.9072],
      zoom: 6,
      pitch: 0
    }
  },
  'mexicoCity': {
    center: [-99.12940083018961, 19.4085633410823],
    zoom: 6,
    pitch: 0
  },
  'panamaCity': {
    center: [-79.53423528374223, 8.974817305967207],
    zoom: 6,
    pitch: 0
  },

  'darienGap': {
    // duration: 6000,
    center: [-78.223, 8.711],
    zoom: 5,
    // speed: 0.6,
    pitch: 30
  },
  'southAmerica': {
    center: [-69.51834363905127, -17.783243753042626],
    zoom: 3,
    pitch: 0
  },
  'buenosAires': {
    center: [-58.4516368231063, -34.63117168498165],
    zoom: 6,
    pitch: 0
  },
  'tierraDelFuego': {
    center: [-68.32415, -54.80548],
    zoom: 6,
    pitch: 20,
    speed: 0.5
  },
  'donate': {
    desktop: {
      duration: 1000,
      center: [-78.223, -4],
      zoom: 2,
      pitch: 0
    },
    mobile: {
      duration: 1000,
      center: [-78.223, -4],
      zoom: 1.75,
      pitch: 0
    }
  },
};

// Specifies markers for each checkpoint
export const checkpointMarkers = {
  'panAmericanHighway': [
    {
      "type": "Feature",
      "properties": {
        "title": "Washington, DC",
        "icon": "star",
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.03238901390978, 38.913188059745586
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Tierra del Feugo",
        "icon": "star",
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -66.977635233506, -54.730288843741285
        ]
      }
    }
  ],
  'washington': [{
    "type": "Feature",
    "properties": {
      "title": "Washington, DC",
      "icon": "star",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        -77.03238901390978, 38.913188059745586
      ]
    }
  }],
  'mexicoCity': [{
    "type": "Feature",
    "properties": {
      "title": "Mexico Alopecia Support Event",
      "icon": "star",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-99.12940083018961, 19.4085633410823]
    }
  }],
  'panamaCity': [{
    "type": "Feature",
    "properties": {
      "title": "Panama City",
      "icon": "star",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-79.53423528374223, 8.974817305967207]
    }
  }],
  'darienGap': [{
    "type": "Feature",
    "properties": {
      "title": "Darién Gap",
      "icon": "star",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        -77.39700176220218,
        7.37935785894139
      ]
    }
  }],
  'buenosAires': [{
    "type": "Feature",
    "properties": {
      "title": "Argentina Alopecia Support Event",
      "icon": "star",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-58.4516368231063, -34.63117168498165]
    }
  }],
  'tierraDelFuego': [{
    "type": "Feature",
    "properties": {
      "title": "Tierra del Feugo",
      "icon": "star",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        -68.32415, -54.80548
      ]
    }
  }],
  'donate': [
    {
      "type": "Feature",
      "properties": {
        "title": "Washington, DC",
        "icon": "star",
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.03238901390978, 38.913188059745586
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Tierra del Feugo",
        "icon": "star",
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -66.977635233506, -54.730288843741285
        ]
      }
    }
  ],
};
