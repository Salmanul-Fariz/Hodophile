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
module.exports = mongoos.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
