const mongoos = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

// setting schema
const userSchema = new mongoos.Schema({
  firstName: {
    type: String,
    required: [true, 'Please Enter your First Name !'],
  },
  lastName: {
    type: String,
    required: [true, 'Please Enter your Last Name !'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter your email !'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email !'],
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  contact: {
    type: String,
    required: [true, 'Please Enter your Contact Number !'],
    minlength: [10, 'Please Enter valid number {VALUE}!'],
  },
  age: {
    type: Number,
    required: [true, 'Please Enter your Age !'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter your Password !'],
    minlength: [6, 'Please Enter Strong Password !'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please Confirm the Password !'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not Same !',
    },
  },
  Address: {
    type: Array,
    default: null,
  },
  NewsLike: {
    type: Array,
    default: null,
  },
});

// bycrypt password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

// bycrypt compare password
userSchema.methods.correctPass = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// setting model
const UserModel = mongoos.model('User', userSchema);

module.exports = UserModel;
