// Set Min Value in Date Field
var today = new Date().toISOString().split('T')[0];
document.getElementById('setTodaysDate').setAttribute('min', today);

window.addEventListener('load', () => {
  const popup = document.getElementById('Popup');
  console.log(popup.innerHTML);
  if (popup.innerHTML == 'true') {
    console.log('start');
    Swal.fire({
      title: 'Booked',
      text: 'Confirmation Message will be Send Soon !',
      confirmButtonColor: '#3085d6',
    });
    popup.innerHTML = '';
  }
});

function successBookking() {
  $.ajax({
    url: ` /shoppings//booking/:userId/:packageId/:packageCategory`,
    type: 'post',
    cache: false,
    success: (res) => {
      Swal.fire({
        title: 'Booked',
        text: 'Conformation Message will Come Soon !',
        confirmButtonColor: '#3085d6',
      });
    },
  });
}
