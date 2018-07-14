const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
//schema model for info

var UserSchema=new mongoose.Schema({

email:{

	type:String,
	required:true,
	trim:1,
	minlength:1,
	unique:true,
 	validate:{

 	validator:validator.isEmail,
 	message:'{VALUE} is not a Email'
 }
},

password:{
	type:String,
	required:true,
	minlength:5
},

tokens:[{

		access:{

			type:String,
			required:true
		},

		token:{

			type:String,
			required:true

		}
}]	
});


UserSchema.methods.toJSON=function(){

	var user=this;
	var userObject=user.toObject();

	return _.pick(userObject,['_id','email'])
}
UserSchema.methods.generateToken=function(){

		var user=this;
		var access='auth';
		var token=jwt.sign({_id:user._id.toHexString(),access},'akash5324').toString();

		user.tokens.push({access,token});

		return user.save().then(()=>{
				return token;
		});
};


UserSchema.statics.findByToken=function(token){

var user=this;
 var decoded;

 try{

 	decoded=jwt.verify(token,'akash5324');

 } catch(e){
 			return new Promise((resolve,reject)=>{

 				reject();

 			});
 }

 return User.findOne({
 	'_id':decoded._id,

 	'tokens.token':token,

 	'tokens.access':'auth'
 });

};

var User= mongoose.model('User',UserSchema);

module.exports={User};
