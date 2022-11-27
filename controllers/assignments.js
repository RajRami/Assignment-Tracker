const express = require('express')
const router = express.Router()

//Import the appoitment model class
const Assignment = require('../models/assignmentModel')

//Import global function
const globalFunction = require('./globalFunctions')

//GET: /assignments => Display the list of assignments
router.get('/', (req, res) => {
    Assignment.find((err, assignments) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('assignments/index', {
                title: 'Assignments',
                assignments: assignments,
                user: req.user
            })
        }
    }).sort('dueDate')
})

//GET: /assignments/create => Display the form to add an assignments
router.get('/create', globalFunction.isAuthenticated, (req, res) => {
    res.render('assignments/create', {
        title: 'Add an assignments',
        user: req.user
    })
})

//POST: //POST: /assignments/create => Process the form submission
router.post('/create', globalFunction.isAuthenticated, (req, res) => {
    //Add a new assignments based on the response
    Assignment.create(req.body, (err, newAssignment) => {
        if (err) {
            console.log(err)
        }
        else {
            // res.json(newAssignment)
            res.redirect('/assignments')
        }
    })
})

//GET: /assignments/edit/abcd1234 => Display the assignments details for editing
router.get('/edit/:_id', globalFunction.isAuthenticated, (req, res) => {
    Assignment.findById((req.params._id), (err, assignment) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('assignments/edit', {
                title: 'Edit an Assignments',
                assignment: assignment,
                user: req.user
            })
        }
    })
})

//POST: /assignments/edit/abcd1234 => Process the form submission and update the assignment details
router.post('/edit/:_id', globalFunction.isAuthenticated, (req, res) => {
    Assignment.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err, assignment) => {
        if (err) {
            console.log(err)
        }
        else {
            // res.json(assignment)
            res.redirect('/assignments')
        }
    })
})

//GET: /assignments/delete/abcd1234 => Remove the assignments 
router.get('/delete/:_id',globalFunction.isAuthenticated, (req, res) => {
    Assignment.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/assignments')
        }
    })
})

module.exports = router