const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    let { category } = req.query;

    let filter = {};

    if (category) {
        filter.category = category;
    }

    const allListing = await Listing.find(filter);

    res.render("listing/index.ejs", { allListing, category });
};

module.exports.renderNewForm = (req, res)=>{
    
    res.render("listing/new.ejs");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({path : "reviews", populate: {path: "author"},}).populate("owner");
    
    if(!listing){
        req.flash("error", "This Listing does not exist !!!");
        return res.redirect("/listings");
    }


    res.render("listing/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    }).send();


    if (!response.body.features.length) {
        req.flash("error", "Invalid location. Please enter a valid place.");
        return res.redirect("/listings/new");
    }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    newListing.geometry = response.body.features[0].geometry;

    await newListing.save();

    req.flash("success", "A new listing has been added !!!");
    res.redirect("/listings");
};


module.exports.renderEditForm = async(req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "This Listing does not exist !!!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image?.url || "";
    originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/h_600,w_500"
    );
    res.render("listing/edit.ejs", {listing , originalImageUrl});
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    }).send();

    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (response.body.features.length) {
        listing.geometry = response.body.features[0].geometry;
    }

    if (typeof req.file !== "undefined") {
        listing.image = { url: req.file.path, filename: req.file.filename };
    }

    await listing.save();

    req.flash("success", "The Listing has been updated!!!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "A listing has been deleted !!!");
    res.redirect("/listings");
};


module.exports.searchListings = async (req, res) => {
    let { country } = req.query;

    if (!country || country.trim() === "") {
        req.flash("error", "Please enter a country");
        return res.redirect("/listings");
    }

    const listings = await Listing.find({
        country: { $regex: country, $options: "i" }
    });

    res.render("listing/index.ejs", {
        allListing: listings,
        category: null
    });
};