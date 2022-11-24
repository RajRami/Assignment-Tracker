const express = require('express')
const router = express.Router()

//GET: /assignments => Display the list of assignments
router.get('/', (req, res) => {
    res.render('assignments/index', {
        title: 'Assignments'
    })
})

//GET: /assignments/create => Display the form to add an assignments
router.get('/create', (req, res) => {
    res.render('assignments/create', {
        title: 'Add an assignments'
    })
})

module.exports = router