const mongoose =
require('mongoose');

const issueSchema =
new mongoose.Schema({

  issueType: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  image: {
    type: String,
    default: ''
  },

  status: {
    type: String,
    default: 'Pending'
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

votes: {
  type: Number,
  default: 0
},

votedUsers: [
  String
],

comments: [
  {
    user: String,
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
],

  email: {
  type: String,
  required: true
}

});

module.exports =
mongoose.model(
  'Issue',
  issueSchema
);