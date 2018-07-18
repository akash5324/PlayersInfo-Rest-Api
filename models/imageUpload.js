const mongoose=require('mongoose');

//image upload schema
var Image= mongoose.model('Image', {

		myImage:{

			type:String,
			required:true
		}
	
});

module.exports={Image};