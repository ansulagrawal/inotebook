const mongoose = require('mongoose');

// const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const mongoURI = "mongodb+srv://AnsulAgrawal:ansul9@inotebook-cluster.cqmdt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectToMongo = () => {
   mongoose.connect(mongoURI, () => {
      console.log("Connected to Mongo Sucessfully");
   })
}

module.exports = connectToMongo;
