// To View Shopping Order Details
function viewOrder(orderId) {
  // Creating Submit Form
  const form = document.createElement('form');
  // Form Attributes
  form.method = 'get';
  form.action = `/profile/shoppings/details/${orderId}`;
  document.body.appendChild(form);
  form.submit();
}

// To View Trekking Or Tour Details
function viewBooking(bookingId) {
  // Creating Submit Form
  const form = document.createElement('form');
  // Form Attributes
  form.method = 'get';
  form.action = `/profile/bookings/details/${bookingId}`;
  document.body.appendChild(form);
  form.submit();
}
