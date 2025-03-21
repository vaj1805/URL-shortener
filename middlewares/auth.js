//made this middleware so that url shortener service is available only to
//logged in users. by using cookie id we recieved once we logged in.

const {getUser} = require('../service/auth')


async function restrictToLoggedUserOnly(req , res , next) {
    const userUid = req.cookies?.uid;
    if(!userUid) return res.redirect("/login");
    
    const {id} = req.params
    const user = getUser(id);   
    //if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedUserOnly,
}

