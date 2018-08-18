var modalStatus = "";
var modalFinished = '';
var toggleCounter = 0;
var toggleValue;

   $(document).ready(function() {

    getTodos()

});


/* GET TODOS */

function getTodos() {

$.ajax({
 type: "GET",
 url: "/todos",
 success: function(data) {

console.log(data);  

/* Hide info header if array is empty */
if (data.todos.length > 0) {
    $("#info").css({display: "block"});
} else {
    $("#info").css({display: "none"});    
}

var list = '';
var id = '';
var text = '';

for (var i = 0; i < data.todos.length; i++) {

id = data.todos[i]._id.toString();
text = data.todos[i].text.toString();

let status = '';
let finished = '';

var shortenTitle = data.todos[i].text;

var shortenValue = 60;

if (data.todos[i].text.length > shortenValue) {
    shortenTitle = data.todos[i].text.substr(0,shortenValue) + "...";
}

/* Todos list */

if (data.todos[i].completed) {
 status = "Completed";
 finished = "Completed At: " + data.todos[i].completedAt;
 //modalFinished = data.todos[i].completedAt;
 modalStatus = "Completed";
 //$("#modalFinished").text(modalFinished);
 $(`.switch:eq(${i})`).addClass("move");
}
else {
 status = "Not completed";
 //$("#modalFinished").html('<i class="fa fa-question-circle" style="font-size:24px"></i>');
 modalStatus = "Not Completed"; 
 $(`.switch:eq(${i})`).removeClass("move");
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
 <button class="btn todoBtn" title="Update Todo" onclick="openModal(\`` + text + `\`, ${data.todos[i].completed},\`` + id + `\`,\`` + data.todos[i].completedAt + `\`, ${i})"><i class="fa fa-pencil" aria-hidden="true"></i></button>
 </div>
 <div class="col-sm-4 todoBtnCol">
 <div class="outer" title="Complete Todo" onclick='completeTodo(${data.todos[i].completed},\`` + id + `\`, ${i})'>
 <div class="switch"></div>
    </div>   
  </div>        
<div class="col-sm-4 todoBtnCol">
   <button class="btn todoBtn" id="removeTodoBtn" title="Remove Todo" onclick="getTitle(${i})"><i class="fa fa-times" aria-hidden="true"></i></button>
         </div>


    </div>


         
      </div>

 </div>`;


}

$("#listOfTodos").append(list);

for (var i = 0; i <  data.todos.length; i++) {

    if (data.todos[i].completed) {
        $(`.switch:eq(${i})`).addClass("move");
     }
     else {
         $(`.switch:eq(${i})`).removeClass("move");
     }
     
}

 }

});

}


/* POST TODO */


 $("#text").keyup(function(event){
if(event.keyCode == 13){
 submit();
}
});
 

function submit() {

 var text = $("#text").val();

 text =  adjustString(text);

var data = {
 "text": text
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

function getTitle(counter) {

var todoTitle =  $(`.todoContainer:eq(${counter})`).find(`.title`).html();

 $.ajax({
 url: '/todos/' + todoTitle,
 type: 'DELETE',
 success: function(result) {
 location.reload();
        }
    });

}

// /* DELETE TODO old way */

// function deleteTodo() {

//  var deleteText = $("#deleteText").val();

//  deleteText = adjustString(deleteText);

//  $.ajax({
//  url: '/todos/' + deleteText,
//  type: 'DELETE',
//  success: function(result) {
//  location.reload();
//          }
//     });
// }

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

function completeTodo(isCompleted, someId, num) {

 if (isCompleted) {
     isCompleted = false;
     $(`.switch:eq(${num})`).removeClass("move");
 } else {
     isCompleted = true;
     $(`.switch:eq(${num})`).addClass("move");
 }

var data = {
 completed: isCompleted
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

function updateTodo(text, completed, id, refresh) {

    text = $("textarea").val();

var data = {
    text,
    completed
};

if (refresh) {

$.ajax({
url: "/todos/" + id,
data: JSON.stringify(data),
type: 'PATCH',
contentType: 'application/json',
processData: false,
dataType: 'json',
success: function (data) {

$("#myModal").fadeOut();
location.reload();

            }
        });

    }

}

var data = {};

function combineValues(text, isCompleted, id, refresh) { 

    if (typeof(text) === 'string') {
        data.text = text;
        refresh = true;
    }

   else if (typeof(text) === "number") {
        data.completed = isCompleted;
        refresh = false;
    }

    updateTodo(data.text, data.completed, id, refresh);

}


function completeInModal(text, isCompleted, id, refresh, completedAt, num) {


    // console.log("Inside completeInModal: " + completedAt)
    // console.log("Inside: isComplete: " + isCompleted);

 //    $(".switch").removeClass("move"); 

//  if ($( ".switch" ).hasClass( "move" )) {
// console.log("IT HAD CLASS");
//     $(".switch").removeClass("move"); 
// }


    if (toggleCounter == 0) {
        toggleValue = !isCompleted;
      }
      else {
        toggleValue = !toggleValue;
    
      }

      var d = new Date();

    //  $("#toggleBtn").text(toggleValue);

    // BECAUSE IT'S ONLY ONE IN MODAL, PER MODAL, THAT GETS CREATED ONCE YOU EXECUTE HTML() amd they all have the same id

      if (toggleValue) {
        // if ($( ".switch" ).hasClass( "move" )) {
        //     console.log("hasclass true");
        //  $(".switch").removeClass("move"); 
        //     } 
        //$(this).find(`.switch`).addClass("move");  
         //$(`.switch:eq(${num})`).addClass("move");  
         $(`#switchId${num}`).addClass("move");
        modalStatus = "Completed";
        modalFinished = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        $("#modalFinished").html(modalFinished);
  //      $("#completedAtRow").show();
      }
      else {
        // if ($( ".switch" ).hasClass( "move" )) {
        //     console.log("hasclass false");
        // $(".switch").removeClass("move"); 
        // }
        //$(`.switch:eq(${num})`).removeClass("move"); 
        //$(this).find(`.switch`).removeClass("move");  
        $(`#switchId${num}`).removeClass("move");
        modalStatus = "Not Completed";
      //  modalFinished = '∅';
   //     $("#completedAtRow").hide();
   $("#modalFinished").html('<i class="fa fa-question-circle" style="font-size:24px"></i>');

      }

     $("#modalStatus").text(modalStatus);
      
    toggleCounter++;

     combineValues(text, toggleValue, id, refresh);

}


/* Modal */

// Open Modal

function openModal(text, isCompleted, id, completedAt, num) {
    modal.style.display = "flex";

 //   $(".switch").removeClass("move"); 

    // if (completedAt == null) {
    //     modalFinished = '/';
    // } else {
    //     modalFinished = completedAt;    
    // }

    modalFinished = completedAt;

 //   $(".switch").addClass("move");



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

var mb;

mb = `<div class="modalPause">  

<h5 class="pauseDesc">NAME</h5>

<div class="container bg-3 text-center" style="width: 768px;">
<div class="row">

<div class="col-sm-3"> </div>

<div class="col-sm-6">

<textarea id="textarea" rows=5 style="width: 100%; background: #FFF; border: 2px solid #CCC; color: #000; margin-top: 4px;"></textarea>

    </div>

   

<div class="col-sm-3"> </div>

        </div>

</div>  
 </div>  `;

//  if (isCompleted) {
//     modalFinished = completedAt;
//     modalStatus = "Completed";
//  //  $(".switch").addClass("move");
// //        $("#completedAtRow").show();
// }
// else {
//     modalFinished = '∅';
//     modalStatus = "Not Completed"; 
// //    $(".switch").removeClass("move");
// //      $("#completedAtRow").hide();
// }

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
    <div class="outer" style="margin-top: -7px" title="Complete Todo" id="toggleBtn" onclick="completeInModal(47, ${isCompleted},\`` + id + `\`, 'noRefresh', \`` + completedAt + `\`, ${num})" style="margin: 0 auto; text-align: center">
        <div class="switch" id="switchId${num}"></div>
    </div>

    
<div class="col-sm-3"></div>

    </div>

</div>

<div class="row" id="completedAtRow" style="padding-top: 15px;">

<div class="col-sm-3"></div>

<div class="col-sm-2">
<p id="completeAtPar">Completed At:</p>
</div>


<div class="col-sm-2">
<p class="modalDetails" id="modalFinished">${modalFinished}</p>
</div>

<div class="col-sm-5"></div>


</div>

</div>


</div>

`;

//mb+=`<div style="height: 2px; width: 100%; background: blue"> </div>`




$(".modal-body").html(mb);

// if ($( ".switch" ).hasClass( "move" )) {
//     console.log("hasclass true");
//  $(".switch").removeClass("move"); 
//     }

if (isCompleted) {
    modalFinished = completedAt;
    modalStatus = "Completed";
    $("#modalFinished").text(modalFinished)
   $(".switch").addClass("move");
//        $("#completedAtRow").show();
}
else {
    modalFinished = '∅';
    modalStatus = "Not Completed"; 
    $(".switch").removeClass("move");
    $("#modalFinished").html('<i class="fa fa-question-circle" style="font-size:24px"></i>');
//      $("#completedAtRow").hide();
}

// if (isCompleted) {
//     $(".switch").addClass("move");
// } else {
//     $(".switch").removeClass("move");
// }

/* ADD TO (regarding todo.js) SERVER.JS 

<script>
function myFunction() {

var d = new Date();

    var str = d.toString();
    
    var res = str.substr(4,20);
 
    document.getElementById("demo").innerHTML = res;
}
</script>

*/


// modal footer

var mf = `<button id="cancelBtn" class="modalBtns" onclick="closeModal(47, ${isCompleted},\`` + id + `\`, false)">Cancel</button>
<button id="updateBtn" class="modalBtns" onclick="combineValues(\`` + text + `\`,${isCompleted},\`` + id + `\`, true)">Update</button>`;

    $(".modal-footer").html(mf);

    var textValue = text; // $(`.todoContainer:eq(${todo})`).find(`.title`).html();

    $("textarea").text(textValue);

   }


   // Close Modal

   var modal = document.getElementById('myModal');
  
   function closeModal(text, isCompleted, id, refresh) {
    $("#myModal").fadeOut();
    if (!isCompleted) {
       $(".switch").removeClass("move"); 
    }
    else {
        $(".switch").addClass("move"); 
    }
    // when you click cancel return to initial isComploted value (from DB), but don't refresh
    combineValues(text, isCompleted, id, refresh);
   }
   

   // Close modal when you click anywhere on window
//    window.onclick = sameer(event) {
//        if (event.target == modal) {
//          $("#myModal").fadeOut();       
//        }
//    }


// $(".outer").click(function() {

  

  //  $(".switch").toggleClass("move");
   

// });

// function toggleBtnColor() {

//     $(".switch").toggleClass("move");

// }
