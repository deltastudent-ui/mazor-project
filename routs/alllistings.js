const express = require("express");
const router = express.Router();  // router obj 

// for requiring models 
const Listing = require("../models/listing.js")
const wrapAsync = require("../Error/wrapAsync.js");


// for requiring conteroler in listings

const ListingControler = require("../controlers/listing.js");

//requiring middleware
const {isloggedIn, isOwner, validateListing} = require("../middlewere.js");

// for requiring and use multer
const multer = require("multer");
// for requiring cloudeconfig--
const {storage} = require("../cloudeconfig.js");
const upload = multer({storage}); // ye auto crate kar dega upload folder ko aur usi m files save karwayega aur to y tramprery hai iska jaga p koi third party cloud use karenge

router.get("/search",(ListingControler.search));
// router .route ka mean hai ki jo jo same path p request ja arha hai hai use sara isi m likh do ---
router.route("/")
.get(wrapAsync(ListingControler.index)) // listing controler ko isi tarah pass kar denge 
.post( isloggedIn,upload.single('listing[image]'),validateListing, wrapAsync(ListingControler.postRoutes));



  router.get("/new", isloggedIn, wrapAsync(ListingControler.renderNewForm));


  //show rout    // upload.single('listing[image]'),ye file ko ko banked m serve kar raha hai---

  router.route("/:id")
  .get(wrapAsync(ListingControler.showRoutes)) // new route ka get wala ahia
  .put(isloggedIn, isOwner,upload.single('listing[image]'), validateListing,wrapAsync(ListingControler.editPut)) // put route 
  .delete(isloggedIn,isOwner, wrapAsync(ListingControler.delteRoutes)); // delete route 
  // edit and update rout 

  router.get("/:id/edit",isloggedIn, isOwner, wrapAsync(ListingControler.editGet));


  // delete routes

  // search rout 


  module.exports= router;