const mongoose = require("mongoose");

const db = async () => {
   try{
    await mongoose.connect("mongodb+srv://guvib46:guviB46@cluster0.ebhseuj.mongodb.net/?retryWrites=true&w=majority");
    console.log("Database Connection Established");
   } catch (error) {
    console.log("Error while connecting DB:", error );
   };
};

module.exports = db;