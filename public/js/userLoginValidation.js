const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');
const form = document.getElementById('form');
const Err = document.getElementById('Err');
const ErrText = document.getElementById('ErrText');

form.addEventListener('submit', (e) => {
    console.log('hello');
  // frontend required validation
  if (email.value === '' || email.value === null) {
    let message = 'Please Enter your email !';
    e.preventDefault();
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  } else if (password.value === '' || password.value === null) {
    let message = 'Please Enter your Password !';
    e.preventDefault();
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  } else if (passwordConfirm.value === '' || passwordConfirm.value === null) {
    let message = 'Please Enter your passwordConfirm !';
    e.preventDefault();
    Err.style.visibility = 'visible';
    ErrText.innerText = message;
  }
});
