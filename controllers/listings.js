const Listing = require("../models/listing.js");
const axios = require("axios");

// Index
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// Render New Form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show Listing
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }

  listing.reviews = listing.reviews.filter(review => review.author);
  res.render("listings/show.ejs", { listing, currUser: req.user });
};

// Create Listing
module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  // Geocode user-entered location using LocationIQ
    if (newListing.location) {
      const geoData = await axios.get(
        "https://us1.locationiq.com/v1/search.php",
        {
          params: {
            key: process.env.MAP_TOKEN,
            q: newListing.location,
            format: "json",
          },
        }
      );
      if (geoData.data && geoData.data[0]) {
        newListing.coordinates = [
          parseFloat(geoData.data[0].lon),
          parseFloat(geoData.data[0].lat),
        ];
      }
    }

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// Render Edit Form
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Update Listing
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // Update fields from form
  Object.assign(listing, req.body.listing);

  // Update image if a new file is uploaded
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

    // Geocode updated location
    if (listing.location) {
      const geoData = await axios.get(
        "https://us1.locationiq.com/v1/search.php",
        {
          params: {
            key: process.env.MAP_TOKEN,
            q: listing.location,
            format: "json",
          },
        }
      );
      if (geoData.data && geoData.data[0]) {
        listing.coordinates = [
          parseFloat(geoData.data[0].lon),
          parseFloat(geoData.data[0].lat),
        ];
      }
    }

  await listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};


// Delete Listing
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
