
    /* Default values of navbarLi */

      let limit = "No limit";
      let display = "Display all";
      let sort = 'Date created';


      /* Scrolling back */

      $(window).scroll(function() {
        var hT = $('#info').offset().top + 50, // since .todoContainer can be removed
            hH = $('#info').outerHeight(), // I'm using #info + 50px scolled down
            wH = $(window).height(),
            wS = $(this).scrollTop();
         
        if (wS >= (hT+hH-wH)){
          $("#scrollBack").fadeIn();
          $("#logoutHeader").css("color", "#007BFF");

          $("#logoutHeader").on('mouseenter',  function () {
            $(this).css("color", "#0064d1");
          });
    
          $("#logoutHeader").on('mouseleave',  function () {
            $(this).css("color", "#007BFF");
          });
    


        } else {
           $("#scrollBack").fadeOut();
           $("#logoutHeader").css("color", "#444");

           $("#logoutHeader").on('mouseenter',  function () {
            $(this).css("color", "#000");
          });
    
          $("#logoutHeader").on('mouseleave',  function () {
            $(this).css("color", "#444");
          });
    
        }
     });


     $("#scrollBack").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
     });

     /* Scrolling using session storage */

     let scrollPosition = '';

     let addDarkSelect;

     let idsArr = [];

    

    $(document).ready(function() {

     scrollPosition = sessionStorage.getItem('scrollPosition');

     if (scrollPosition != null) {
        $('html, body').animate({
            scrollTop: scrollPosition
        }, 100);
     }
  
    getUser(); 
    startTime();
    changeBackgroundImg();
    getTodos();

    limiting();
    sorting();
    displaying();

  
});


/* GET TODOS */

function getTodos() {

    let cookie = getCookie();

    let token = cookie[0].substr(9,999).toString();
    token = token.trim();

$.ajax({
 type: "GET",
 url: "/todos",
 headers: {
     'x-auth': token
 },
 success: function(data) {

    if (data.todos.length == 0) {
        sessionStorage.removeItem("scrollPosition");
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


var list = '';
var id = '';
var text = '';
var description = '';

for (var i = 0; i < data.todos.length; i++) {

id = data.todos[i]._id.toString();
text = data.todos[i].text.toString();
description = data.todos[i].description;

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

list += `<div class="container todoContainer" onclick="addIdToArray(\`` + data.todos[i]._id + `\`)">
    
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
 <button class="btn todoBtn" title="Update Todo" onclick="openModal(\`` + text + `\`, \`` + description + `\`, ${data.todos[i].completed},\`` + id + `\`,\`` + data.todos[i].completedAt + `\`, ${i}, \`` + data.todos[i].createdAt + `\`)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
 </div>
 <div class="col-sm-4 todoBtnCol">
 
 <div class="outer" title="Complete Todo" onclick='completeTodo(${data.todos[i].completed},\`` + id + `\`, ${i})'>
 <div class="switch"></div>
 </div>
  </div>        
<div class="col-sm-4 todoBtnCol">
   <button class="btn todoBtn" title="Remove Todo" id="removeTodoBtn" onclick="deleteTodo(\`` + id + `\`, ${i}, ${data.todos.length})"><i class="fa fa-times" aria-hidden="true"></i></button>
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


            // GET DARKSELECT CLASS

      addDarkSelect =  $(".todoContainer");
      
      addDarkSelect.on("click", function() {
        $(this).toggleClass("darkSelect");
      })


    /* Scroll using session storage */ 

    $(".outer, .todoBtn").click(function(e) {
        let currentScrollPosition =  $(window).scrollTop();
        sessionStorage.setItem('scrollPosition', currentScrollPosition);

        // Prevent darkSelect
        e.stopPropagation(); 
        $(".todoContainer").removeClass("darkSelect");
        idsArr = []; 
       

    });

 }

});

}


/* POST TODO */
 
function submit() {

 var text = $("#inputTitle").val();

 if (text == '') {
    $("#submitTodoError").show();
    $("#submitTodoError").text("Please insert text to submit todo.");
    return;
 } 
  if (text.length > 200) {
    $("#submitTodoError").show();
    $("#submitTodoError").text("Please keep todo title no longer than 200 characters.");
    return;
 }

var data = {
 "text": text
}

sessionStorage.removeItem("scrollPosition");

    let cookie = getCookie();
        
    let token = cookie[0].substr(9,999).toString();
    token = token.trim();

$.ajax({
 type: "POST",
 url: "/todos",
 contentType : 'application/json',
 dataType : 'json',
 data : JSON.stringify(data),
 headers: {
    'x-auth' : token
 },
 success: function(data) {
  
    document.getElementById("inputTitle").value = ''; // remove input value when you submit

    // location.reload();

    $(".todoContainer").remove();
    getTodos();

 }

});


}

function clearSubmitTodoError() {
    $("#submitTodoError").hide();
}



/* DELETE TODO   */

var toggleCounterThree = 0;
var newLength;

function deleteTodo(id, counter, length) {

    if (toggleCounterThree == 0) {
        newLength = length;
    } else {
        newLength = newLength;
    }

    let cookie = getCookie();

    let token = cookie[0].substr(9,999).toString();
    token = token.trim();

 $.ajax({
 url: '/todos/' + id,
 type: 'DELETE',
 headers: {
    "x-auth" : token
 },
 success: function() {
//  location.reload();
$(".todoContainer").eq(counter).hide();
newLength--;
console.log(newLength);

if (newLength == 0) {
    backToNormal();
    toggleCounterThree = 0;
    }

        }
    });

    toggleCounterThree++;

}



/* DELETE ALL TODOS */

function deleteAllTodos() {

 sessionStorage.removeItem("scrollPosition");

 let cookie = getCookie();

 let token = cookie[0].substr(9,999).toString();
 token = token.trim();

 $.ajax({
 url: '/todos',
 type: 'DELETE',
 headers: {
     "x-auth" : token
 },
 success: function() {

 }


});

// window.location.reload();
backToNormal();
}


/* COMPLETE TODO */

function completeTodo(isCompleted, someId, i) {

   let completedAt = '';

 if (isCompleted) {
     console.log("IF")
     isCompleted = false;
     $(`.switch:eq(${i})`).removeClass("move");
     completedAt = null;

 } else {
    console.log("else")
     isCompleted = true;
     $(`.switch:eq(${i})`).addClass("move");

     var d = new Date();
     var str = d.toString();
     str = str.substr(4,20);
     completedAt = str;

 }

var data = {
 completed: isCompleted,
 completedAt
};

let cookie = getCookie();

let token = cookie[0].substr(9,999).toString();
token = token.trim();


$.ajax({
url: "/todos/" + someId,
data: JSON.stringify(data),
type: 'PATCH',
contentType: 'application/json',
processData: false,
dataType: 'json',
headers: {
    'x-auth' : token
},
success: function (data) {
location.reload();
// $(".todoContainer").eq(i).fadeOut();
// getTodos();
}


});

}


/* UPDATE ONE TODO */

function updateTodo(text, description, completed, id, refresh, keepTheDate) {

    var errorCounter = 0;

    text = $("#todoTitleInModal").val();
    text = text.replace(/"/g, "'"); 
    text = text.trim(); 

    description = $("textarea").val();
    description = description.replace(/"/g, "'"); 
    description = description.trim(); 


    if (text == '') {
        $("#todoTitleInModalError").css("display", "block");
        $("#todoTitleInModalError").text("Title must have at least one character");
        errorCounter++;
    }

    else if (text.length > 200) {
        $("#todoTitleInModalError").show();
        $("#todoTitleInModalError").text("Exceeded maximum number of characters (200)");
        errorCounter++;
    }

    if (description.length > 2000) {
        $("#textareaError").show();
        $("#textareaError").text("Exceeded maximum number of characters (2000)");
        errorCounter++;
    }

var data = {
    text,
    description,
    completed,
    completedAt: keepTheDate
};

let cookie = getCookie();

let token = cookie[0].substr(9,999).toString();
token = token.trim();

if (refresh && errorCounter == 0) {

$.ajax({
url: "/todos/" + id,
data: JSON.stringify(data),
type: 'PATCH',
contentType: 'application/json',
processData: false,
dataType: 'json',
headers: {
    'x-auth' : token
},
success: function (data) {

$("#myModal").fadeOut();
location.reload();

            }
        });

    }

}

var data = {};

var keepTheDate = null;
var newDate = '';

function combineValues(text, description, isCompleted, id, refresh, modalFinished, completedAt) { 

   
     if (typeof(modalFinished) != 'string' && keepTheDate != null) {
        keepTheDate = keepTheDate;
        
     }
         else  if (typeof(modalFinished) === 'string') {
         keepTheDate == modalFinished;
         
     }  else {
         keepTheDate = completedAt;
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

    if (typeof(text) === "number") {
        data.completed = isCompleted;
        refresh = false;

        if (isCompleted) {
            keepTheDate = modalFinished;
        } else {
            keepTheDate = null;
        }
    }

     updateTodo(data.text, description, data.completed, id, refresh, keepTheDate);

}

  
var modalStatus = "";
var modalFinished = '';
var toggleCounter = 0;
var toggleValue = [];

function completeInModal(text, description, isCompleted, id, refresh, completedAt, i) {

    if (toggleCounter == 0) {
        toggleValue[i] = !isCompleted;
      }
      else {
        toggleValue[i] = !toggleValue[i];
      }

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

     combineValues(text, description, toggleValue[i], id, refresh, modalFinished, completedAt);

}


/* Modal */

// Open Modal

function openModal(text, description, isCompleted, id, completedAt, i, createdAt) {
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


// Modal Body -- NAME

mb = `<div class="modalPause">  
<h5 class="pauseDesc">NAME</h5>
<div class="container bg-3 text-center" style="width: 768px;">
<div class="row">
<div class="col-sm-3"> </div>
<div class="col-sm-6">
<input id="todoTitleInModal" oninput="oninputTodoTitleInModal()" autofocus style="width: 100%; background: #FFF; border: 2px solid #CCC; color: #000; margin-top: 4px;" />
<p id="todoTitleInModalError"></p>
    </div>
   
<div class="col-sm-3"> </div>
        </div>
</div>  
 </div>  `;


// Modal Body -- DESCRIPTION

mb += `<div class="modalPause">  
<h5 class="pauseDesc">DESCRIPTION</h5>
<div class="container bg-3 text-center" style="width: 768px;">
<div class="row">
<div class="col-sm-3"> </div>
<div class="col-sm-6">
<textarea id="textarea" placeholder="Optional" oninput="oninputTextarea()" rows=5 style="width: 100%; background: #FFF; border: 2px solid #CCC; color: #000; margin-top: 4px; resize: none;"></textarea>
<p id="textareaError"></p>
    </div>
   
<div class="col-sm-3"> </div>
        </div>
</div>  
 </div>  `;

 // Body part 2

 mb+= ` 
 <div class="modalPause">  
<h5 class="pauseDesc">DETAILS</h5>
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
<div class="outerModal" title="Complete Todo" id="toggleBtn" onclick="completeInModal(47, \`` + description + `\` , ${isCompleted},\`` + id + `\`, 'noRefresh', \`` + completedAt + `\`, ${i})" style="margin: 0 auto; text-align: center">
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
<button id="updateBtn" class="modalBtns" onclick="combineValues(\`` + text + `\`, \`` + description + `\`,${isCompleted},\`` + id + `\`, true, 4,\`` + completedAt + `\`)">Update</button>`; 

    $(".modal-footer").html(mf);

    var textValue = text; 

    $("textarea").text(description);
    $("#todoTitleInModal").val(textValue);

   }

   // Close Modal

   var modal = document.getElementById('myModal');
  
   function closeModal(text, isCompleted, id, refresh) {
       toggleCounter = 0;
    $("#myModal").fadeOut();
  
    combineValues(text, isCompleted, id, refresh); 
   }

   
   // oninput textarea

   function oninputTextarea() {

    $("#textareaError").hide();

   }

   function oninputTodoTitleInModal() {

    $("#todoTitleInModalError").hide();

   }


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
    `“A journey of a thousand miles begins with a single step.”
    – Lao Tzu`,
    `“The only impossible journey is the one you never begin.”
    – Tony Robbins`,

    `“We are what we repeatedly do. Excellence, then, is not an act but a habit.”
    – Aristotle`,
    `“Don’t judge each day by the harvest you reap, but by the seeds that you plant.”
    – Robert Louis Stevenson`,

    `“Writing is an exploration. You start from nothing and learn as you go.”
    – E. L. Doctorow`,
    `“Adapt what is useful, reject what is useless, and add what is specifically your own.”
    – Bruce Lee`,

    `“Start where you are. Use what you have. Do what you can.” 
    – Arthur Ashe`,
    `“Good, better, best. Never let it rest. 'Til your good is better and your better is best.” 
    – St. Jerome`,

    `“If you can dream it, you can do it.” 
    – Walt Disney`,
    `“Setting goals is the first step in turning the invisible into the visible.” 
    – Tony Robbins`,

    `“A creative man is motivated by the desire to achieve, not by the desire to beat others.” 
    – Ayn Rand`,
    `“He who does not live in the way of his beliefs starts to believe in the way he lives.”
    – Umar ibn Al-Khattab`,
];


const questionsArray = [
"What's next on your mind?",
"What's your plan for today?",
"What do you want to do next?",
"What is your main focus today?",
"What's next on your list?"
];


const arrayOfBackgrounds = [

    "../Resources/img/cover/cloudscity.jpeg", // just in case date gets to 0 someday :|
    
    "../Resources/img/cover/apple.jpeg",
    "../Resources/img/cover/beachananas.jpeg",
    "../Resources/img/cover/beachcity.jpeg",
    "../Resources/img/cover/bike.jpeg",
    "../Resources/img/cover/bulb.jpeg",
    
    "../Resources/img/cover/boat.jpg",
    "../Resources/img/cover/bottle.jpeg",
    "../Resources/img/cover/cherries.jpeg",
    "../Resources/img/cover/chess.jpeg",
    "../Resources/img/cover/clouds.jpeg",
    
    "../Resources/img/cover/ferrari.jpeg",
    "../Resources/img/cover/forestroad.jpg",
    "../Resources/img/cover/glasses.jpeg",
    "../Resources/img/cover/guitar.jpg",
    "../Resources/img/cover/headphones.jpeg",

    "../Resources/img/cover/highway.jpeg",
    "../Resources/img/cover/home.jpeg",
    "../Resources/img/cover/jetengine.jpg",
    "../Resources/img/cover/kitten.jpeg",
    "../Resources/img/cover/logs.jpeg",

    "../Resources/img/cover/match.jpg",
    "../Resources/img/cover/parkedinwild.jpeg",
    "../Resources/img/cover/road.jpeg",
    "../Resources/img/cover/rope.jpeg",
    "../Resources/img/cover/sandals.jpeg",

    "../Resources/img/cover/searocks.jpeg",
    "../Resources/img/cover/skynight.jpeg",
    "../Resources/img/cover/thunder.jpeg",
    "../Resources/img/cover/underwater.jpeg",
    "../Resources/img/cover/wing.jpeg",
    "../Resources/img/cover/wolves.jpeg"
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

    // let randImg = arrayOfBackgrounds[Math.floor(Math.random() * arrayOfBackgrounds.length)];

    let today = new Date().getDate();

    $('#openingDiv').fadeTo(500, 0.5, function()   {
   
        $(this).css({
            "background": `url('${arrayOfBackgrounds[today]}')`,
            "background-attachment": "fixed",
            "overflow": "hidden",
            "background-position": "center",
            "background-repeat": "no-repeat",
            "background-size": "cover",
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover"
        });

    }).fadeTo(500, 1);

}


/* Scrolling Around */ 

$("#scrollDown").click(function() {
    $('html, body').animate({
        scrollTop: $("#containerBg").offset().top
    }, 1000);
});


/* Navbar Li Inner Ul lists */ 


function limiting() {
  
    const limitArray = ["No limit", 1, 3, 5, 10, 15, 20];
  
      let addLimit = '';
      limitArray.forEach((lim, i) => {
        addLimit += `
      <label class="radio">
      <input class="limitRadio"  name="limit" type="radio">
      <span style="font-weight: 100; text-align: center;">${lim}</span>
      </label>
    `;
      });
  
    $("#limitUl").append(addLimit);
  
    $(".limitRadio:eq(0)").attr('checked', true);
  
  
        /* Limit search */
  
        $(".limitRadio").click(function() {
  
        limit = $(this).parent(".radio").text();
        limit = limit.trim();  
  
        search();
    });
  
  
  
  }
  
  
  function sorting() {
  
        /* Sort documents */
  
        $(".sortRadio").click(function() {
    
      sort = $(this).parent(".radio").text();
      sort = sort.trim();  
  
      search();
  });
  
  
  }
  
  function displaying() {
    
    const displayArray = ["All", "Completed", "Not completed"];
  
      let addDisplay = '';
      displayArray.forEach((dis, i) => {
      addDisplay += `
      <label class="radio">
                <input class="displayRadio" name="display" type="radio">
                <span style="font-weight: 100; text-align: center;">${dis}</span>
              </label>
      `;
    });
  
    $("#displayUl").append(addDisplay);
  
    $(".displayRadio:eq(0)").attr('checked', true);
  
      
          /* Display documents */
  
        $(".displayRadio").click(function() {
  
      display = $(this).parent(".radio").text();
      display = display.trim();  
  
      if (display == "Not completed") {
        $(".sortCompleted").attr("disabled",true);
        $(`.labelCompleted`).css({ "cursor": "default" });
        $(".labelCompleted").hover(  function () {
          $(this).css("background", "#222");
        });
  
      } else {
        $(".sortCompleted").attr("disabled",false);
        $(`.labelCompleted`).css({ "cursor": "pointer" });
  
        $(".labelCompleted").on('mouseenter',  function () {
          $(this).css("background", "#007BFF");
        });
  
        $(".labelCompleted").on('mouseleave',  function () {
          $(this).css("background", "#222");
        });
  
      }
  
      search();
  
      });
  
  }
  

    /* Fade in / out navbar inner lists */
   
$(".navbarLi").on('mouseenter', function() {
    $(this).find(".innerUl").fadeIn();
    });
    
    $(".navbarLi").on('mouseleave', function() {
    $(this).find(".innerUl").fadeOut();
    });
    


/* Search Todos */


function search() {

    let cookie = getCookie();

    let token = cookie[0].substr(9,999).toString();
    token = token.trim();

    // for now 
    idsArr = []; 

    let text = $(".searchTodosForm").val();

    if (text == '') {
      text = ".";
    }


      $.ajax({
        type: "GET",
        url: `/todos/${text}/${display}/${limit}/${sort}/`,
        headers: {
            "x-auth" : token
        },
        success: function (data) {

            var list = ''; // align list, I think
            var id = '';
            var text = '';
            var description = '';
            
            for (var i = 0; i < data.todos.length; i++) {
            
            id = data.todos[i]._id.toString();
            text = data.todos[i].text.toString();
            description = data.todos[i].description;
            
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
            
            list += `<div class="container todoContainer" onclick="addIdToArray(\`` + data.todos[i]._id + `\`)">
                
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
             <button class="btn todoBtn" title="Update Todo" onclick="openModal(\`` + text + `\`, \`` + description + `\`, ${data.todos[i].completed},\`` + id + `\`,\`` + data.todos[i].completedAt + `\`, ${i}, \`` + data.todos[i].createdAt + `\`)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
             </div>
             <div class="col-sm-4 todoBtnCol">
             
             <div class="outer" title="Complete Todo" onclick='completeTodo(${data.todos[i].completed},\`` + id + `\`, ${i})'>
             <div class="switch"></div>
             </div>
              </div>        
            <div class="col-sm-4 todoBtnCol">
               <button class="btn todoBtn" title="Remove Todo" id="removeTodoBtn" onclick="deleteTodo(\`` + id + `\`, ${i}, ${data.todos.length})"><i class="fa fa-times" aria-hidden="true"></i></button>
                     </div>
                </div>
                     
                  </div>
             </div>`;
             
            }

            // When you search you remove all previous todos and replace with the new ones that fit the search
            $(".todoContainer").remove();
            $("#listOfTodos").append(list);


            addDarkSelect = $(".todoContainer");

            addDarkSelect.on("click", function() {
                $(this).toggleClass("darkSelect");
              });

                  /* Scroll using session storage */ 

                $(".outer, .todoBtn").click(function(e) {
                    let currentScrollPosition =  $(window).scrollTop();
                    sessionStorage.setItem('scrollPosition', currentScrollPosition);

                    // Prevent darkSelect
                    e.stopPropagation(); 
                    $(".todoContainer").removeClass("darkSelect");
                    idsArr = []; 

                });
            
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


    /* ENTER KEY */

    // Posting todos

 $("#inputTitle").keyup(function(event){
    if(event.keyCode == 13){
     submit();
    }
    });

    // Searching todos

    $(".searchTodosForm").keyup(function(event){
        if(event.keyCode == 13){
         search();
        }
        });



        /* SELECT TODOS */ 

        let addIdToArray = (id) => {
            
            if ( idsArr.includes(id) ) {
                idsArr.splice(idsArr.findIndex(index => index == id)); // if element is in array, find index & remove element  
            } else {
                idsArr.push(id);    // else push it to array
            }
    
        }

        /* DELETE KEY */

        function KeyPressCheck(event){

            if (event.keyCode == 44) {

                if ( addDarkSelect.hasClass("darkSelect") ) {

                    let currentScrollPosition =  $(window).scrollTop();
                    sessionStorage.setItem('scrollPosition', currentScrollPosition);

                    let cookie = getCookie();

                    let token = cookie[0].substr(9,999).toString();
                    token = token.trim();

                   $.ajax({
                    url: '/todos/' + idsArr,
                    type: 'DELETE',
                    headers: {
                        'x-auth' : token
                    },
                    success: function() {
                    location.reload();
                           }
                       });

                    

                } 
                

            }

         }

/////////////////////////////////////////////////////////////////

    function getCookie()  {

    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        return parts.pop().split(";").shift();
        } 
    return parts;

    }


    function getUser() {

        let cookie = getCookie();
        
        let token = cookie[0].substr(9,999).toString();
        token = token.trim();
    
    $.ajax({
        type: "GET",
        url : "/users/me",
        headers: {
             "x-auth" : token
        },
        success: function (data) {
            document.querySelector("#helloTitle").textContent = "Hello " + data.username;
        }
    
    });
    
    
    }


    // Log out user

    let logout = () => {

        let cookie = getCookie();

        let token = cookie[0].substr(9,999).toString();
        token = token.trim();

        $.ajax({
        url: '/users/me/token',
        type: 'DELETE',
        headers: {
            "x-auth" : token
       },
        success: function() { window.location.href = "/"; }   
            });
              
       }


       // Turn everything back to normal, like when you reload the brwoser

       let backToNormal = () => {

        $("html, body").animate({scrollTop: 0}, 1000);
        changeQuote(0,1);
        $("#inputTitle").attr("placeholder", "Submit your first todo");
        $("#submitTodoError").hide();
        $(".notYet").fadeOut(1000);

       }