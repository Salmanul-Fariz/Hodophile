const app = require('./app');
const dotenv = require('dotenv');
const mongoos = require('mongoose');

// set config file
dotenv.config({ path: './config.env' });

// taking datbase link from config
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
