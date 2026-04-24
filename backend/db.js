const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const connectMongo = () => {
    mongoose.connect(mongoURI).then(() => console.log("console connected")).catch((e) => console.log(e.message));
}
module.exports = connectMongo;