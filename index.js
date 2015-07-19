

var express = require ('express');
var url = require('url');
var app = express();
var func = require('./functions.js');
var PORT = process.env.PORT || 3000;
app.set ('port' , PORT);
var usersList;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var mail;
var user;







app.get('/login', function(req, res) {			

  	var urlObj = url.parse(req.url, true, false);
  	var person = urlObj.query.person;
  	person = JSON.parse(person);
  	var mail = person.email;



	var usersList;
	var mongoose = require('mongoose');
	var db = mongoose.connect('mongodb://david:12345@ds047762.mongolab.com:47762/traindating');
	var userSchema = require('./schema.js').userSchema;
	mongoose.model('UsersM', userSchema);



mongoose.connection.once('open', function() {

    Users = this.model('UsersM');
   
    Users.find(function(err, docs) {


		Users.findOne( {email: mail} , function (err, doc){
	        
	        if(doc != null){ // user exists
		        


          var query = doc.update({$set: 
          {  top: person.top , left: person.left , lstop: person.lstop , carrige: person.carrige }  });
          query.exec(function(err, results){});


            query.exec(function(err, results){});


		        mongoose.disconnect();

				app.set('json spaces', 4);
                 console.log("exists");
				
				res.setHeader('Content-Type', 'application/json');

        Users.find(function(err, docs) {
        res.json(docs);
        console.log(doc);
       });
				
        }
        	else{ // need to be saved ( mail )

		     	var yearStringSize = person.birthday.length; //calc user's age
        		var year = person.birthday[yearStringSize-4] + person.birthday[yearStringSize-3] + person.birthday[yearStringSize-2]+ person.birthday[yearStringSize-1];
        		year = parseInt(year);
        		var newAge = 2015-year;


        		var newUser = new Users({
        			email : mail,
        			name : person.first_name +" "+ person.last_name,
        			status : 0,
        			left:person.left,
        			top:person.top,
        			lstop : person.lstop,
        			ttime : 10,
              carrige: person.carrige,
        			img : "http://graph.facebook.com/" + person.id +"/picture?type=square",
        			age : newAge

        		});
            console.log("newuser");
        		newUser.save(function(err,doc){            
 				       	console.log(newUser);
        			mongoose.disconnect();
        		});
        		
        		
        		res.setHeader('Content-Type', 'application/json');
            
            Users.find(function(err, docs) {
            res.json(docs);
            console.log(doc);
           });
        	}
        });

   
    });

});



});






app.get('/setStatus', function(req, res){
  

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://david:12345@ds047762.mongolab.com:47762/traindating');
var userSchema = require('./schema.js').userSchema;
mongoose.model('UsersM', userSchema);

  var urlObj = url.parse(req.url, true, false);
  var person = urlObj.query.person;
  person = JSON.parse(person);
  var mail = person.email;



mongoose.connection.once('open', function() {

    Users = this.model('UsersM');
   
    Users.findOne( {email: mail} , function (err, doc){


      if(doc == null){ // Register


      }else{

          if(doc.status == 1){  

             var query = doc.update({$set: 
            {  status: 0 }  });
            query.exec(function(err, results){});

          }
          else{

            var query = doc.update({$set: 
            {  status: 1 }  });
            query.exec(function(err, results){});

          }

      }
        
        mongoose.disconnect();
        
    });

});

 
});









app.get('/getStatus', function(req, res){
  

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://david:12345@ds047762.mongolab.com:47762/traindating');
var userSchema = require('./schema.js').userSchema;
mongoose.model('UsersM', userSchema);

  var urlObj = url.parse(req.url, true, false);
  var person = urlObj.query.person;
  person = JSON.parse(person);
  var mail = person.email;

 


mongoose.connection.once('open', function() {

    Users = this.model('UsersM');
   
    Users.findOne( {email: mail} , function (err, doc){


      if(doc == null){ 


      }else{
              
        mongoose.disconnect();
        res.json( doc.status);

      }
        
        
    });

});

 
});








app.listen(PORT);



