const isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.status(401).json({message: 'Il login non è stato effettuato'});
};

module.exports = isLoggedIn;