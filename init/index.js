const mongoose = require('mongoose');
const initData = require('./data.js');     // ./ means "same directory"
const Listing = require("../models/listing.js");

<<<<<<< HEAD
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
=======
// const MONGO_URL = 'mongodb://127.0.0.1:27017/compass';
>>>>>>> 7c996f7 (changes done)

main()
    .then(() => {
        console.log('connected to DB');
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect( MONGO_URL)
 }

 const initDB = async () => {
    await Listing.deleteMany({});   // using this Delete old data
    const listingsWithOwner = initData.data.map( (obj)=> ({
        ...obj,
        owner:"68ce947f9d8771c668a33ab6"
    }) );
    await Listing.insertMany(listingsWithOwner);  // we are accessing here data.js--> module.exports = { data: sampleListings };
    console.log('data was initialized');
 }

 initDB();