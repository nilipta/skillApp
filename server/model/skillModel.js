var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String
});

mongoose.model('collections', UserSchema);

module.exports = mongoose.model('collections');