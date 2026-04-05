const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: {
            type: String,
            default: "https://t3.ftcdn.net/jpg/19/13/08/52/240_F_1913085245_UtNbjCigPKbWg5p8y3GC3H4AXMpAY5I8.jpg"
        },
        filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
        type: {
            type : String,
            enum : ['Point'],
            required : true,
        },
        coordinates: {
            type: [Number],
            required : true,
        }
    },
    category:{
        type: String,
        enum: ["trending", "budget", "luxury", "apartment", "iconic", "mountain", "castle", "pools", "camping", "farmhouse", "lounge", "beach", "houseboat"]
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;