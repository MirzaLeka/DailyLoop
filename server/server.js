const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var Todo = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var cookieParser = require('cookie-parser'); 

var app = express();
app.use(cookieParser()); // setting up cookie-parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

let userCookie = null;

// console.log("DELETE: ", req.cookies);

///////////////////////////////////////////////////////////////////////////

// Routes Config // 


/* Home Page */

app.get("/", function(req, res) {

  userCookie = req.cookies;

  if ( userCookie == null ||  _.isEmpty( userCookie ) ) {
    res.sendFile("login.html", {"root": __dirname + "/../Resources/dist"}); 
  } else { 
    res.redirect(301, '/home'); 
  }


    });

  app.get("/home", (req, res) => {

   userCookie = req.cookies;

  if ( userCookie == null) {
    res.sendFile("loginFailed.html", {"root": __dirname + '/../Resources/dist'});
  } else if ( _.isEmpty( userCookie )  ) {
    res.redirect(301, '/'); 
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



///////////////////////////////////////////////////////////////////////////

// Todos Controller //


/* Post todo */

app.post('/todos', authenticate, (req, res) => {

  var d = new Date();
  var str = d.toString();
  str = str.substr(4,20);

  var todo = new Todo({
    text: req.body.text,
    createdAt: str,
    createdAtTimestamp: d.getTime(),
    lastUpdated: d.getTime(),
    _creator: req.user._id // set creator to be id of user & then in get show todos where id of user matches the one we just saved in creator
  });

      /* Updating created todos per user */

        var user = new User();

        User.findOne({_id: req.user._id}).then((theUser) => { // we get that user whoose id that matches req.user._id 
           User.findByIdAndUpdate(req.user._id, {$set: {todosCreated: ++theUser.todosCreated}}, {new: true}).then((err, doc) => {});
      }, (e) => { 
        console.log(e);
      });
    

  todo.save().then((doc) => {
    
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });


});



/* Get all todos */

app.get('/todos', authenticate, (req, res) => {

    Todo.find({
      _creator: req.user._id
    }).sort({z: 1}).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });

});




/* Get todos after patch */ 

app.get("/todos/:display/:limit/:sort", authenticate, (req, res) => {

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
  
    Todo.find({completed: isCompleted, _creator: req.user._id}).sort({createdAtTimestamp: 1}).limit(Number(limit)).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });
  
  } else if (sort == "Last updated") {
    
    Todo.find({completed: isCompleted, _creator: req.user._id}).sort({lastUpdated: -1}).limit(Number(limit)).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });
  
     }
  
  else {
  
    Todo.find({completed: isCompleted, _creator: req.user._id}).sort({completedAtTimestamp: asc}).limit(Number(limit)).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });
  
  }
  
  
  
  } else {
  
  
    if (sort == "Date created") {
    
    Todo.find({_creator: req.user._id}).sort({createdAtTimestamp: 1}).limit(Number(limit)).then((todos) => {
        res.send({todos}); 
      }, (e) => { 
        res.status(400).send(e);
      });
    
    } else if (sort == "Last updated") {
    
      Todo.find({_creator: req.user._id}).sort({lastUpdated: -1}).limit(Number(limit)).then((todos) => {
        res.send({todos}); 
      }, (e) => { 
        res.status(400).send(e);
      });
    
       }
    
    else {
    
      Todo.find({_creator: req.user._id}).sort({completedAtTimestamp: asc}).limit(Number(limit)).then((todos) => {
        res.send({todos}); 
      }, (e) => { 
        res.status(400).send(e);
      });
    
       }
    
    
    }
  

});



/* Get todos by text */

app.get("/todos/:text/:completed/:limit/:sort", authenticate, (req, res) => {

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

var searchedText = new RegExp(text, "i");



if ( typeof(isCompleted) === 'boolean' ) {

if (sort == "Date created") {

  Todo.find( { text: searchedText, completed: isCompleted, _creator: req.user._id } ).sort({createdAtTimestamp: 1}).limit(Number(limit)).then((todos) => {
    res.send({todos}); 
  }, (e) => { 
    res.status(400).send(e);
  });

} else if (sort == "Last updated") {
  
  Todo.find( { text: searchedText, completed: isCompleted, _creator: req.user._id } ).sort({lastUpdated: -1}).limit(Number(limit)).then((todos) => {
    res.send({todos}); 
  }, (e) => { 
    res.status(400).send(e);
  });

   }

else {

  Todo.find( { text: searchedText, completed: isCompleted, _creator: req.user._id } ).sort({completedAtTimestamp: asc}).limit(Number(limit)).then((todos) => {
    res.send({todos}); 
  }, (e) => { 
    res.status(400).send(e);
  });

}



} else {


  if (sort == "Date created") {
  
  Todo.find( { text: searchedText, _creator: req.user._id } ).sort({createdAtTimestamp: 1}).limit(Number(limit)).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });
  
  } else if (sort == "Last updated") {
  
    Todo.find( { text: searchedText, _creator: req.user._id }  ).sort({lastUpdated: -1}).limit(Number(limit)).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });
  
     }
  
  else {
  
    Todo.find( { text: searchedText, _creator: req.user._id }  ).sort({completedAtTimestamp: asc}).limit(Number(limit)).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });
  
     }
  
  

  }



});




/* Patch todo by id */

app.patch('/todos/:id', authenticate, (req, res) => {

  var id = req.params.id;
  
  // values we want to change are in array
  var body = _.pick(req.body, ['text', 'description', 'completed', 'completedAt']); //what user can edit. Make a Patch with text/compled/completedAt and write it in here. maybe the same for timestamp?
  
  if (!ObjectID.isValid(id)) {
   return res.status(400).send('Id is not valid'); 
  } 

  // Last updated will change whenever you update, no matters if you todo is completed or isn't
    body.lastUpdated = new Date().getTime();
  
  // if completed is boolean and is completed then give date of completion to completeAt (remove null)

  let increment = 0;

  if (_.isBoolean(body.completed) && body.completed) {

    body.completedAtTimestamp = new Date().getTime();
    increment++;

  } else {
    body.completed = false;
    body.completedAtTimestamp = null;
    increment--;
  }

   
    var user = new User();

    /* Updating todosCompleted for user */
    User.findOne({_id: req.user._id}).then((theUser) => { 

      let todosCompleted = theUser.todosCompleted + increment;
      let rank = 0;

      if (todosCompleted >= 1 && todosCompleted < 5) {
          rank = 'Beginner';
      } else if (todosCompleted >= 5 && todosCompleted < 10) {
          rank = 'Amateur';
      } else if (todosCompleted >= 10 && todosCompleted < 20) {
          rank = 'Junior';
      } else if (todosCompleted >= 20 && todosCompleted < 50) {
          rank = 'Nerd';
      } else if (todosCompleted >= 50 && todosCompleted < 100) {
          rank = 'Professional';
      } else if (todosCompleted >= 100 && todosCompleted < 200) {
          rank = 'Senior';
      } else if (todosCompleted >= 200) {
          rank = 'Master';
      } else {
          rank = 0;
      }

       User.findByIdAndUpdate(req.user._id, {$set: {todosCompleted, rank}}, {new: true}).then((err, doc) => {});
        
   }, (e) => { 
     console.log(e);
     });

  
  // set body and return new (changed) value
  Todo.findOneAndUpdate({_creator: req.user._id, _id: id}, {$set: body}, {new: true}).then((todo) => {
  
  if (!todo) {
  return res.status(404).send();
  }
  res.send({todo});
  
  }).catch((e) => {
  res.status(400).send();
  });
  
  });



/* Delete one todo by id */

app.delete("/todos/:id", authenticate, (req, res) => {

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

      Todo.findOneAndRemove({
        _creator: req.user._id, // remove todo where creator id is correct
        _id: id[i] // and where id of i matches todo id
      }).then((todo) => {

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

    Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {

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

app.delete("/todos", authenticate, (req, res) => {

  Todo.remove({_creator: req.user._id}).then((result) => {});

});


///////////////////////////////////////////////////////////////////////////

// User Controller //


/* Reguster new user */

app.post('/users', (req, res) => {

let body = _.pick(req.body, ["username", "email", "password"]);

let user = new User(body);

user.save().then(() => {
  return user.generateAuthToken();
  }).then((token) => {

    res.cookie('x-auth', token, {
      expires: new Date(Date.now() + 253402300000000)
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
            expires: new Date(Date.now() + 253402300000000)
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



///////////////////////////////////////////////////////////////////////////

// Render Error Page //

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

///////////////////////////////////////////////////////////////////////////

// Port // 

app.listen(port, () => {
  console.log('Started on port ' + port);
});

module.exports = {app};