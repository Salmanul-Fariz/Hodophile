const coordinateDiv = document.getElementById('coordinateDiv');
const coordinates = coordinateDiv.getElementsByTagName('p');

// coordinates set to array
let coordinatesArray = [];
for (let i = 0; i < coordinates.length; i++) {
  coordinatesArray.push(coordinates[i].innerHTML.split(','));
}

// Use Access Token
mapboxgl.accessToken =
  'pk.eyJ1IjoicmVtb3gwIiwiYSI6ImNsOWI3OWM0eDB4aDIzbms5bXcwa25ianEifQ.pR3T2n66FqkoZHEEIPxUDA';

// map setting
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  scroolZoom: false,
});

const bound = new mapboxgl.LngLatBounds();

// add markers to map
for (const lnglat of coordinatesArray) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';
  // make a marker for each feature and add to the map
  new mapboxgl.Marker({ element: el, anchor: 'bottom' })
    .setLngLat(lnglat)
    .addTo(map);

  bound.extend(lnglat);
}
map.fitBounds(bound, {
  padding: {
    top: 130,
    bottom: 80,
    left: 80,
    right: 80,
  },
});
