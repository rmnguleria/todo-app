//setup-----------------------------
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

//configuration--------------------------
mongoose.connect("mongodb://node:node@proximus.modulusmongo.net:27017/nyji5Dom");

app.use(express.static(__dirname + '/public')); // set the static files location
app.use(morgan('dev')); // log every request to the console.
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define model =================
    var Todo = mongoose.model('Todo', {
        text : String
    });

//routes

//api

//get all todos--------------------------------------------------------
app.get('/api/todos',function(req,res){
	Todo.find(function(err,todos){
		// if there is an error , send an error . if err nothing else will get executed.
		if(err)
			res.send(err);
			//break;

		res.json(todos); // return all todos in JSON format
	});
});

// create a todo and return all todos

app.post('/api/todos',function(req,res){

	// creating a new todo . (Data in AJAX call)
	Todo.create({
		text : req.body.text,
		done : false
	},function(err,todo){
		if(err)
			res.send(err);
			//break;
		
		// send all todos
		Todo.find(function(err,todos){
			if(err)
				res.send(err);
			// send all todos
			res.json(todos);
		});
	});
});

// delete a todo

app.delete('/api/todos/:todo_id',function(req,res){
	Todo.remove({
		_id : req.params.todo_id
	},function(err,todo){
		if(err)
			res.send(err);

		// send all todos
		Todo.find(function(err,todos){
			if(err)
				res.send(err);
			// send all todos
			res.json(todos);
		});

	})
});

//application
app.get('*',function(req,res){
	res.send('./public/index.html');
});

//listen(start the app BITCHES !!!)
app.listen(1337);
console.log("application running on port 1337");






















