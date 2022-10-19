const title = document.getElementById('title');
const place = document.getElementById('place');
const shortDescription = document.getElementById('shortDescription');
const form = document.getElementById('form');
const Err = document.getElementById('Err');
const ErrText = document.getElementById('ErrText');

form.addEventListener('submit', (e) => {
  // frontend required validation
  if (title.value === '' || title.value === null) {
    let message = 'Please Enter News Title !';
    e.preventDefault();
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  } else if (place.value === '' || place.value === null) {
    let message = 'Please Enter Place !';
    e.preventDefault();
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  } else if (shortDescription.value === '' || shortDescription.value === null) {
    let message = 'Please Enter Short Description !';
    e.preventDefault();
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
});
