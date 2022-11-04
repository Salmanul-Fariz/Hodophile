const mongoos = require('mongoose');

const userAvatarSchema = new mongoos.Schema({
  Image: {
    type: String,
    required: [true, 'Please Enter Image Path !'],
  },
});

const userAvatarModel = mongoos.model('User-Avatars', userAvatarSchema);

module.exports = userAvatarModel;
