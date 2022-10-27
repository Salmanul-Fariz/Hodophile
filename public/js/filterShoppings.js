// Active Style
window.addEventListener('load',()=>{
    const Category = document.getElementById('Category').innerHTML
    const active = document.getElementById(Category)
    active.setAttribute('class','btn btn-outline-success mt-2 active')
})

// Filter Products
function filterProducts(categoryName) {
  $.ajax({
    url: `/shoppings/${categoryName}`,
    type: 'get',
    cache: false,
    success: (res) => {
        location.reload()
    },
  });
}
