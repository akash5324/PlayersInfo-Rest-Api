const mongoose=require('mongoose');
//schema model for info
var Info= mongoose.model('Info', {

		Name: 
		{
			type:String,
			required: true,
    		minlength: 5,
			trim: true
		},
		Age:Number,
		Role:
		{
			type:String,
			required: true,
    		minlength: 3,
			trim: true
		},
		Team:
		{
			type:String,
			required: true,
    		minlength: 5,
			trim: true
		},

		Stats:
		{

			Runs:
			{
				type:Number
			},

			Wkts:
			{

			type:Number
			
			},
		}
});

module.exports={Info};
