if (process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
<<<<<<< HEAD
 
=======

>>>>>>> 7c996f7 (changes done)
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const { log } = require('console');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require('./routes/listing.js');  // Express Router: Restructuring Listings
const reviewRouter = require('./routes/review.js');    // Express Router: Restructuring Reviews
const userRouter = require("./routes/user.js")         // SignUp  and Login User

<<<<<<< HEAD
// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
=======
// const MONGO_URL = 'mongodb://127.0.0.1:27017/compass';
>>>>>>> 7c996f7 (changes done)
const dbUrl = process.env.ATLASDB_URL; 

main()
    .then(() => {
        console.log('connected to DB');
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
  // await mongoose.connect( MONGO_URL);
     await mongoose.connect(dbUrl);
 }

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", ()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
})

const sessionOptions = {
    store,
    secret:  process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

// app.get('/',(req,res)=>{
//     res.send("Hi, I am root HOME PAGE")
// });


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    // console.log(res.locals.success);
    next();
})

                        // app.get("/demouser", async (req,res) => {
                        //     let fakeuser = new User({
                        //         email: "student@gmail.com",
                        //         username: "okstudent",
                        //     });

                        //     let registeredUser = await User.register(fakeuser,"helloworld");
                        //     res.send(registeredUser);
                        // });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/", userRouter);

app.all(/.*/, (req, res, next) => {   
    next(new ExpressError(404, "PAGE NOT FOUND !!.."));
});  

app.use((err, req, res, next) =>{
    let {statusCode=500 , message="Something Went Wrong"} = err; 
    res.status(statusCode).render("error.ejs",{message})
                                                // res.status(statusCode).send(message);
                                                // res.send("something went wrong !!..");
});

app.listen(3000, () => {
    console.log("Server is listening at port http://localhost:3000/listings");
});                         