
/** implementation of the database
   connection function */


const { MongoClient } = require("mongodb");

// require env file and expose its variables
require('dotenv').config();

// mongodb connection URI
const uri = process.env.ATLAS_URI;

// define dabatase connection
// if connected, this will be re-assigned 
// the particular.
var dbConnection;

// instantiate mongoClient with connection
// URI
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = {

    // this function, connects to the base
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                console.error("failed to connect to databse", err);
                // if error, pass the error to callback function
                return callback(err);
            }
            // if database is connected,
            // re-assigned dbConnection 
            // to the particular database.
            dbConnection = db.db("shop");
            console.log("Connected to shop database");
        
        });
    },
    
    // get the database dbConnection for queries.
    getDb: function () {
        return dbConnection;
    },
}