// $(window).scroll(function() {
//     sessionStorage.scrollTop = $(this).scrollTop();
//   });
  

$(document).ready(function() {
    // if (sessionStorage.cClicked != "undefined" && sessionStorage.scrollTop != "undefined") { 

    //     if (sessionStorage.cClicked == 'true') { 
    //     $(window).scrollTop(sessionStorage.scrollTop); 
    //     sessionStorage.cClicked = false; 
    //     } 
        
    //     } 

    //  if (localStorage.getItem("scroll") != null) {
    //     $(window).scrollTop(localStorage.getItem("scroll"));
    // }

    // $(window).on("scroll", function() {
    //     localStorage.setItem("scroll", $(window).scrollTop());
    // });

    /// GET SCROLL POSITION
    // SET TO THAT SCROLL POSITION

    startTime();
    changeBackgroundImg();
    getTodos();

});


/* GET TODOS */

function getTodos() {


$.ajax({
 type: "GET",
 url: "/todos",
 success: function(data) {

    if (data.todos.length == 0) {
        $(".notYet").css("display", "none");
        $("#inputTitle").attr("placeholder", "Submit your first todo");
        changeQuote(0, 0);

    } else {

        let completedTodos = 0;

        for (var i = 0; i < data.todos.length; i++) {

            if (data.todos[i].completed == true) {
                completedTodos++;
            }

        }

         $(".notYet").css("display", "block");
         $("#inputTitle").attr("placeholder", "");
          changeQuote(1, (data.todos.length - completedTodos));

    }


    
    console.log(data);  

var list = '';
var id = '';
var text = '';

for (var i = 0; i < data.todos.length; i++) {

id = data.todos[i]._id.toString();
text = data.todos[i].text.toString();

let status = '';
let finished = '';

var shortenTitle = data.todos[i].text;

if (data.todos[i].text.length > 50) {
    shortenTitle = data.todos[i].text.substr(0,50) + "...";
}

if (data.todos[i].completed) {
 status = "Completed";
 finished = "Completed At: " + data.todos[i].completedAt.substr(12,8);
}
else {
 status = "Not completed";
}

list += `<div class="container todoContainer">
    
     <div class="row">
      <div class="col-sm-9">
<div class="row">
<div class="col-sm-12">
<h3 class="title">${shortenTitle}</h3>
    </div>
</div>
 <div class="row">
      
 <div class="col-sm-6"><p class="status">${status}</p></div>
 <div class="col-sm-6"><p class="finished">${finished}</p> </div>
  </div>
        </div>
    <div class="col-sm-3" style="height: 105px;"> 
    <div class="col-sm-4 todoBtnCol">
 <button class="btn todoBtn" title="Update Todo" onclick="openModal(\`` + text + `\`, ${data.todos[i].completed},\`` + id + `\`,\`` + data.todos[i].completedAt + `\`, ${i}, \`` + data.todos[i].createdAt + `\`)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
 </div>
 <div class="col-sm-4 todoBtnCol">
 
 <div class="outer" title="Complete Todo" onclick='completeTodo(${data.todos[i].completed},\`` + id + `\`, ${i})'>
 <div class="switch"></div>
 </div>
  </div>        
<div class="col-sm-4 todoBtnCol">
   <button class="btn todoBtn" title="Remove Todo" id="removeTodoBtn" onclick="deleteTodo(\`` + id + `\`)"><i class="fa fa-times" aria-hidden="true"></i></button>
         </div>
    </div>
         
      </div>
 </div>`;
 
}

$("#listOfTodos").append(list);

/* once text is added we can toggle the class with counter from another for loop */
for (var i = 0; i <  data.todos.length; i++) {

    if (data.todos[i].completed) {
        $(`.switch:eq(${i})`).addClass("move");
        $(`.title:eq(${i})`).css({ "text-decoration": "line-through" });

     }
     else {
         $(`.switch:eq(${i})`).removeClass("move");
     }
     
}


 }

});

}


/* POST TODO */


 $("#inputTitle").keyup(function(event){
if(event.keyCode == 13){
 submit();
}
});
 

function submit() {

 var text = $("#inputTitle").val();

 console.log(text);

 text =  adjustString(text);

var data = {
 "text": text
// "someNew": 141
}

$.ajax({
 type: "POST",
 url: "/todos",
 contentType : 'application/json',
 dataType : 'json',
 data : JSON.stringify(data),
 success: function(data) {
 
  location.reload(); 
 }

});


}

// function search() {

// var search = $("#search").val();

// $.ajax({
//  type: "GET",
//  url: "/todos/5b609055aedeae23fcfa9ddd/",
//  contentType : 'application/json',
//  dataType : 'json',
//  sucess: function(data) {
//     var myData = JSON.parse(data.responseText);
    
//  }
// });

// }


/* DELETE TODO   */

function deleteTodo(id) {

 $.ajax({
 url: '/todos/' + id,
 type: 'DELETE',
 success: function() {
 location.reload();
        }
    });

}



/* DELETE ALL TODOS */

function deleteAllTodos() {

 $.ajax({
 url: '/todos',
 type: 'DELETE',
 success: function() {
 }


});

window.location.reload();

}

/* ADJUST STRING */

function adjustString(str) {

 str = str.trim();

 str = str.toLowerCase();

 str = str.charAt(0).toUpperCase() + str.substr(1,str.length).toLowerCase();

 return str;
}



/* COMPLETE TODO */

function completeTodo(isCompleted, someId, i) {

 if (isCompleted) {
     isCompleted = false;
     $(`.switch:eq(${i})`).removeClass("move");
 } else {
     isCompleted = true;
     $(`.switch:eq(${i})`).addClass("move");
 }

//  var d = new Date();
//  var str = d.toString();
//  str = str.substr(4,20);

var data = {
 completed: isCompleted
//  someNew: str
};


$.ajax({
url: "/todos/" + someId,
data: JSON.stringify(data),
type: 'PATCH',
contentType: 'application/json',
processData: false,
dataType: 'json',
success: function (data) {
location.reload();
}


});

}


/* UPDATE ONE TODO */

function updateTodo(text, completed, id, refresh, modalFinished) {

    var errorCounter = 0;

    text = $("textarea").val();

    text = text.trim();

    if (text == '') {
        $("#textareaError").show();
        $("#textareaError").text("Todo must have at least one character");
        errorCounter++;
    }

    else if (text.length > 1000) {
        $("#textareaError").show();
        $("#textareaError").text("Exceeded maximum number of characters (1000)");
        errorCounter++;
    }

    // var d = new Date();
    // var completedAt = d.toString();
    // completedAt = completedAt.substr(4,20);

//////////////

    // var d = new Date();
    // var str = d.toString();
    // str = str.substr(4,20);

var data = {
    text,
    completed,
    someNew: modalFinished
};

if (refresh && errorCounter == 0) {

$.ajax({
url: "/todos/" + id,
data: JSON.stringify(data),
type: 'PATCH',
contentType: 'application/json',
processData: false,
dataType: 'json',
success: function (data) {

$("#myModal").fadeOut();
// location.reload();

            }
        });

    }

}

var data = {};

var keepTheDate = '';

function combineValues(text, isCompleted, id, refresh, modalFinished, completedAt) { 


    // modalFinished the time you altered when you clicked on toggle button inside Modal
    // completedAt is the time that came from the DB if todo was completed

    // MAYBE THE ORDER OF OPERATIONS MATTERS (completed btn vs form input)


    if (typeof(modalFinished) === 'string') {
        keepTheDate = modalFinished;
        
     }  else {
         keepTheDate = completedAt; /// THIS LINE
     }

    if (typeof(text) === 'string') {
        data.text = text;

        if (  $(".switchModal").hasClass("moveModal") ) {
            data.completed = true;
            keepTheDate = keepTheDate;
            
        } else {
            data.completed = false;
            keepTheDate = null;
        }
     
        refresh = true;
    }

   else if (typeof(text) === "number") {
        data.completed = isCompleted;
        refresh = false;

        if (isCompleted) {
            keepTheDate = modalFinished;
        } else {
            keepTheDate = null;
        }

    }

    console.log("keepTheDate is " + keepTheDate);

    updateTodo(data.text, data.completed, id, refresh, keepTheDate);

}

  
var modalStatus = "";
var modalFinished = '';
var toggleCounter = 0;
var toggleValue = [];

function completeInModal(text, isCompleted, id, refresh, completedAt, i) {

    if (toggleCounter == 0) {
        toggleValue[i] = !isCompleted;
      }
      else {
        toggleValue[i] = !toggleValue[i];
      }

      // if it's not completed (and clicked on update) it will not show time from completedAt var (because it's not complete)
      // so i'm using modalFinished var to create new Date & time

      var d = new Date();
      var str = d.toString();
      str = str.substr(4,20);
      modalFinished = str;

      if (toggleValue[i]) {
        $(".switchModal").addClass("moveModal");
        modalStatus = "Completed";
        $("#modalFinished").text(modalFinished);
  
      }
      else {
        modalStatus = "Not Completed";
        $(".switchModal").removeClass("moveModal");
        $("#modalFinished").html('<i class="fa fa-question-circle" style="font-size:24px"></i>');
       
      }

     $("#modalStatus").text(modalStatus);

      
     toggleCounter++;

     combineValues(text, toggleValue[i], id, refresh, modalFinished, completedAt);

}


/* Modal */

// Open Modal

function openModal(text, isCompleted, id, completedAt, i, createdAt) {
    modal.style.display = "flex";
  
    modalFinished = completedAt;

    if (isCompleted) {
        modalStatus = "Completed";
    }
    else {
        modalStatus = "Not Completed"; 
    }


// Modal header

var mh = `
<p class="closeModal" onclick="closeModal(47, ${isCompleted},\`` + id + `\`, false)">&times</p>
          
<h3 class="modalTitle" style="text-align: center;
display: block;
margin: 0 auto;
width: 100%; margin-top: 10px;">Update Todo</h3>
`;

$(".modal-header").html(mh);


// Modal Body

mb = `<div class="modalPause">  
<h5 class="pauseDesc">NAME</h5>
<div class="container bg-3 text-center" style="width: 768px;">
<div class="row">
<div class="col-sm-3"> </div>
<div class="col-sm-6">
<textarea id="textarea" oninput="oninputTextarea()" rows=5 style="width: 100%; background: #FFF; border: 2px solid #CCC; color: #000; margin-top: 4px; resize: none;"></textarea>
<p id="textareaError"></p>
    </div>
   
<div class="col-sm-3"> </div>
        </div>
</div>  
 </div>  `;

 // Body part 2

 mb+= ` 
 <div class="modalPause">  
<h5 class="pauseDesc" style="padding-left: 10px">DETAILS</h5>
<div class="container bg-3 text-center" style="width: 768px; height: 85px; padding-bottom: 0px; margin-top: 10px;">
<div class="row">
<div class="col-sm-3"></div>
<div class="col-sm-2">
<p>Status:</p>
</div>
<div class="col-sm-2">
<p id="modalStatus">${modalStatus}</p>
</div>
<div class="col-sm-2">
<div class="outerModal" title="Complete Todo" id="toggleBtn" onclick="completeInModal(47, ${isCompleted},\`` + id + `\`, 'noRefresh', \`` + completedAt + `\`, ${i})" style="margin: 0 auto; text-align: center">
<div class="switchModal"></div>
</div>
    
<div class="col-sm-3"></div>
    </div>
</div>
<div class="row" style="padding-top: 15px;">
<div class="col-sm-3"></div>
<div class="col-sm-2">
<p id="completeAtPar">Created   Completed:</p>
</div>
<div class="col-sm-2">
<p class="modalDetails">${createdAt}</p>
</div>
<div class="col-sm-2">
<p class="modalDetails" id="modalFinished">${modalFinished}</p>
</div>
<div class="col-sm-3"></div>
        </div>
    </div>
</div>
`;



$(".modal-body").html(mb);

if (isCompleted) {
    modalStatus = "Completed";
    $(".switchModal").addClass("moveModal");
    $("#modalFinished").text(modalFinished)
} else {
    modalStatus = "Not Completed";
    $(".switchModal").removeClass("moveModal");
    $("#modalFinished").html('<i class="fa fa-question-circle" style="font-size:24px"></i>');
}


// modal footer

var mf = `<button id="cancelBtn" class="modalBtns" onclick="closeModal(47, ${isCompleted},\`` + id + `\`, false)">Cancel</button>
<button id="updateBtn" class="modalBtns" onclick="combineValues(\`` + text + `\`,${isCompleted},\`` + id + `\`, true, 4,\`` + completedAt + `\`)">Update</button>`; 

    $(".modal-footer").html(mf);

    var textValue = text; // $(`.todoContainer:eq(${todo})`).find(`.title`).html();

    $("textarea").text(textValue);

   }

   // Close Modal

   var modal = document.getElementById('myModal');
  
   function closeModal(text, isCompleted, id, refresh) {
       toggleCounter = 0;
    $("#myModal").fadeOut();
    // when you click cancel return to initial isComploted value (from DB), but don't refresh
    combineValues(text, isCompleted, id, refresh);
   }

   
   // oninput textarea

   function oninputTextarea() {

    $("#textareaError").hide();

   }


/////////////////////////////////////////

   /* Start Page Script */ 

   function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    if (h < 10) {
        h = "0" + h;
    }
    
    $("#clockTitle").html(h + ":" + m + ":" + s);

    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i}; 
    return i;
}

const quotesArray = [
    `"A journey of a thousand miles begins with a single step."
    – Lao Tzu`,
    `"The only impossible journey is the one you never begin."
    – Tony Robbins`,
    `"We are what we repeatedly do. Excellence, then, is not an act but a habit."
    – Aristotle`,
    `"Don’t judge each day by the harvest you reap, but by the seeds that you plant."
    – Robert Louis Stevenson`,
    `"Writing is an exploration. You start from nothing and learn as you go."
    - E. L. Doctorow`
];


const questionsArray = [
"What's next on your mind?",
"What's your plan for today?",
"What do you want to do next?",
"What is your main focus today?",
"What's next on your list?"
];


const arrayOfBackgrounds = [
    "../Resources/img/beachananas.jpeg",
    "../Resources/img/bike.jpeg",
    "../Resources/img/bottle.jpeg",
    "../Resources/img/clouds.jpeg",
    
    "../Resources/img/ferrari.jpeg",
    "../Resources/img/forestroad.jpg",
    "../Resources/img/glasses.jpeg",
    "../Resources/img/guitar.jpg",
    
    "../Resources/img/headphones.jpeg",
    "../Resources/img/jetengine.jpg",
    "../Resources/img/kitten.jpeg",
    "../Resources/img/raspberries.jpeg",
    "../Resources/img/road.jpeg",
    
    "../Resources/img/rope.jpeg",
    "../Resources/img/sandals.jpeg",
    "../Resources/img/searocks.jpeg",
    
    "../Resources/img/thunder.jpeg",
    "../Resources/img/underwater.jpeg",
    "../Resources/img/wing.jpeg",
    "../Resources/img/wolves.jpeg"
];

function changeQuote(num, todos) {

    let randomQuote = '';

    if (num == 0) {
        $("#questionsTitle").css("display", "none");
        $("#quoteTitle").css("display", "block");
         randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
        $("#quoteTitle").text(randomQuote);
    } else {

        if (todos == 0) {
        $("#quoteTitle").text(`You have no unfinished todos`);    
        } else if (todos == 1) {
        $("#quoteTitle").text(`You have ${todos} unfinished todo below`);    
        } else {
        $("#quoteTitle").text(`You have ${todos} unfinished todos below`);
        }

        $("#questionsTitle").css("display", "block");
        randomQuote = questionsArray[Math.floor(Math.random() * questionsArray.length)];
        $("#questionsTitle").text(randomQuote);
    }

}

function changeBackgroundImg() {

    let randImg = arrayOfBackgrounds[Math.floor(Math.random() * arrayOfBackgrounds.length)];

    $("#openingDiv").css({
        "background": `url('${randImg}')`,
        "background-attachment": "fixed",
        "overflow": "hidden",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-size": "cover",
        "-webkit-background-size": "cover",
        "-moz-background-size": "cover",
        "-o-background-size": "cover",
        "opacity": 0.95
    });

}


/* Scrolling Around */ 

$("#chevronDown").click(function() {
    $('html, body').animate({
        scrollTop: $("#containerBg").offset().top
    }, 1000);
  });
  