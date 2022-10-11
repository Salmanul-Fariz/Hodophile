const mongoos = require('mongoose');
const bcrypt = require('bcrypt');
const agencySchema = new mongoos.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Please Enter your Password !'],
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
});

agencySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

const Agency = mongoos.model('agency', agencySchema);

module.exports = Agency;