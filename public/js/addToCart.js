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
    totalPrice += parseInt(productTotal[i].innerHTML);
  }
  subTotalPrice.innerHTML = totalPrice;

  // Setting discount
  const productDiscount = document.getElementsByClassName('productDiscount');
  let discount = 0;
  for (let i = 0; i < productDiscount.length; i++) {
    discount += parseFloat(
      (productTotal[i].innerHTML / 100) * productDiscount[i].innerHTML
    );
  }
  // Round the discout Price
  let roundDiscount = Math.round(discount * 100) / 100;
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
      cache: false,
      success: (res) => {
        if (res.status) {
          // Increase quatity while add and remove
          const countInput = document.getElementById(`${productId}Input`);
          countInput.setAttribute('value', `${countInput.value *1 + 1}`);

          // sett total cart quatity And (Price)
          const incProductPrice = document.getElementById(
            `${productId}productPrice`
          );
          const incProductTotal = document.getElementById(
            `${productId}productTotal`
          );
          incProductTotal.innerHTML = parseInt(
            incProductPrice.innerHTML * countInput.value
          );

          // Set total cart Price(Without Minus Discount)
          subTotalPrice.innerHTML =
            parseInt(subTotalPrice.innerHTML) +
            parseInt(incProductPrice.innerHTML);

          // Setting discount
          const incProductDiscount = document.getElementById(
            `${productId}productDiscount`
          );
          const incDiscount =
            (parseInt(incProductPrice.innerHTML) / 100) *
            parseInt(incProductDiscount.innerHTML);

          // Round the discout Price
          const incTotal = Math.abs(totalPriceDiscount.innerHTML);
          const discount = incTotal + incDiscount;
          const roundedDiscount = Math.round(discount * 100) / 100;
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
      cache: false,
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
          dicProductTotal.innerHTML = parseInt(
            dicProductPrice.innerHTML * countInput.value
          );

          // Set total cart Price(Without Minus Discount)
          subTotalPrice.innerHTML =
            parseInt(subTotalPrice.innerHTML) -
            parseInt(dicProductPrice.innerHTML);

          // Setting discount
          const dicProductDiscount = document.getElementById(
            `${productId}productDiscount`
          );
          const dicDiscount =
            (parseInt(dicProductPrice.innerHTML) / 100) *
            parseInt(dicProductDiscount.innerHTML);

          // Round the discout Price
          const incTotal = Math.abs(totalPriceDiscount.innerHTML);
          const roundedDiscount =
            Math.round((incTotal - dicDiscount) * 100) / 100;
          totalPriceDiscount.innerHTML = `-${roundedDiscount}`;

          // Setting Total Amount of the Cart
          totalCartPrice.innerHTML =
            subTotalPrice.innerHTML * 1 + totalPriceDiscount.innerHTML * 1;
        }
      },
    });
  }else{
    deleteCartProduct(userId,productId)
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
    background: '#41c356',
    color: 'White',
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `/shoppings/carts/delete/${userId}/${productId}`,
        type: 'get',
        cache: false,
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
                (parseInt(productTotal.innerHTML) / 100) *
                parseInt(productDiscount.innerHTML);
              const discount = Total - dicDiscount;
              const roundedDiscount = Math.round(discount * 100) / 100;
              totalPriceDiscount.innerHTML = `-${roundedDiscount}`;

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
    cache: false,
    success: (res) => {
      console.log(res.status);
      if (res.status) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer:2500,
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
        const cartCount = document.getElementById('cartCount');
        cartCount.innerHTML = cartCount.innerHTML * 1 + 1;
      }
    },
  });
}
