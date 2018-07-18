const express=require('express');//requiring express.js
const bodyparser=require('body-parser');//requiring body-parser
const _=require('lodash');//requiring lodash
const multer=require('multer');//requiring multer for image upload
var thumb = require('node-thumbnail').thumb;//requiring node-thumnail for generating thumnails
const {ObjectId}=require('mongodb');//requiring mongodb objectId
const {Info}=require('./models/info');//requiring info model
const{User}=require('./models/users');//requiring user model
const {Image}=require('./models/imageUpload');//requiring imageupload model
var {authenticate} = require('./middleware/authenticate');//requiring authenticate middleware file
const {mongoose}=require('./database/mongoose');//requiring mongoose file
const app=express();//calling express function
const port=process.env.PORT || 3000;//biding port number
app.use('/uploads',express.static('uploads'));//making images static files for use
app.use('/thumbnails',express.static('thumbnails'));//making thumbnials for use
app.use(bodyparser.json());

//storing image via multer

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
});

var upload = multer({storage: storage,
			 limits: {
    		fileSize: 1024 * 1024 * 5
			},
			fileFilter: function(req,file, callback) {
			var ext =file.originalname;
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				callback(null,false);
			}
			callback(null, true);
		}
	});

//post request routing for upload an image...........
app.post('/upload',authenticate, upload.single('image'), (req, res, next) => {
            
			var myimage=new Image({

				myImage:req.file.path
			});

			myimage.save().then((img)=>{
			console.log("image is saved successfully to the database");
	},(e)=>{

		res.status(400).send(e)

	});
            res.send({'message': 'File uploaded successfully'});

//generating image thumbnail from the uploaded image
            	thumb({
			  source: 'uploads',
  			destination: 'thumbnails',
  			width:300,
  			concurrency: 4
			}, function(files, err, stdout, stderr) {
  			console.log('All done!');
			});

});
//get request to get the image data in json format from database
app.get('/image',authenticate,(req,res)=>{

		Image.find({}).then((img)=>{

			res.send(img);
			console.log(img);
		},(e)=>{

			res.status(400).send(e);

		});

});
//posting data to the server
app.post('/info',authenticate,(req,res)=>{

	
	console.log('you made a post request');
	var info= new Info({

		Name:req.body.Name,
		Age:req.body.Age,
		Role: req.body.Role,
		Team:req.body.Team,
		Stats:{

			Runs:req.body.Stats.Runs,

			Wkts:req.body.Stats.Wkts

		}

	});
	console.log({info});

	info.save().then((infos)=>{

			console.log("data is saved successfully to the database");
			res.send(infos);


	},(e)=>{

		res.status(400).send(e)

	});

});
//getting data from the api
app.get('/info',authenticate,(req,res)=>{

	console.log('you made a get request');

		Info.find({}).then((infos)=>{

			res.send(infos);
			console.log(infos);
		},(e)=>{

			res.status(400).send(e);

		});

});

//getting data with particular id
app.get('/info/:id',authenticate,(req,res)=>{

	var id=req.params.id;
		 console.log(id);

		 if(!ObjectId==id)
		 {
		 	return res.status(400).send();
		 }

		  Info.findOne({
			    _id: id
			}).then((infos) => {
  		  	if (!infos) {
      		return res.status(404).send();
    }

    res.send({infos});
    console.log(infos);
  }).catch((e) => {
    res.status(400).send();
  });
});		  

//deleting data with particular id

app.delete('/info/:id',authenticate, (req, res) => {
  var id = req.params.id;

 	 if (!ObjectId.isValid(id)) {
    return res.status(404).send();
}

Info.findOneAndRemove({
    _id: id,
  }).then((infos) => {
    if (!infos) {
      return res.status(404).send();
    }

    res.send({infos});
    console.log(infos);
  }).catch((e) => {
    res.status(400).send();
  });
});

//patching data(update request)
app.patch('/info/:id',authenticate,(req,res)=>{

	var id=req.params.id;
	var body=_.pick(req.body,['Team','stats']);


 	 if (!ObjectId.isValid(id)) {
    return res.status(404).send();
}

if(body.Team || body.stats){

	Team:req.body.Team

}

Info.findByIdAndUpdate(id, {$set:body},{new:true}).then((infos)=>{

	if(!infos){

		return res.status(400).send();
	}

	res.send({infos});


});

});

//user post request
app.post('/users',(req,res)=>{

	
	console.log('you made a user post request');
	var body=_.pick(req.body,['email','password']);
	var user= new User(body);
	console.log({user});

	user.save().then(()=>{

			console.log("user data is saved successfully to the database");
			return user.generateToken();
	}).then((token)=>{

		res.header('x-auth',token).send(user);
	}).catch((e)=>{

		res.status(400).send(e);

	})

});	

//server binding to port 3000
app.listen(port,()=>{

	console.log(`server is running on ${port}`);
});