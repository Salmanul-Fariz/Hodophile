//  mongoos schema error handling
module.exports = (err) => {
  if (err.name === 'ValidationError') {
    let error = Object.values(err.errors).map((el) => el.message);
    console.log(error);
    return error[0];
  }
};