const mongoose=require('mongoose');
mongoose.Promise = global.Promise;
//establishing mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Info');

module.exports={mongoose};