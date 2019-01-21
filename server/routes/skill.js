var express = require('express');
var router = express.Router();
var path = require('path');
var skill = require("../controllers/skillController.js");


// Get all employees
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './../public/index.html'));
});

router.get('/skills', function (req, res) {
    // res.send("Hello World app get");
    console.log("getting skills");
    skill.getLists(req, res);
});

// Get single employee by id
router.get('/show/:id', function (req, res) {
    skill.show(req, res);
});

// Create employee
router.get('/create', function (req, res) {
    skill.create(req, res);
});

// Save employee
router.post('/skill', function (req, res) {
    skill.saveSkill(req, res);
});

// Edit employee
router.get('/edit/:id', function (req, res) {
    skill.edit(req, res);
});

// Edit update
router.post('/update/:id', function (req, res) {
    skill.update(req, res);
});

// Edit update
router.post('/delete/:id', function (req, res, next) {
    skill.delete(req, res);
});

// Delete A skill
router.delete('/skill/:id', function (req, res, next) {
    skill.delete(req, res);
});

module.exports = router;