const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("connected to db");
        await initDB();
    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
}

const initDB = async () => {
    // delete old data
    await Listing.deleteMany({});

    // add owner to each object
    const updatedData = initData.data.map((obj) => ({
        ...obj,
        owner: new mongoose.Types.ObjectId("69ccd3bba0a5f969f7702da1")
    }));

    // insert new data
    await Listing.insertMany(updatedData);

    console.log("Data is initialized");
};

main();