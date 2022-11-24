const express = require('express')
const router = express.Router()

//Import the appoitment model class
const Assignments = require('../models/assignmentModel')

//GET: /assignments => Display the list of assignments
router.get('/', (req, res) => {
    Assignments.find((err, assignments) => {
        if(err){
            console.log(err)
        }
        else{
            res.render('assignments/index', {
                title: 'Assignments',
                assignments: assignments
            })
        }
    })
})

//GET: /assignments/create => Display the form to add an assignments
router.get('/create', (req, res) => {
    res.render('assignments/create', {
        title: 'Add an assignments'
    })
})

//POST: //POST: /assignments/create => Process the form submission
router.post('/create', (req, res) => {
    //Add a new assignments based on the response
    Assignments.create(req.body, (err, newAssignment) => {
        if (err) {
            console.log(err)
        }
        else {
            // res.json(newAssignment)
            res.redirect('/assignments')
        }
    })
})

module.exports = router