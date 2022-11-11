// Common require
const subTotalPrice = document.getElementById('totalPriceCart');
const totalPriceDiscount = document.getElementById('totalPriceDiscount');
const totalCartPrice = document.getElementById('totalCartPrice');

// Adding Total Price Of Cart
window.addEventListener('load', () => {
  // sett total cart quatity And (Price)
  const productPrice = document.getElementsByClassName('productPrice');
  const productCount = document.getElementsByClassName('productCount');
  const productTotal = document.getElementsByClassName('productTotal');
  for (let i = 0; i < productTotal.length; i++) {
    productTotal[i].innerHTML =
      productPrice[i].innerHTML * productCount[i].innerHTML;
  }

  // Set total cart Price(Without Minus Discount)
  let totalPrice = 0;
  for (let i = 0; i < productTotal.length; i++) {
    totalPrice += productTotal[i].innerHTML * 1;
  }
  subTotalPrice.innerHTML = totalPrice;

  // Setting discount
  const productDiscount = document.getElementsByClassName('productDiscount');
  let discount = 0;
  for (let i = 0; i < productDiscount.length; i++) {
    discount +=
      ((productTotal[i].innerHTML * 1) / 100) * productDiscount[i].innerHTML;
  }
  // Round the discout Price
  let roundDiscount = Math.round(discount);
  totalPriceDiscount.innerHTML = `-${roundDiscount}`;

  // Setting Total Amount of the Cart
  totalCartPrice.innerHTML = totalPrice - roundDiscount;
});

// To Increase the Quatity
function increaseQuantity(userId, productId) {
  const countInput = document.getElementById(`${productId}Input`);
  if (countInput.value < 10) {
    // DataBase Adding
    $.ajax({
      url: `/shoppings/carts/increment/${userId}/${productId}`,
      type: 'get',
      success: (res) => {
        if (res.status) {
          // Increase quatity while add and remove
          const countInput = document.getElementById(`${productId}Input`);
          countInput.setAttribute('value', `${countInput.value * 1 + 1}`);

          // sett total cart quatity And (Price)
          const incProductPrice = document.getElementById(
            `${productId}productPrice`
          );
          const incProductTotal = document.getElementById(
            `${productId}productTotal`
          );
          incProductTotal.innerHTML =
            incProductPrice.innerHTML * 1 * countInput.value;

          // Set total cart Price(Without Minus Discount)
          subTotalPrice.innerHTML =
            subTotalPrice.innerHTML * 1 + incProductPrice.innerHTML * 1;

          // Setting discount
          const incProductDiscount = document.getElementById(
            `${productId}productDiscount`
          );
          const incDiscount =
            ((incProductPrice.innerHTML * 1) / 100) *
            incProductDiscount.innerHTML *
            1;

          // Round the discout Price
          const incTotal = Math.abs(totalPriceDiscount.innerHTML);
          const discount = incTotal + incDiscount;
          const roundedDiscount = Math.round(discount);
          totalPriceDiscount.innerHTML = `-${roundedDiscount}`;

          // Setting Total Amount of the Cart
          totalCartPrice.innerHTML =
            subTotalPrice.innerHTML * 1 + totalPriceDiscount.innerHTML * 1;
        }
      },
    });
  }
}

// To decrease the Quatity
function decreaseQuantity(userId, productId) {
  const countInput = document.getElementById(`${productId}Input`);
  console.log(countInput.value);
  if (countInput.value > 1) {
    $.ajax({
      url: `/shoppings/carts/decrement/${userId}/${productId}`,
      type: 'get',
      success: (res) => {
        console.log('Started');
        if (res.status) {
          // decrease quatity while add and remove
          const countInput = document.getElementById(`${productId}Input`);
          countInput.setAttribute('value', `${countInput.value - 1}`);

          // sett total cart quatity And (Price)
          const dicProductPrice = document.getElementById(
            `${productId}productPrice`
          );
          const dicProductTotal = document.getElementById(
            `${productId}productTotal`
          );
          dicProductTotal.innerHTML =
            dicProductPrice.innerHTML * 1 * countInput.value;

          // Set total cart Price(Without Minus Discount)
          subTotalPrice.innerHTML =
            subTotalPrice.innerHTML * 1 - dicProductPrice.innerHTML * 1;

          // Setting discount
          const dicProductDiscount = document.getElementById(
            `${productId}productDiscount`
          );
          const dicDiscount =
            ((dicProductPrice.innerHTML * 1) / 100) *
            dicProductDiscount.innerHTML *
            1;

          // Round the discout Price
          const incTotal = Math.abs(totalPriceDiscount.innerHTML);
          const roundedDiscount = Math.round(incTotal - dicDiscount);
          totalPriceDiscount.innerHTML = `-${roundedDiscount}`;

          // Setting Total Amount of the Cart
          totalCartPrice.innerHTML =
            subTotalPrice.innerHTML * 1 + totalPriceDiscount.innerHTML * 1;
        }
      },
    });
  } else {
    deleteCartProduct(userId, productId);
  }
}

// To Delete The Products
function deleteCartProduct(userId, productId) {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    iconColor: 'White',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Delete',
    background: '#bdbdbd',
    color: 'White',
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `/shoppings/carts/delete/${userId}/${productId}`,
        type: 'get',
        success: (res) => {
          if (res.status) {
            const emptyProductLength =
              document.getElementById('emptyProductLength');
            emptyProductLength.innerHTML = emptyProductLength.innerHTML * 1 - 1;
            if (emptyProductLength.innerHTML == 0) {
              const emptyTable = document.getElementById('emptyTable');
              const emptyTotal = document.getElementById('emptyTotal');
              const emptyCheckout = document.getElementById('emptyCheckout');
              const emptyBar = document.getElementById('emptyBar');
              emptyTable.remove();
              emptyTotal.remove();
              emptyCheckout.remove();
              const emptyHead = document.createElement('h2');
              emptyHead.setAttribute('class', 'text-center');
              emptyHead.setAttribute('style', 'padding:150px 0 ;');
              emptyHead.innerHTML = 'Cart Empty';
              emptyBar.appendChild(emptyHead);
            } else {
              // Set Sub total Price
              const productTotal = document.getElementById(
                `${productId}productTotal`
              );
              subTotalPrice.innerHTML =
                subTotalPrice.innerHTML * 1 - productTotal.innerHTML * 1;

              // Sett Discount
              const productDiscount = document.getElementById(
                `${productId}productDiscount`
              );
              const Total = Math.abs(totalPriceDiscount.innerHTML);
              const dicDiscount =
                ((productTotal.innerHTML * 1) / 100) *
                (productDiscount.innerHTML * 1);
              let discount = Math.round(Total - dicDiscount);
              if (discount <= 0) {
                discount = 0;
              }
              totalPriceDiscount.innerHTML = `-${discount}`;

              // Set Total Price
              totalCartPrice.innerHTML =
                subTotalPrice.innerHTML * 1 + totalPriceDiscount.innerHTML * 1;

              // Remove the bar
              const cartProducts = document.getElementById(
                `${productId}Product`
              );
              cartProducts.remove();
            }
            const cartCount = document.getElementById('cartCount');
            cartCount.innerHTML = cartCount.innerHTML * 1 - 1;
          }
        },
      });
    }
  });
}

// Add to cart in (Shoppings)
function addToCart(productId, userId) {
  $.ajax({
    url: ` /shoppings/carts/${userId}/${productId}`,
    type: 'post',
    success: (res) => {
      console.log(res.status);
      if (res.status) {
        console.log('helldfso');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Add To Cart',
          background: '#41c356',
          color: 'White',
          iconColor: 'White',
        });
        if (res.inc) {
          const cartCount = document.getElementById('cartCount');
          cartCount.innerHTML = cartCount.innerHTML * 1 + 1;
        }
      }
    },
  });
}
