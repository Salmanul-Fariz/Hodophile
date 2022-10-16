// const coordinateDiv = document.getElementById('coordinateDiv');
let coordinates = document.getElementById('coordinateDiv').innerHTML;
console.log(coordinates);

// remove {,} from the string
coordinates = coordinates.replace('{', '');
coordinates = coordinates.replace('}', '');
coordinates = coordinates.replace(/,/g, ',');
coordinates = coordinates.replace(/:/g, ',');

// coordinates set to array
let coordinatesArray = [];
coordinatesArray.push(coordinates.split(','));

// Use Access Token
mapboxgl.accessToken =
  'pk.eyJ1IjoicmVtb3gwIiwiYSI6ImNsOWI3OWM0eDB4aDIzbms5bXcwa25ianEifQ.pR3T2n66FqkoZHEEIPxUDA';

// map setting
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  scroolZoom: false,
  center: [coordinatesArray[0][1], coordinatesArray[0][3]],
  zoom: 10,
});

// add markers to map
const el = document.createElement('div');
el.className = 'marker';
// make a marker for each feature and add to the map
new mapboxgl.Marker({ element: el, anchor: 'bottom' })
  .setLngLat({ lng: coordinatesArray[0][1], lat: coordinatesArray[0][3] })
  .addTo(map);
