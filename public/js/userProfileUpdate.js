// Personal Details Err
window.addEventListener('load', () => {
  const userErr = document.getElementById('userErr');
  console.log(userErr);
  if (userErr) {
    setTimeout(() => {
      userErr.innerHTML = '';
    }, 3000);
  }
});
