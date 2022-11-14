const email = document.getElementById('email');
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
  if (email.value === '' || email.value === null) {
    let message = 'Please Enter your email !';
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
