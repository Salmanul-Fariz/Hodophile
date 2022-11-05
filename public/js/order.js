// Setting Razorpay payment Option
function razorpayFunction(cash, rzOrderId, name, email, contact, types) {
  const options = {
    key: 'rzp_test_0QcZGwIjWOF25m',
    amount: cash,
    currency: 'INR',
    name: 'Hodophile',
    description: 'Booking Tour Package',
    image: 'http://localhost:3000/images/logoText.png',
    order_id: rzOrderId,
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
        url: `/shoppings/success`,
        type: 'get',
        cache: false,
        success: (res) => {
          Swal.fire({
            title: 'Order',
            text: 'Success your Order !',
            confirmButtonColor: '#3085d6',
          }).then((result) => {
            if (result.isConfirmed) {
              console.log(types);
              if (types == 'Products') {
                location.replace(`/shoppings`);
              } else {
                location.replace(`/shoppings/carts`);
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
      url: `/shoppings/failed`,
      type: 'get',
      cache: false,
    });
  });
}

// Check out Function
function checkOut(orderType, userId, productId) {
  const radio = document.getElementsByClassName('radioformAddress');

  let AddressIndex;
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      AddressIndex = radio[i];
    }
  }

  // check Cash on delivery or online payment
  const deliveryRadio = document.getElementsByClassName('deliveryRadio');
  let deliveryIndex;
  for (let i = 0; i < deliveryRadio.length; i++) {
    if (deliveryRadio[i].checked) {
      deliveryIndex = deliveryRadio[i];
    }
  }
  if (AddressIndex == null) {
    // If Not Select Address
    const ErrText = document.getElementById('ErrText');
    ErrText.innerHTML = 'Add Address !';
    setTimeout(() => {
      ErrText.innerHTML = '';
    }, 2500);
  } else {
    // send post method
    let deliveryType;
    if (deliveryIndex.value == 0) {
      deliveryType = 'Cash On Delivery';
    } else {
      deliveryType = 'Online Payment';
    }

    // payment is in online
    if (deliveryType == 'Online Payment') {
      // Order With a Product
      if (orderType == 'Product') {
        let cash, rzOrderId, name, email, contact;
        const orderQuantity = document.getElementById('orderQuantity').value;
        let couponId = document.getElementById('couponId');
        if (couponId) {
          couponId = couponId.innerHTML.split(',')[0];
        } else {
          couponId = false;
        }

        $.ajax({
          url: `/shoppings/${orderType}/${userId}/${productId}`,
          type: 'post',
          data: {
            addressIndex: AddressIndex.value,
            productQuatity: orderQuantity,
            deliveryType: deliveryType,
            orderCoupon: couponId,
          },
          cache: false,
          success: (res) => {
            cash = res.cash;
            rzOrderId = res.rzOrderId;
            name = res.name;
            email = res.email;
            contact = res.contact;

            razorpayFunction(cash, rzOrderId, name, email, contact, 'Products');
          },
        });
      } else if (orderType == 'Cart') {
        let couponId = document.getElementById('couponId');

        let cash, rzOrderId, name, email, contact, orderId;

        if (couponId) {
          couponId = couponId.innerHTML.split(',')[0];
        } else {
          couponId = false;
        }

        $.ajax({
          url: `/shoppings/${orderType}/${userId}/${productId}`,
          type: 'post',
          data: {
            addressIndex: AddressIndex.value,
            deliveryType: deliveryType,
            orderCoupon: couponId,
          },
          cache: false,
          success: (res) => {
            cash = res.cash;
            rzOrderId = res.rzOrderId;
            name = res.name;
            email = res.email;
            contact = res.contact;
            orderId = res.orderId;

            razorpayFunction(
              cash,
              rzOrderId,
              name,
              email,
              contact,
              orderId,
              'Cart'
            );
          },
        });
      }
    }
    // Cash on Delivery
    else {
      // Order With a Product
      if (orderType == 'Product') {
        const orderQuantity = document.getElementById('orderQuantity').value;
        let couponId = document.getElementById('couponId');
        if (couponId) {
          couponId = couponId.innerHTML.split(',')[0];
        } else {
          couponId = false;
        }

        $.ajax({
          url: `/shoppings/${orderType}/${userId}/${productId}`,
          type: 'post',
          data: {
            addressIndex: AddressIndex.value,
            productQuatity: orderQuantity,
            deliveryType: deliveryType,
            orderCoupon: couponId,
          },
          cache: false,
          success: (res) => {
            if (res.status) {
              Swal.fire({
                title: 'Order',
                text: 'Success your Order !',
                confirmButtonColor: '#3085d6',
              }).then((result) => {
                if (result.isConfirmed) {
                  location.replace('/shoppings');
                }
              });
            }
          },
        });
      } else if (orderType == 'Cart') {
        let couponId = document.getElementById('couponId');

        if (couponId) {
          couponId = couponId.innerHTML.split(',')[0];
        } else {
          couponId = false;
        }

        $.ajax({
          url: `/shoppings/${orderType}/${userId}/${productId}`,
          type: 'post',
          data: {
            addressIndex: AddressIndex.value,
            deliveryType: deliveryType,
            orderCoupon: couponId,
          },
          cache: false,
          success: (res) => {
            if (res.status) {
              Swal.fire({
                title: 'Order',
                text: 'Success your Order !',
                confirmButtonColor: '#3085d6',
              }).then((result) => {
                if (result.isConfirmed) {
                  location.replace('/shoppings/carts');
                }
              });
            }
          },
        });
      }
    }
  }
}

const downAddress = document.getElementById('downAddress');

// Drop Down Add Address Form
function showAddressBar(userId) {
  // create Form Field
  const form = document.createElement('form');
  form.setAttribute('action', `/shoppings/address/${userId}`);
  form.setAttribute('class', 'col-10 mt-5');
  form.setAttribute('method', 'post');

  // Form Add To Page
  const dropForm = downAddress.appendChild(form);

  // Address Name Field
  const nameDiv = document.createElement('div');
  nameDiv.setAttribute('class', 'mb-3 mt-2');

  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('class', 'form-label signupSec2Text');
  nameLabel.innerHTML = 'Name';

  const nameInput = document.createElement('input');
  nameInput.setAttribute('name', 'addressName');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('class', 'form-control');
  nameInput.setAttribute('placeholder', 'Name');
  nameInput.setAttribute('required', '');

  const dropNameDiv = dropForm.appendChild(nameDiv);
  dropNameDiv.appendChild(nameLabel);
  dropNameDiv.appendChild(nameInput);

  // Address Field
  const addressDiv = document.createElement('div');
  addressDiv.setAttribute('class', 'mb-3 mt-2');

  const addressLabel = document.createElement('label');
  addressLabel.setAttribute('class', 'form-label signupSec2Text');
  addressLabel.innerHTML = 'Address';

  const addressInput = document.createElement('input');
  addressInput.setAttribute('name', 'address');
  addressInput.setAttribute('type', 'text');
  addressInput.setAttribute('class', 'form-control');
  addressInput.setAttribute('placeholder', 'Street Address');
  addressInput.setAttribute('required', '');

  const dropAddressDiv = dropForm.appendChild(addressDiv);
  dropAddressDiv.appendChild(addressLabel);
  dropAddressDiv.appendChild(addressInput);

  // Address Country Field
  const countryDiv = document.createElement('div');
  countryDiv.setAttribute('class', 'd-flex mt-2');

  const countryDiv2 = document.createElement('div');
  countryDiv2.setAttribute('class', 'mb-3 pe-2  signupSec2FormBar');

  const countryLabel = document.createElement('label');
  countryLabel.setAttribute('class', 'form-label signupSec2Text');
  countryLabel.innerHTML = 'Country';

  const countryInput = document.createElement('input');
  countryInput.setAttribute('name', 'addressCountry');
  countryInput.setAttribute('type', 'text');
  countryInput.setAttribute('class', 'form-control');
  countryInput.setAttribute('placeholder', 'Country');
  countryInput.setAttribute('required', '');

  const dropCountryStateDiv = dropForm.appendChild(countryDiv);
  const dropCountryDiv2 = dropCountryStateDiv.appendChild(countryDiv2);
  dropCountryDiv2.appendChild(countryLabel);
  dropCountryDiv2.appendChild(countryInput);

  // Address State Field
  const stateDiv = document.createElement('div');
  stateDiv.setAttribute('class', 'mb-3 signupSec2FormBar');

  const stateLabel = document.createElement('label');
  stateLabel.setAttribute('class', 'form-label signupSec2Text');
  stateLabel.innerHTML = 'State';

  const stateInput = document.createElement('input');
  stateInput.setAttribute('name', 'addressState');
  stateInput.setAttribute('type', 'text');
  stateInput.setAttribute('class', 'form-control');
  stateInput.setAttribute('placeholder', 'State');
  stateInput.setAttribute('required', '');

  const dropStateDiv = dropCountryStateDiv.appendChild(stateDiv);
  dropStateDiv.appendChild(stateLabel);
  dropStateDiv.appendChild(stateInput);

  // Address City Field
  const cityDiv = document.createElement('div');
  cityDiv.setAttribute('class', 'd-flex mt-2');

  const cityDiv2 = document.createElement('div');
  cityDiv2.setAttribute('class', 'mb-3 pe-2  signupSec2FormBar');

  const cityLabel = document.createElement('label');
  cityLabel.setAttribute('class', 'form-label signupSec2Text');
  cityLabel.innerHTML = 'City';

  const cityInput = document.createElement('input');
  cityInput.setAttribute('name', 'addressCity');
  cityInput.setAttribute('type', 'text');
  cityInput.setAttribute('class', 'form-control');
  cityInput.setAttribute('placeholder', 'City');
  cityInput.setAttribute('required', '');

  const dropCityPinDiv = dropForm.appendChild(cityDiv);
  const dropcityDiv2 = dropCityPinDiv.appendChild(cityDiv2);
  dropcityDiv2.appendChild(cityLabel);
  dropcityDiv2.appendChild(cityInput);

  // Address PIN Field
  const pinDiv = document.createElement('div');
  pinDiv.setAttribute('class', 'mb-3 signupSec2FormBar');

  const pinLabel = document.createElement('label');
  pinLabel.setAttribute('class', 'form-label signupSec2Text');
  pinLabel.innerHTML = 'Pin Code';

  const pinInput = document.createElement('input');
  pinInput.setAttribute('name', 'addressPincode');
  pinInput.setAttribute('maxlength', '6');
  pinInput.setAttribute('type', 'number');
  pinInput.setAttribute('class', 'form-control');
  pinInput.setAttribute('placeholder', 'Pin Code');
  pinInput.setAttribute('required', '');

  const droppinDiv = dropCityPinDiv.appendChild(pinDiv);
  droppinDiv.appendChild(pinLabel);
  droppinDiv.appendChild(pinInput);

  // Submit Button
  const submitDiv = document.createElement('div');
  submitDiv.setAttribute('class', 'mt-3');

  const submitButton = document.createElement('button');
  submitButton.setAttribute('class', 'orderAddressAdd');
  submitButton.setAttribute('type', 'submit');
  submitButton.innerHTML = 'Add Address';

  const dropButtonDiv = dropForm.appendChild(submitDiv);
  dropButtonDiv.appendChild(submitButton);
}

// set Quatity Price discount
function calculate() {
  // price of Product
  const orderQuantity = document.getElementById('orderQuantity').value;
  const productPrice = document.getElementById('productPrice').innerHTML;
  const value = productPrice.split(' ')[1] * 1 * orderQuantity;
  const orderPrice = document.getElementById('orderPrice');
  orderPrice.innerHTML = value;

  // setting Discount
  const productDiscount = document.getElementById('productDiscount');
  const discount = Math.round(
    ((orderPrice.innerHTML * 1) / 100) * productDiscount.innerHTML * 1
  );
  const orderDiscount = document.getElementById('orderDiscount');
  orderDiscount.innerHTML = `-${discount}`;

  // Total OrderPrice
  const orderTotal = document.getElementById('orderTotal');
  orderTotal.innerHTML =
    orderPrice.innerHTML * 1 - Math.abs(orderDiscount.innerHTML) * 1;

  // if Coupon is Applied
  const couponId = document.getElementById('couponId');
  if (couponId) {
    if (couponId.innerHTML) {
      let discount = Math.round(
        (orderTotal.innerHTML / 100) * couponId.innerHTML.split(',')[1]
      );
      let totalDiscount = Math.abs(orderDiscount.innerHTML);
      orderDiscount.innerHTML = totalDiscount + discount;

      orderTotal.innerHTML -= discount;
    }
  }
}

const ProductID = document.getElementById('ProductID');
const CartID = document.getElementById('CartID');
const couponsOpen = document.getElementById('couponsOpen');

if (ProductID) {
  window.addEventListener('load', () => {
    calculate();
    if (couponsOpen.innerHTML) {
      setTimeout(() => {
        console.log('hello');
        couponsOpen.innerHTML = '';
      }, 2500);
    }
  });

  // calculate total while enter quantity in the filed
  function calcTotal() {
    calculate();
  }
}
// If IS Cart Products
else if (CartID) {
  const cartLength = document.getElementById('cartLength').innerHTML;

  // Calculate Total By Window
  window.addEventListener('load', () => {
    // Calculate total Price
    const orderPrice = document.getElementById('orderPrice');
    let total = 0;
    for (let i = 0; i < cartLength; i++) {
      let cartProductPrice = document.getElementById(
        `cartProductPrice${i}`
      ).innerHTML;
      let cartProductQuantity = document.getElementById(
        `cartProductQuantity${i}`
      ).value;

      total += cartProductPrice * cartProductQuantity;
    }
    orderPrice.innerHTML = total;

    // Calculate Discount
    const orderDiscount = document.getElementById('orderDiscount');
    let discount = 0;
    for (let i = 0; i < cartLength; i++) {
      let cartProductPrice = document.getElementById(
        `cartProductPrice${i}`
      ).innerHTML;
      let cartProductQuantity = document.getElementById(
        `cartProductQuantity${i}`
      ).value;
      let cartDiscount = document.getElementById(`cartDiscount${i}`).innerHTML;

      discount +=
        ((cartProductPrice * cartProductQuantity) / 100) * cartDiscount * 1;
    }
    orderDiscount.innerHTML = `-${Math.round(discount)}`;

    // calculate total
    const orderTotal = document.getElementById('orderTotal');
    orderTotal.innerHTML =
      orderPrice.innerHTML - Math.abs(orderDiscount.innerHTML);

    // if Coupon is Applied
    const couponId = document.getElementById('couponId');
    if (couponId) {
      if (couponId.innerHTML) {
        let discount = Math.round(
          (orderTotal.innerHTML / 100) * couponId.innerHTML.split(',')[1]
        );
        let totalDiscount = Math.abs(orderDiscount.innerHTML);
        orderDiscount.innerHTML = totalDiscount + discount;

        orderTotal.innerHTML -= discount;
      }
    }

    // To Remove Error Message
    const couponsOpen = document.getElementById('couponsOpen');
    if (couponsOpen.innerHTML) {
      setTimeout(() => {
        console.log('hello');
        couponsOpen.innerHTML = '';
      }, 2500);
    }
  });
}
