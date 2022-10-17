// User Logout button Alert
function userLogout() {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    iconColor: 'White',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Logout',
    background: '#41c356',
    color: 'White',
  }).then((result) => {
    if (result.isConfirmed) {
      // Creating Submit Form
      const form = document.createElement('form');
      // Form Attributes
      form.method = 'post';
      form.action = '/logout';
      document.body.appendChild(form);
      form.submit();
    }
  });
}

// Agency Delete Tour
function agencyDeleteTour(id) {
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
      // Creating Submit Form
      const form = document.createElement('form');
      // Form Attributes
      form.method = 'post';
      form.action = `/agency/tours/delete/${id}`;
      document.body.appendChild(form);
      form.submit();
    }
  });
}

