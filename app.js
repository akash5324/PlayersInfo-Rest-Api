const express=require('express');
const bodyparser=require('body-parser');
const _=require('lodash');
const {ObjectId}=require('mongodb');
const {Info}=require('./models/info');
const{User}=require('./models/users');
const {mongoose}=require('./database/mongoose');
const app=express();
const port=process.env.PORT || 3000;
app.use(bodyparser.json());


//posting data to the server
app.post('/info',(req,res)=>{

	
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
app.get('/info',(req,res)=>{

	console.log('you made a get request');

		Info.find({}).then((infos)=>{

			res.send(infos);
			console.log(infos);
		},(e)=>{

			res.status(400).send(e);

		});

});


//getting data with particular id
app.get('/info/:id',(req,res)=>{

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

app.delete('/info/:id', (req, res) => {
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

app.patch('/info/:id',(req,res)=>{

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