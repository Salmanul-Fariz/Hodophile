const images = document.getElementsByClassName('shoppingDetailsImage');
const box = document.getElementById('lightBox');
const zoomImage = document.getElementById('zoomImage');

function zoomImagefunction(id) {
  zoomImage.setAttribute('src', `/images/shopping/${id}`);
  box.style.visibility = 'visible';
}
function closeZoom() {
  box.style.visibility = 'hidden';
}
