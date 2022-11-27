//Crate a funtion that check the authentication before any CUD methods
// make auth check function public so any controller can invoke it for reusability
exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    else{
        res.redirect('/auth/login')
    }
}