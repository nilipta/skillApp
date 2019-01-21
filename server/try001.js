var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var db = mongoose.connect('mongodb://localhost/skills');

var fine = new Schema({
    name: String,
});

var UserModel = mongoose.model('skillsCRUD', fine);

var record = new UserModel();

// record.name = '';

record.save(function (err) {

    UserModel.find({}, function (err, users1) {

        for (var i = 0, counter = users1.length; i < counter; i++) {

            var user = users1[i];

            console.log("User => _id: " + user._id + ", first_name: " + user);

        }

    });

});