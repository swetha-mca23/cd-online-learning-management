const mongoose = require('mongoose');

exports.connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo connection successfull");
    }
    catch(err){
        console.log("Mongo connection failed : " , err.message); 
    }
}

