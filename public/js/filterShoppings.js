// Active Style
window.addEventListener('load',()=>{
    const Category = document.getElementById('Category').innerHTML
    console.log(Category);
    const active = document.getElementById(Category)
    console.log(active);
    active.setAttribute('class','btn btn-outline-success mt-2 active')
})

// Filter Products
function filterProducts(categoryName) {
  $.ajax({
    url: `/shoppings/filter/${categoryName}`,
    type: 'get',
    cache: false,
    success: (res) => {
        location.reload()
    },
  });
}
