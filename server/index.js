/***************************************************/
/* Project:      Skill Dashboard                   */
/* Description:  A CRUD App using mongodb          */
/* Version:      0.1.0                             */
/* Author:       Nilipta Satapathy                 */
/* Created On:   21-01-2019                        */
/***************************************************/

const path = require('path');
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var mongoose = require("mongoose");
const cors = require('cors');


const bodyParser = require('body-parser');
var index = require('./routes/skill');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB configuration
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/skills')
    .then((responseMongo) => {
        console.log('connection succesful')
        // console.log(responseMongo)
    })
    .catch((err) => console.error(err));

app.use('/', index);        //For routing purpose

server.listen(3000, 'localhost');   //Server destination
server.on('listening', function () {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});