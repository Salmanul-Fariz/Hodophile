const app = require('./app');
const dotev = require('dotenv');
const mongoos = require('mongoose');

// set config file
dotev.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// connect mongoos
mongoos
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DataBase connected !');
  });

// connect port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`// Server started in ${port} port //`);
});
