const User = require('../models/user');
const {v4 : uuidv4} = require('uuid');
const {setUser , getUser} = require('../service/auth');

async function handleUserSignUp(req , res) {
    const {name , email , password} = req.body;
    await User.create({
        name,
        email, 
        password,
    });
    return res.render("/");
}

async function handleUserLogin(req , res) {
    const {email , password} = req.body;
    const user = await User.findOne({email , password});
    if(!user) return res.render('login' , {
        error : 'Invalid username or password',
    })

    const sessionId = uuidv4();
    setUser(sessionId , user);
    res.cookie('uid' , sessionId);

    //after this a cookie is generated once we login with a unique id
    //which we get by npm uuid lib.

    return res.redirect("/");
}



module.exports = {
    handleUserSignUp,
    handleUserLogin,
}