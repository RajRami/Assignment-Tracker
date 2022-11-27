const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/userModel')


// GET: /auth/register => show register form
router.get('/register', (req, res) => {
    res.render('auth/register', { 
        title: 'User Registration'
    })
})

// POST: /auth/register => create new user and redirect to /assignments
router.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err){
            console.log(err)
        }
        else{
            req.login(user, (err) => {
                res.redirect('/assignments')
            })
        }
    })
})

//GET: /auth/login => Display the login page
router.get('/login', (req, res) => {
    //if there is any session messages, store them in local variables
    let messages = req.session.messages || []

    //Clear the session error messages
    req.session.messages = []

    res.render('auth/login', {
        title: 'Login',
        messages: messages
    })
})

//POST: auth/login => use passport to do auth check
router.post('/login', passport.authenticate('local', {
    successRedirect: '/assignments',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Credentials'
}))

//GET: /auth/logout => logout the user from the site
router.get('/logout', (req, res, next) => {
    req.session.messages = []
    req.logout((err) => {
        if(err){
            return next(err)
        }
        else{
            res.redirect('/auth/login')
        }
    })
})

//Make public
module.exports = router