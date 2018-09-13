const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var {mongoose} = require('./db/mongoose');
var Todo = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


/* Home Page */

app.get("/", function(req, res)
{
res.sendFile("index.html", {"root": __dirname + "/../Web-Info"}); 
    });

app.get("/home", (req, res) => {
res.sendFile("index.html", {"root": __dirname + '/../Web-Info'});
    });

/* Static files */

app.use(express.static(__dirname + '/../Web-Info', { 
  extensions: ['html', 'htm'] 
  }));
  
/* Resources */

app.use("/Resources", express.static(__dirname + '/../Resources')); 




/* Routing */

var updatedAlign = '';
var originalAlign = '';


/* Post todo */

app.post('/todos', (req, res) => {

  var d = new Date();
  var str = d.toString();
  str = str.substr(4,20);

// UNTIL I'M COMPLETELY SURE WHAT I'M DOING

//   Todo.count(function (err, count) {
//     if (!err && count === 0) {
//               // console.log("All good!");
//     } else {
//       // console.log("Even better");
//       // console.log("Todo before push: ");

//       Todo.find().sort({completedAtTimestamp: 1}).then((todos) => {
//       //  console.log(todos[0].align);

//       originalAlign = todos[0].align;
  
//       }, (e) => { 
//         console.log(e);
//       });

// //      console.log(Todo.find({text: "Igi"})); TO DO AND TEST
//     }
// });

// DRUGI KORAK
// ako je bio update bit ce ovaj Drugi uslov
// ako nije ili ako si tek upalio app onda vazi PRVI uslov (if) i ovo odozgo

  if (updatedAlign.length == 0) { // OVO CE TREBATI kad on napravi update i ako je napravio update ici ce da je tomahawk ono iz elsa
   originalAlign = "List"; // a ako nije bio update onda ce uzeti predhodnu odozgo, tj uzet ce onu koja je pod alignom u baz
  } else {
    originalAlign = updatedAlign;
  }

  // tj bit ce ako je prazna stavi list
  // ako nije prazna onda vidi sta je u bazi pod align (todos[0].align) i stavi da tomahawk bude to
  // a ako apdejtas onda promjeni tomahawk na to sto si dobio (raptor)

  var todo = new Todo({
    text: req.body.text,
    createdAt: str,
    createdAtTimestamp: d.getTime(),
    lastUpdated: d.getTime(),
    align: originalAlign
    // display: req.body.display,
    // sort: req.body.sort,
    // limit: req.body.limit
  });

  todo.save().then((doc) => {
    
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});



/* Get all todos */

app.get('/todos', (req, res) => {

  var todo = new Todo({});

  // if todos is empty?

    Todo.find().sort({completedAtTimestamp: 1}).then((todos) => {
      res.send({todos}); 
      // console.log("SSS:" + todo.align);
      // console.log("DDD:" + todos.align);


    }, (e) => { 
      res.status(400).send(e);
    });


});


/* Get all todos + align */

app.get('/todos/:align', (req, res) => {

  let align = req.params.align;
  console.log("Value of align is " + align);

  Todo.find({align}).sort({completedAtTimestamp: 1}).then((todos) => {
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



var test =  req.params.text + "{1,}"

var rec = new RegExp(test, "i");



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
  var body = _.pick(req.body, ['text', 'completed', 'someNew']); //what user can edit. Make a Patch with text/compled/completedAt and write it in here. maybe the same for timestamp?
  
  if (!ObjectID.isValid(id)) {
   return res.status(400).send('Id is not valid'); 
  }

  // Last updated will change whenever you update, no matters if you todo is completed or isn't
    body.lastUpdated = new Date().getTime();
  
  // if completed is boolean and is completed then give date of completion to completeAt (remove null)
  if (_.isBoolean(body.completed) && body.completed) {

    var d = new Date();
    var str = d.toString();
    str = str.substr(4,20);
    
    body.completedAt = str; 
    body.completedAtTimestamp = d.getTime();

  } else {
    body.completed = false;
    body.completedAt = null;
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


  /* Update align for all todos */

  app.patch("/todos", (req, res) => {

    let body = _.pick(req.body, ['align', 'theme']);

    updatedAlign = body.align; // I'll take value of align that comes from AJAX and is Patched via body object

    Todo.updateMany(
    Todo.align, {$set: body}, {new: true},
    Todo.theme, {$set: body}, {new: true} 
    ).then((todos) => {
  
      if (!todos) {
      return res.status(404).send();
      }
      res.send({todos});
      
      }).catch((e) => {
      res.status(400).send();
      });

  });


/* Delete one todo by id */

app.delete("/todos/:id", (req, res) => {

  var id = req.params.id;

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

user.save().then((user) => {
  res.send(user);
  }).catch((e) => {
  res.status(400).send(`Unable to save the user: ${e}`);
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

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
