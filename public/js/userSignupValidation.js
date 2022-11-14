const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const contact = document.getElementById('contact');
const age = document.getElementById('age');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');
const form = document.getElementById('form');
const Err = document.getElementById('Err');
const ErrText = document.getElementById('ErrText');

// Error Scroll
window.addEventListener('load', () => {
  if (ErrText) {
    window.scrollTo(5, 5);
  }
});

form.addEventListener('submit', (e) => {
  // frontend required validation
  if (firstName.value === '' || firstName.value === null) {
    let message = 'Please Enter your First Name !';
    e.preventDefault();
    window.scrollTo(5, 5);
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  } else if (lastName.value === '' || lastName.value === null) {
    let message = 'Please Enter your Last Name !';
    e.preventDefault();
    window.scrollTo(5, 5);
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  } else if (email.value === '' || email.value === null) {
    let message = 'Please Enter your email !';
    e.preventDefault();
    window.scrollTo(5, 5);
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  } else if (contact.value === '' || contact.value === null) {
    let message = 'Please Enter your Contact !';
    e.preventDefault();
    window.scrollTo(5, 5);
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  } else if (age.value === '' || age.value === null) {
    let message = 'Please Enter your age !';
    e.preventDefault();
    window.scrollTo(5, 5);
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  } else if (password.value === '' || password.value === null) {
    let message = 'Please Enter your Password !';
    e.preventDefault();
    window.scrollTo(5, 5);
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  } else if (passwordConfirm.value === '' || passwordConfirm.value === null) {
    let message = 'Please Enter your passwordConfirm !';
    e.preventDefault();
    window.scrollTo(5, 5);
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // contact validation
  else if (contact.value.length != 10) {
    let message = 'Please Enter valid contact !';
    e.preventDefault();
    window.scrollTo(5, 5);
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // Age validation
  else if (age.value > 100) {
    let message = 'Please Enter correct age !';
    e.preventDefault();
    window.scrollTo(5, 5);
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // password validation
  else if (password.value.length < 6) {
    let message = 'Please Enter Strong Password !';
    e.preventDefault();
    window.scrollTo(5, 5);
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
  // passwordConfirm validation
  else if (password.value !== passwordConfirm.value) {
    let message = `Password didn't match`;
    e.preventDefault();
    window.scrollTo(5, 5);
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
});
