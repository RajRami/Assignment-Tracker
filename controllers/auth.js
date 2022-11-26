const express = require('express')
const router = express.Router()

// GET: /auth/register => show register form
router.get('/register', (req, res) => {
    res.render('auth/register', { 
        title: 'User Registration'
    })
})

//GET: /auth/login => Display the login page
router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Login'
    })
})

//Make public
module.exports = router