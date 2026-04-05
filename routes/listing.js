const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema}  = require("../schema.js");
const Listing =  require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js")
const { isLoggedIn, isOwner } = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../CloudConfig.js");
const upload = multer({storage});



const listingController = require("../controllers/listings.js");

const validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    
    if(error){
        throw new ExpressError(400, error);
    }
    else{
        next();
    }
}

router.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.createListing)
);

router.get("/search", wrapAsync(listingController.searchListings));

router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing,  wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router.get("/:id/edit", isLoggedIn,  wrapAsync(listingController.renderEditForm));


module.exports = router;