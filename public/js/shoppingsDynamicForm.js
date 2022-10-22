// input fields
const shoppingName = document.getElementById('shoppingName');
const shoppingShortName = document.getElementById('shoppingShortName');
const shoppingCategory = document.getElementById('shoppingCategory');
const shoppingReview = document.getElementById('shoppingReview');
const ShoppingPrice = document.getElementById('ShoppingPrice');
const shoppingDiscount = document.getElementById('shoppingDiscount');

// add Button
const formDownHighlight = document.getElementById('formDownHighlight');
const formDownSpecifications = document.getElementById(
  'formDownSpecifications'
);

// add Description Form 
const formDown = document.getElementById('formDown')
const formButton = document.getElementById('formButton')

// Form validation
function formValidation() {
  Err.style.visibility = 'hidden';

  // validate Name required
  if (shoppingName.value === '' || shoppingName.value === null) {
    let message = 'Please Enter Product Name !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate Short Name required
  else if (shoppingShortName.value === '' || shoppingShortName.value === null) {
    let message = 'Please Enter Short Name !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate Category required
  else if (shoppingCategory.value === 'Select Category') {
    let message = 'Please Select Category !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate Review required
  else if (shoppingReview.value === '' || shoppingReview.value === null) {
    let message = 'Please Enter Review !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate price required
  else if (ShoppingPrice.value === '' || ShoppingPrice.value === null) {
    let message = 'Please Enter Price !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // validate Discount required
  else if (shoppingDiscount.value === '' || shoppingDiscount.value === null) {
    let message = 'Please Enter Discount !';
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  } else {
    //hidden the drop button
    formButton.style.visibility = 'hidden';
    formButtonText.innerHTML = '';

    // Create a Shortdescription div
    const div = document.createElement('div');
    div.setAttribute('class', 'mb-3 signupSec2FormBar w-75');

    // create a DescriptionLabel
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('class', 'form-label signupSec2Text');
    descriptionLabel.innerHTML = `Short Description`;

    // Create an textarea
    const textarea = document.createElement('textarea');
    textarea.setAttribute('class', 'form-control');
    textarea.setAttribute('name', `shoppingShortDescription`);
    textarea.setAttribute('rows', '4');
    textarea.setAttribute('required', '');

    // Create description form
    const appendDescriptionDiv = formDown.appendChild(div);
    appendDescriptionDiv.appendChild(descriptionLabel);
    appendDescriptionDiv.appendChild(textarea);

    // form submit button setting
    formSubmit.style.visibility = 'visible';
    formsubmitButton.innerHTML = 'Submit';
  }
}

// Add Highlights
function addHighlights() {
  // Create a div
  const div = document.createElement('div');
  div.setAttribute('class', 'mb-3 pe-2 signupSec2FormBar');

  // create a Label
  const label = document.createElement('label');
  label.setAttribute('class', 'form-label signupSec2Text');
  label.innerHTML = 'Highlights';

  // Create an Input
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('class', 'form-control');
  input.setAttribute('name', 'shoppingHighlights');
  input.setAttribute('placeholder', 'Enter Highlights');
  input.setAttribute('required', '');

  // Create Highlights form
  const appendDiv = formDownHighlight.appendChild(div);
  appendDiv.appendChild(label);
  appendDiv.appendChild(input);
}

// Add Specifications
function addSpecifications() {
  // Create a div
  const div = document.createElement('div');
  div.setAttribute('class', 'mb-3 pe-2 signupSec2FormBar');

  // create a Label
  const label = document.createElement('label');
  label.setAttribute('class', 'form-label signupSec2Text');
  label.innerHTML = 'Specifications';

  // Create an Input
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('class', 'form-control');
  input.setAttribute('name', 'shoppingSpecifications');
  input.setAttribute('placeholder', 'Enter Specifications');
  input.setAttribute('required', '');

  // Create Specifications form
  const appendDiv = formDownSpecifications.appendChild(div);
  appendDiv.appendChild(label);
  appendDiv.appendChild(input);
}
