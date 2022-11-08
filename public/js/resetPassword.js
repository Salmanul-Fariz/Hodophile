const Err = document.getElementById('Err');
const ErrText = document.getElementById('ErrText');
const submitButton = document.getElementById('submitButton');

// Send Otp
function sendOTP() {
  const email = document.getElementById('OtpEmail');
  const mailformat =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})/;
  if (email.value && email.value.match(mailformat)) {
    $.ajax({
      url: `/reset`,
      type: 'post',
      data: {
        email: email.value,
      },
      success: (res) => {
        if (res.status) {
          submitButton.setAttribute('onclick', 'checkVerification()');
          Err.style.visibility = 'visible';
          ErrText.innerHTML = 'OTP Send';
          setTimeout(() => {
            Err.style.visibility = 'hidden';
            ErrText.innerHTML = '';
          }, 1000);
        }
      },
    });
  } else {
    Err.style.visibility = 'visible';
    ErrText.innerHTML = 'Enter Email Address Correct !';
    setTimeout(() => {
      Err.style.visibility = 'hidden';
      ErrText.innerHTML = '';
    }, 2000);
  }
}

// verify OTP For Rest Password
function checkVerification() {
  const otp = document.getElementById('restOTP');
  if (otp.value) {
    $.ajax({
      url: `/resetOtp`,
      type: 'post',
      data: {
        restOTP: otp.value,
      },
      success: (res) => {
        if (res.status) {
          location.replace('/reset/password');
        } else {
          Err.style.visibility = 'visible';
          ErrText.innerHTML = 'Enter OTP Correctly !';
          setTimeout(() => {
            Err.style.visibility = 'hidden';
            ErrText.innerHTML = '';
          }, 2000);
        }
      },
    });
  } else {
    Err.style.visibility = 'visible';
    ErrText.innerHTML = 'Required Field !';
    setTimeout(() => {
      Err.style.visibility = 'hidden';
      ErrText.innerHTML = '';
    }, 2000);
  }
}
