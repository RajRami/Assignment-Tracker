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
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err)
        }
        else {
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
        if (err) {
            return next(err)
        }
        else {
            res.redirect('/auth/login')
        }
    })
})

//GET: /auth/google => perform google sign in attempt
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}), (req, res) => { }
)

//GET: /auth/google/callback => handle return of user from google
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/login'
}), (req, res) => {
    // Successful authentication, redirect to /assignments
    res.redirect('/assignments')
})

//GET: /auth/github => Perform github sign in attempt 
router.get('/github', passport.authenticate('github',{
    scope: ['profile']
}), (req, res) => {}
)

//GET: /auth/github/callback => handle return of user from github
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/login'
}), (req, res) => {
    // Successful authentication, redirect to /assignments
    res.redirect('/assignments');
});

//Make public
module.exports = router