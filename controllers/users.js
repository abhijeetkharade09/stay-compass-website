 const User = require('../models/user'); 

 module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup = (async (req,res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);    // Remb:  register( )
        console.log(registeredUser);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
<<<<<<< HEAD
            req.flash("success","Welcome to Compass!");
=======
            req.flash("success","Welcome to Stay Compass!");
>>>>>>> 7c996f7 (changes done)
            res.redirect("/listings"); 
        });
 
    } catch (e) {
        req.flash("error",e.message);
        res.redirect("/signup");        
    }
})

module.exports.renderLoginForm =  (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res) => {
<<<<<<< HEAD
     req.flash("success","Welcome back to Compass!");
=======
     req.flash("success","Welcome back to Stay Compass!");
>>>>>>> 7c996f7 (changes done)
     let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl); 
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    });
}
