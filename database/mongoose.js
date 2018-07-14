const mongoose=require('mongoose');
mongoose.Promise = global.Promise;
//establishing mongoose connection
 //mongoose.connect('mongodb://*******:*******@ds125181.mlab.com:25181/info');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Info');

module.exports={mongoose};