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

// Agency Delete Trekking
function agencyDeleteTrekking(id) {
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
      form.action = `/agency/trekkings/delete/${id}`;
      document.body.appendChild(form);
      form.submit();
    }
  });
}

// Agency user block
function agencyUserBlock(id) {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    iconColor: 'White',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Block',
    background: '#41c356',
    color: 'White',
  }).then((result) => {
    if (result.isConfirmed) {
      // Creating Submit Form
      const form = document.createElement('form');
      // Form Attributes
      form.method = 'post';
      form.action = `/agency/users/block/${id}`;
      document.body.appendChild(form);
      form.submit();
    }
  });
}

// Agency user unblock
function agencyUserUnblock(id) {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    iconColor: 'White',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Unblock',
    background: '#41c356',
    color: 'White',
  }).then((result) => {
    if (result.isConfirmed) {
      // Creating Submit Form
      const form = document.createElement('form');
      // Form Attributes
      form.method = 'post';
      form.action = `/agency/users/unblock/${id}`;
      document.body.appendChild(form);
      form.submit();
    }
  });
}

// Delete News
function agencyDeleteNews(id) {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    iconColor: 'White',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Unblock',
    background: '#41c356',
    color: 'White',
  }).then((result) => {
    if (result.isConfirmed) {
      // Creating Submit Form
      const form = document.createElement('form');
      // Form Attributes
      form.method = 'post';
      form.action = `/agency/news/delete/${id}`;
      document.body.appendChild(form);
      form.submit();
    }
  });
}
