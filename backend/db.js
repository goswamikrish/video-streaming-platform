const mongoose = require('mongoose');
const mongoURI ="mongodb://localhost:27017/youtube"
const connectMongo =()=>{
    mongoose.connect(mongoURI).then(()=>console.log("console connected")).catch((e)=>console.log(e.message));
}
module.exports=connectMongo;