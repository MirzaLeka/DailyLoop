const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var Todo = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var cookieParser = require('cookie-parser'); // used for cookies obviously
var cookie = require('cookie');
var store = require('store') // used for local storage. check npmjs/store

const jsdom = require("jsdom"); // using jsdom in npm
const { JSDOM } = jsdom;

var app = express();
app.use(cookieParser()); // setting up cookie-parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

let userCookie = null;



/* Home Page */

app.get("/", function(req, res) {

  userCookie = req.cookies;

  if ( userCookie == null ||  _.isEmpty( userCookie ) ) {
    res.sendFile("login.html", {"root": __dirname + "/../Resources/dist"}); 
  } else { 
    res.sendFile("index.html", {"root": __dirname + '/../Resources/dist'});  
  }


    });

app.get("/home", (req, res) => {

  userCookie = req.cookies;

  if ( userCookie == null ||  _.isEmpty( userCookie ) ) {
    res.sendFile("loginFailed.html", {"root": __dirname + '/../Resources/dist'});
  } else {
    res.sendFile("index.html", {"root": __dirname + '/../Resources/dist'});
  }

    });

/* Static files */

app.use(express.static(__dirname + '/../Resources/dist', { 
  extensions: ['html', 'htm'] 
  }));
  
/* Resources */

app.use("/Resources", express.static(__dirname + '/../Resources')); 





/* Post todo */

app.post('/todos', (req, res) => {

  var d = new Date();
  var str = d.toString();
  str = str.substr(4,20);


  var todo = new Todo({
    text: req.body.text,
    createdAt: str,
    createdAtTimestamp: d.getTime(),
    lastUpdated: d.getTime(),
  });

  todo.save().then((doc) => {
    
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});



/* Get all todos */

app.get('/todos', (req, res) => {

    Todo.find().sort({z: 1}).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });

});




/* Get todos after patch */ 

app.get("/todos/:display/:limit/:sort", (req, res) => {

  var getCompleted = req.params.display;
  var limit = req.params.limit;
  var sort = req.params.sort;

  var isCompleted;
  
  if (getCompleted == "Completed") {
    isCompleted = true;
  }
  else if (getCompleted == "Not completed") {
    isCompleted = false;
  }
  else {
    isCompleted = '';
  }
  
  
  if (limit == "No limit") {
    limit = 0;
  }

  // Sort todos asc or desc order 
var asc = 0;

if (sort == "Date completed ⇧") {
  
  asc = -1;

} else if (sort == "Date completed ⇩") {

  asc = 1;

}


if ( typeof(isCompleted) === 'boolean' ) {

  if (sort == "Date created") {
  
    Todo.find({completed: isCompleted}).sort({createdAtTimestamp: 1}).limit(Number(limit)).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });
  
  } else if (sort == "Last updated") {
    
    Todo.find({completed: isCompleted}).sort({lastUpdated: -1}).limit(Number(limit)).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });
  
     }
  
  else {
  
    Todo.find({completed: isCompleted}).sort({completedAtTimestamp: asc}).limit(Number(limit)).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });
  
  }
  
  
  
  } else {
  
  
    if (sort == "Date created") {
    
    Todo.find({}).sort({createdAtTimestamp: 1}).limit(Number(limit)).then((todos) => {
        res.send({todos}); 
      }, (e) => { 
        res.status(400).send(e);
      });
    
    } else if (sort == "Last updated") {
    
      Todo.find({}).sort({lastUpdated: -1}).limit(Number(limit)).then((todos) => {
        res.send({todos}); 
      }, (e) => { 
        res.status(400).send(e);
      });
    
       }
    
    else {
    
      Todo.find({}).sort({completedAtTimestamp: asc}).limit(Number(limit)).then((todos) => {
        res.send({todos}); 
      }, (e) => { 
        res.status(400).send(e);
      });
    
       }
    
    
  
    }
  

});



/* Get todos by text */

app.get("/todos/:text/:completed/:limit/:sort", (req, res) => {

var getCompleted = req.params.completed;
var limit = req.params.limit;
var sort = req.params.sort;

var isCompleted;

if (getCompleted == "Completed") {
  isCompleted = true;
}
else if (getCompleted == "Not completed") {
  isCompleted = false;
}
else {
  isCompleted = '';
}


if (limit == "No limit") {
  limit = 0;
}

// Sort todos asc or desc order 
var asc = 0;

if (sort == "Date completed ⇧") {
  
  asc = -1;

} else if (sort == "Date completed ⇩") {

  asc = 1;

}



var text =  req.params.text + "{1,}";

var rec = new RegExp(text, "i");



if ( typeof(isCompleted) === 'boolean' ) {

if (sort == "Date created") {

  Todo.find( { text: rec, completed: isCompleted } ).sort({createdAtTimestamp: 1}).limit(Number(limit)).then((todos) => {
    res.send({todos}); 
  }, (e) => { 
    res.status(400).send(e);
  });

} else if (sort == "Last updated") {
  
  Todo.find( { text: rec, completed: isCompleted } ).sort({lastUpdated: -1}).limit(Number(limit)).then((todos) => {
    res.send({todos}); 
  }, (e) => { 
    res.status(400).send(e);
  });

   }

else {

  Todo.find( { text: rec, completed: isCompleted } ).sort({completedAtTimestamp: asc}).limit(Number(limit)).then((todos) => {
    res.send({todos}); 
  }, (e) => { 
    res.status(400).send(e);
  });

}



} else {


  if (sort == "Date created") {
  
  Todo.find( { text: rec } ).sort({createdAtTimestamp: 1}).limit(Number(limit)).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });
  
  } else if (sort == "Last updated") {
  
    Todo.find( { text: rec }  ).sort({lastUpdated: -1}).limit(Number(limit)).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });
  
     }
  
  else {
  
    Todo.find( { text: rec }  ).sort({completedAtTimestamp: asc}).limit(Number(limit)).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });
  
     }
  
  

  }



});




/* Patch todo by id */

app.patch('/todos/:id', (req, res) => {

  var id = req.params.id;
  
  // values we want to change are in array
  var body = _.pick(req.body, ['text', 'description', 'completed', 'completedAt']); //what user can edit. Make a Patch with text/compled/completedAt and write it in here. maybe the same for timestamp?
  
  if (!ObjectID.isValid(id)) {
   return res.status(400).send('Id is not valid'); 
  }

  // Last updated will change whenever you update, no matters if you todo is completed or isn't
    body.lastUpdated = new Date().getTime();
  
  // if completed is boolean and is completed then give date of completion to completeAt (remove null)
  if (_.isBoolean(body.completed) && body.completed) {

    body.completedAtTimestamp = new Date().getTime();

  } else {
    body.completed = false;
    body.completedAtTimestamp = null;
  }
  
  // set body and return new (changed) value
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
  
  if (!todo) {
  return res.status(404).send();
  }
  res.send({todo});
  
  }).catch((e) => {
  res.status(400).send();
  });
  
  });



/* Delete one todo by id */

app.delete("/todos/:id", (req, res) => {
  
  // console.log("DELETE: ", req.cookies);

  // res.clearCookie("x-auth"); DELETE TOKEN

  var id = req.params.id;

  // if it's > 30 then there are multiple ids inside id array
  if (id.length > 30) {
    // i'm getting string and I want to split it into an array
    id = id.split(",");
  } 

  if ( Array.isArray(id) ) {

    for (let i = 0; i < id.length; i++) {

      if (!ObjectID.isValid(id[i])) {
        return res.status(400).send("Invalid id");
      }

      Todo.findByIdAndRemove(id[i]).then((todo) => {

        if (!todo) {
          return res.status(404).send("Todo not found");
        }
    
        res.send({todo});
    
      }).catch((e) => {
        res.status(400).send();
      });
    

    }

  } else {

    if (!ObjectID.isValid(id)) {
      return res.status(400).send("Invalid id");
    }

    Todo.findByIdAndRemove(id).then((todo) => {

      if (!todo) {
        return res.status(404).send("Todo not found");
      }
  
      res.send({todo});
  
    }).catch((e) => {
      res.status(400).send("Bad request");
    });
  

  }


  

});


/* Delete all todos */

app.delete("/todos", (req, res) => {

  Todo.remove({}).then((result) => {});

});


//////////////////////////////////////

/* Users Controller */

app.post('/users', (req, res) => {

let body = _.pick(req.body, ["username", "email", "password"]);

let user = new User(body);

user.save().then(() => {
  return user.generateAuthToken();
  }).then((token) => {

    res.cookie('x-auth', token, {
      expires: new Date(Date.now() + 30000000)
    });

    userCookie = req.cookies;

    res.header('x-auth', token).send(user);

  }).catch((e) => {
  res.status(400).send(e); // if email or username is already used

  });

});


  /* Profile Page */ 

app.get('/users/me', authenticate, (req, res) => {

  
  res.send(req.user);

});


/* POST users/login {email, plain text password} */

app.post('/users/login', (req, res) => {

    let body = _.pick(req.body, ["email", "password"]);

    User.findByCredentials(body.email, body.password).then((user) => {

        return user.generateAuthToken().then((token) => {

          res.cookie('x-auth', token, {
            expires: new Date(Date.now() + 30000000)
          });

          userCookie = req.cookies;

          res.header('x-auth', token).send(user);

        });

    }).catch((e) => {

        res.status(400).send(); // will go off if user logging in doesn't exist in DB

    });


});


app.delete("/users/me/token", authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.clearCookie("x-auth"); 
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});



/////////////////////////////////////

/* Render Error Page */

const router = express.Router();

router.use(function(req, res, next) {
    if (!req.route)
        return next (new Error('404'));  
    next();
});

router.use(function(err, req, res, next){
   // res.send(err.message);
    res.sendFile("errorPage.html", { root: path.join(__dirname, '../Web-Info') });
})

router.use(function(req, res){
    res.send(app.locals.test + '');
});

 app.use(router);


/* Port */

app.listen(port, () => {
  console.log('Started on port ' + port);
});

module.exports = {app};
