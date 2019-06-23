// Specifies content for each checkpoint
export const checkpointData = [
  {
    id: 'panAmericanHighway',
    title: 'The Route',
    // Format and spacing matter b/c it's markdown content
    description: `Keeping an open mind, Skylar will be adjusting his exact route with each passing day while generally following the "Pan-American Highway." Measuring 19,000 miles as the world's longest motorable road, the Pan-American Highway is really a misnomer, consisting of more small dirt and gravel roads than actual highways.  

Along the way, Adventures for Alopecia will be hosting support group events in various cities. Aside from those stops, the rest of the route will be devised along the way.`
  },
  {
    id: 'washington',
    title: 'Washington, DC',
    description: 'Skylar will start in Washington, DC, where he has lived for the past 3 years working as a software developer. Quitting his job and utilizing his savings for the travel expenses, Skylar will kickoff the adventure in Washington, D.C.'
  },
  {
    id: 'mexicoCity',
    title: 'Mexico City',
    description: 'Along the way, Skylar will be working with Adventures for Alopecia to host support events for those living with Alopecia. The first of these events will be with the Children\'s Alopecia Project support group in Mexico City.'
  },
  {
    id: 'panamaCity',
    title: 'Panama City',
    description: 'After Mexico City, Skylar will venture to Panama city where Adventures for Alopecia will sponsor their second support event with an National Alopecia Areata Foundation support group that exists there.'
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
      "title": "Mexico City Alopecia Support Event",
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
      "title": "Panama Alopecia Support Event",
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
