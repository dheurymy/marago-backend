const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dm32thaof',
  api_key: '833454533716266',
  api_secret: 'xmXtLt4cH6_aSJHd4v0DQlhLkws',
});

module.exports = cloudinary;