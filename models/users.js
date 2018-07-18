const mongoose=require('mongoose');
const validator=require('validator');//validator module to validaye email id
const jwt=require('jsonwebtoken');//to generate tokens
const _=require('lodash');
const bcrypt = require('bcryptjs');//to encrypt password
//schema model for user info

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

//generating token
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

//authenticating token
UserSchema.statics.findByToken=function(token){

var user=this;
 var decoded;

 try{

 	decoded=jwt.verify(token,'akash5324');

 } catch(e){
 			return Promise.reject();
 }

 return User.findOne({
 	'_id':decoded._id,

 	'tokens.token':token,

 	'tokens.access':'auth'
 });

};

//storing hashed password
UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
var User= mongoose.model('User',UserSchema);

module.exports={User};
