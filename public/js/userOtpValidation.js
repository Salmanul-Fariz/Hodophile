const Otp = document.getElementById('Otp');
const form = document.getElementById('form');
const Err = document.getElementById('Err');
const ErrText = document.getElementById('ErrText');


form.addEventListener('submit', (e) => {
    // frontend required validation
    if (Otp.value.length != 6) {
        let message = 'Please Enter valid OTP !';
        e.preventDefault();
        Err.style.visibility = 'visible';
        ErrText.innerText = message;
      }
})