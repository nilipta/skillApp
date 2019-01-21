var mongoose = require("mongoose");
var CRUD = require("../model/skillModel");

var skillController = {};

// var SkillsCRUD = new CRUD();
// Show list of skills
skillController.getLists = function (req, res) {
    // SkillsCRUD.save(function err() {
    CRUD.find({}, function (err, skills) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            console.log('skills are ', skills)
            res.send(skills);
        }
    })
    // })
};

// Show skill by id
skillController.show = function (req, res) {
    SkillsCRUD.findOne({ _id: req.params.id }).exec(function (err, skills) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/skills/show", { skills: skills });
        }
    });
};

// Create new skills
skillController.create = function (req, res) {
    res.render("../views/skills/create");
};

// Save new skills
skillController.saveSkill = function (req, res) {
    console.log("skill to save as :: " + req.body.name)
    var tempSkill = new CRUD({ name: req.body.name });

    tempSkill.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully created an skills.");
            res.json(200);
        }
    });
};

// Edit an skills
skillController.edit = function (req, res) {
    Skill.findOne({ _id: req.params.id }).exec(function (err, skills) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/skills/edit", { skill: skills });
        }
    });
};

// Update an skills
skillController.update = function (req, res) {
    Skill.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name } }, { new: true }, function (err, skill) {
        if (err) {
            console.log(err);
            res.render("../views/skills/edit", { skill: req.body });
        }
        res.redirect("/skills/show/" + skill._id);
    });
};

// Delete an skills
skillController.delete = function (req, res) {
    console.log(req.params)
    CRUD.remove({ name: req.params.id }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("skill deleted!");
            res.json(200);
            // res.redirect("/skills");
        }
    });
};

module.exports = skillController;