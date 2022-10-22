// input fields
const tourName = document.getElementById('tourName');
const tourPlace = document.getElementById('tourPlace');
const tourCountry = document.getElementById('tourCountry');
const tourState = document.getElementById('tourState');
const tourCity = document.getElementById('tourCity');
const tourLogitude = document.getElementById('tourLogitude');
const tourlatitude = document.getElementById('tourlatitude');
const tourDuration = document.getElementById('tourDuration');
const tourReview = document.getElementById('tourReview');
const tourDifficulty = document.getElementById('tourDifficulty');
const tourPrice = document.getElementById('tourPrice');
const tourDiscount = document.getElementById('tourDiscount');
const form = document.getElementById('form');

// Error setting
const Err = document.getElementById('Err');
const ErrText = document.getElementById('ErrText');

// dynamic form setting
const formHeading = document.getElementById('formHeading');
const formDown = document.getElementById('formDown');
const formButton = document.getElementById('formButton');
const formButtonText = document.getElementById('formButtonText');
const formSubmit = document.getElementById('formSubmit');
const formsubmitButton = document.getElementById('formsubmitButton');

// Adding features form
const formDownFeatures = document.getElementById('formDownFeatures');

function itineraryForm() {
  Err.style.visibility = 'hidden';

  // validate Name required
  if (tourName.value === '' || tourName.value === null) {
    let message = 'Please Enter Tour Name !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate place required
  else if (tourPlace.value === '' || tourPlace.value === null) {
    let message = 'Please Enter Tour Place !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate country required
  else if (tourCountry.value === '' || tourCountry.value === null) {
    let message = 'Please Enter Country !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate State required
  else if (tourState.value === '' || tourState.value === null) {
    let message = 'Please Enter State !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate City required
  else if (tourCity.value === '' || tourCity.value === null) {
    let message = 'Please Enter City !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate Logitude required
  else if (tourLogitude.value === '' || tourLogitude.value === null) {
    let message = 'Please Enter Logitude !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate latitude required
  else if (tourlatitude.value === '' || tourlatitude.value === null) {
    let message = 'Please Enter Latitude !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate Durations required
  else if (tourDuration.value === '' || tourDuration.value === null) {
    let message = 'Please Enter Duration !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate review required
  else if (tourReview.value === '' || tourReview.value === null) {
    let message = 'Please Enter Review Rate !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate Price required
  else if (tourPrice.value === '' || tourPrice.value === null) {
    let message = 'Please Enter Price !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate Discount rate required
  else if (tourDiscount.value === '' || tourDiscount.value === null) {
    let message = 'Please Enter Discount rate !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  } else {
    //hidden the drop button
    formButton.style.visibility = 'hidden';
    formButtonText.innerHTML = '';

    // itinerary heading
    formHeading.style.visibility = 'visible';
    formHeading.innerHTML = 'Itinerary';

    // take the day  value
    const day = tourDuration.value;

    // makking dynamic Form
    let i = 0;
    while (i < day) {
      i++;
      // Create a title div
      const titleDiv = document.createElement('div');
      titleDiv.setAttribute('class', 'mb-3 signupSec2FormBar');

      // create a titileLabel
      const tittleLabel = document.createElement('label');
      tittleLabel.setAttribute('class', 'form-label signupSec2Text');
      tittleLabel.innerHTML = `Day ${i} Title`;

      // Create an TitleInput
      const titleInput = document.createElement('input');
      titleInput.setAttribute('type', 'text');
      titleInput.setAttribute('class', 'form-control');
      titleInput.setAttribute('name', `DayTitle`);
      titleInput.setAttribute('placeholder', `Enter Day ${i} Title`);
      titleInput.setAttribute('required', '');

      // Create title form
      const appendTitleDiv = formDown.appendChild(titleDiv);
      appendTitleDiv.appendChild(tittleLabel);
      appendTitleDiv.appendChild(titleInput);

      // Create a Description div
      const descriptionDiv = document.createElement('div');
      descriptionDiv.setAttribute('class', 'mb-3 mt-2');

      // create a DescriptionLabel
      const descriptionLabel = document.createElement('label');
      descriptionLabel.setAttribute(
        'class',
        'form-descriptionLabel signupSec2Text'
      );
      descriptionLabel.innerHTML = `Day ${i} Description`;

      // Create an textarea
      const textarea = document.createElement('textarea');
      textarea.setAttribute('class', 'form-control');
      textarea.setAttribute('name', `DayDescription`);
      textarea.setAttribute('rows', '4');
      textarea.setAttribute('required', '');

      // Create description form
      const appendDescriptionDiv = formDown.appendChild(descriptionDiv);
      appendDescriptionDiv.appendChild(descriptionLabel);
      appendDescriptionDiv.appendChild(textarea);
    }

    // form submit button setting
    formSubmit.style.visibility = 'visible';
    formsubmitButton.innerHTML = 'Submit';
  }
}

// Adding feature form
function addFeatures() {
  // Create a div
  const div = document.createElement('div');
  div.setAttribute('class', 'mb-3 pe-2 signupSec2FormBar');

  // create a Label
  const label = document.createElement('label');
  label.setAttribute('class', 'form-label signupSec2Text');
  label.innerHTML = 'Feature';

  // Create an Input
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('class', 'form-control');
  input.setAttribute('name', 'tourFeatures');
  input.setAttribute('placeholder', 'Enter Feature');
  input.setAttribute('required', '');

  // Create feature form
  const appendDiv = formDownFeatures.appendChild(div);
  appendDiv.appendChild(label);
  appendDiv.appendChild(input);
}
