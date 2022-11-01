// Set Min Value in Date Field
var today = new Date().toISOString().split('T')[0];
document.getElementById('setTodaysDate').setAttribute('min', today);


// Payment settings
function successBookking(userId, packageId, packageCategory) {
  const bookingTravallers = document.getElementById('bookingTravallers').value;
  const setTodaysDate = document.getElementById('setTodaysDate').value;

  if (!bookingTravallers || !bookingTravallers) {
    // if value is not
    const ErrText = document.getElementById('ErrText');
    ErrText.innerHTML = 'Fields are Required !';
    setTimeout(() => {
      ErrText.innerHTML = '';
    }, 2500);
  } else {
    let orderId, cash, name, email, contact, bookingId;

    $.ajax({
      url: `/bookings/${userId}/${packageId}/${packageCategory}`,
      type: 'post',
      cache: false,
      data: {
        bookingContact: document.getElementById('bookingContact').value,
        bookingEmail: document.getElementById('bookingEmail').value,
        bookingTravallers: bookingTravallers,
        bookingDate: setTodaysDate,
        bookingPrice: document.getElementById('tourPrice').innerHTML * 1,
        BookingTotal: document.getElementById('tourTotal').innerHTML * 1,
        bookingDiscount: Math.abs(
          document.getElementById('tourDiscount').innerHTML * 1
        ),
      },
      success: (res) => {
        orderId = res.orderId;
        cash = res.price;
        name = res.name;
        contact = res.contact;
        email = res.email;
        bookingId = res.bookingId;

        // Setting Razorpay payment Option
        const options = {
          key: 'rzp_test_0QcZGwIjWOF25m',
          amount: cash,
          currency: 'INR',
          name: 'Hodophile',
          description: 'Booking Tour Package',
          image: 'http://localhost:3000/images/logoText.png',
          order_id: orderId,
          callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
          notes: {
            address: 'Razorpay Corporate Office',
          },
          prefill: {
            name: name,
            email: email,
            contact: contact,
          },
          theme: {
            color: '#3399cc',
          },

          // when it is success
          handler: function (response) {
            $.ajax({
              url: `/bookings/success/${bookingId}`,
              type: 'get',
              cache: false,
              success: (res) => {
                Swal.fire({
                  title: 'Booked',
                  text: 'Confirmation Message will be Send Soon !',
                  confirmButtonColor: '#3085d6',
                }).then((result) => {
                  if (result.isConfirmed) {
                    if(packageCategory =='Tour'){
                      location.replace(`/tours/${packageId}`);
                    }else{
                      location.replace(`/trekkings/${packageId}`);
                    }
                  }
                });
              },
            });
          },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();

        // When It Is failed
        rzp1.on('payment.failed', function (response) {
          $.ajax({
            url: `/bookings/failed/${bookingId}`,
            type: 'get',
            cache: false,
          });
        });
      },
    });
  }
}
