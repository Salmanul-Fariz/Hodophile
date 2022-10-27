// Add To Wishlist
function addToWishlist(productId, userId) {
  $.ajax({
    url: `/shoppings/wishlists/${userId}/${productId}`,
    type: 'get',
    cache: false,
    success: (res) => {
      console.log(res.status);
      let wishlist = document.getElementById(`${productId}Wishlist`);
      if (res.status) {
        wishlist.setAttribute('class', 'sec6LoveUnlike fa-solid fa-heart');

        // To increase Count
        const wishlistCount = document.getElementById('wishlistCount');
        wishlistCount.innerHTML = wishlistCount.innerHTML * 1 + 1;
      } else if (res.status == false) {
        wishlist.setAttribute('class', 'sec6LoveLike fa-solid fa-heart');

        // To decrease Count
        const wishlistCount = document.getElementById('wishlistCount');
        wishlistCount.innerHTML = wishlistCount.innerHTML * 1 - 1;
      }
    },
  });
}

// Add Products to cart
function addToCartProduct(userId, productId) {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    iconColor: 'White',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Add',
    background: '#41c356',
    color: 'White',
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `/shoppings/wishlists/addCart/${userId}/${productId}`,
        type: 'get',
        cache: false,
        success: (res) => {
          if (res.status) {
            const emptyProductLength =
              document.getElementById('emptyProductLength');
            emptyProductLength.innerHTML = emptyProductLength.innerHTML * 1 - 1;
            console.log(emptyProductLength.innerHTML);
            if (emptyProductLength.innerHTML == 0) {
              const emptyTable = document.getElementById('emptyTable');
              const emptyBar = document.getElementById('emptyBar');
              emptyTable.remove();
              const emptyHead = document.createElement('h2');
              emptyHead.setAttribute('class', 'text-center');
              emptyHead.setAttribute('style', 'padding:150px 0 ;');
              emptyHead.innerHTML = 'Wishlist Empty';
              emptyBar.appendChild(emptyHead);
            } else {
              // Remove the bar
              const cartProducts = document.getElementById(
                `${productId}Product`
              );
              cartProducts.remove();
            }
          }
          if (res.inc) {
            const cartCount = document.getElementById('cartCount');
            cartCount.innerHTML = cartCount.innerHTML * 1 + 1;
          }
          // To decrease Count
          const wishlistCount = document.getElementById('wishlistCount');
          wishlistCount.innerHTML = wishlistCount.innerHTML * 1 - 1;
        },
      });
    }
  });
}

// Remove From Wishlist
function deleteWishlsitProduct(userId, productId) {
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
        url: `/shoppings/wishlists/remove/${userId}/${productId}`,
        type: 'get',
        cache: false,
        success: (res) => {
          if (res.status) {
            const emptyProductLength =
              document.getElementById('emptyProductLength');
            emptyProductLength.innerHTML = emptyProductLength.innerHTML * 1 - 1;
            if (emptyProductLength.innerHTML == 0) {
              const emptyTable = document.getElementById('emptyTable');
              const emptyBar = document.getElementById('emptyBar');
              emptyTable.remove();
              const emptyHead = document.createElement('h2');
              emptyHead.setAttribute('class', 'text-center');
              emptyHead.setAttribute('style', 'padding:150px 0 ;');
              emptyHead.innerHTML = 'Wishlist Empty';
              emptyBar.appendChild(emptyHead);
            } else {
              // Remove the bar
              const cartProducts = document.getElementById(
                `${productId}Product`
              );
              cartProducts.remove();
            }
            // To decrease Count
            const wishlistCount = document.getElementById('wishlistCount');
            wishlistCount.innerHTML = wishlistCount.innerHTML * 1 - 1;
          }
        },
      });
    }
  });
}
