const app = require('./app');
const mongoos = require('./config/Connection');

// Connect Mongoos
mongoos
  .then(() => {
    console.log('DataBase connected !');
  })
  .catch((err) => {
    console.log(err);
  });

// connect port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`// Server started in ${port} port //`);
});
