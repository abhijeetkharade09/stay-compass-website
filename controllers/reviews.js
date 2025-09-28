const Listing = require('../models/listing');
const Review = require('../models/review.js'); 
 //   ./ means "same directory", ../ means "one folder up".

module.exports.createReview = async(req,res)=>{  
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);

        // Set the logged-in user as author
        newReview.author = req.user._id;

        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        req.flash("success", "Review Created!");
        res.redirect(`/listings/${listing._id}`);
}


module.exports.destroyReview = async (req,res) => {
        let {id, reviewId} = req.params;

        await Listing.findByIdAndUpdate(id,{ $pull: {reviews: reviewId} });
        await Review.findByIdAndDelete(reviewId);
        req.flash("success", "Review Deleted!");
        res.redirect(`/listings/${id}`);
    }