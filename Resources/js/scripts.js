

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

if (data.todos[i].text.length > 50) {
    shortenTitle = data.todos[i].text.substr(0,50) + "...";
}

if (data.todos[i].completed) {
 status = "Completed";
 finished = "Completed At: " + data.todos[i].completedAt;
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
      
 <div class="col-sm-6"><p class="status">Status: ${status}</p></div>
 <div class="col-sm-6"><p class="finished">${finished}</p> </div>

  </div>

        </div>


    <div class="col-sm-3" style="height: 105px;"> 

    <div class="col-sm-4 todoBtnCol">
 <button class="btn todoBtn" title="Update Todo" onclick="openModal(\`` + text + `\`, ${data.todos[i].completed},\`` + id + `\`,\`` + data.todos[i].completedAt + `\`)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
 </div>
 <div class="col-sm-4 todoBtnCol">
         <div class="btn todoBtn" title="Complete Todo" onclick='completeTodo(${data.todos[i].completed},\`` + id + `\`)'><i class="fa fa-check" aria-hidden="true"></i></div>    
  </div>        
<div class="col-sm-4 todoBtnCol">
   <button class="btn todoBtn" title="Remove Todo" onclick="getTitle(${i})"><i class="fa fa-times" aria-hidden="true"></i></button>
         </div>


    </div>


         
      </div>

 </div>`;
 
}

$("#listOfTodos").append(list);

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

function completeTodo(isCompleted, someId) {

 if (isCompleted) {
     isCompleted = false;
 } else {
     isCompleted = true;
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

$.ajax({
url: "/todos/" + id,
data: JSON.stringify(data),
type: 'PATCH',
contentType: 'application/json',
processData: false,
dataType: 'json',
success: function (data) {

if (refresh) {
$("#myModal").fadeOut();
location.reload();
}

}


});

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


  
var modalStatus = "";
var modalFinished = '';

function completeInModal(text, isCompleted, id, refresh, completedAt) {

    console.log("Inside completeInModal: " + completedAt)

    if (isCompleted) {
        isCompleted = false;
        modalStatus = "Not Completed";
        modalFinished = '';
    } 
    
    else {
        isCompleted = true;
        modalStatus = "Completed";
        modalFinished = completedAt;
    }

    $("#modalStatus").text("Status: " + modalStatus);
    modalFinished = "Completed At: " + completedAt;

     combineValues(text, isCompleted, id, refresh);

}




/* Modal */

// Open Modal

function openModal(text, isCompleted, id, completedAt) {
    modal.style.display = "flex";
  
    console.log(completedAt);

    if (isCompleted) {
        modalStatus = "Completed";
        modalFinished = "Completed At: " + completedAt;
    }
    else {
        modalStatus = "Not Completed"; 
        modalFinished = '';
    }

var mb = ` 
<textarea id="textarea" rows=7 style="width: 100%; background: #232A32; border: 3px solid #007BFF; color: #FFF"></textarea>
<br>
<button class="btn" title="Complete Todo" onclick="completeInModal(47, ${isCompleted},\`` + id + `\`, 'noRefresh', \`` + completedAt + `\`)">Complete</button>


<div>
<p id="modalStatus" style="float: left; padding-left: 20%";>Status: ${modalStatus}</p>
<p id="modalFinished" style="float: right; padding-right: 20%;">${modalFinished}</p>
</div>

 </div>

</div>

`;

/*

status: ....                "completed btn"
completion at: ... ... .. .. ... ... ... */



$(".modal-body").html(mb);

var mfBtns = `<button id="cancelBtn" class="modalBtns" onclick="closeModal()">Cancel</button>
<button id="updateBtn" class="modalBtns" onclick="combineValues(\`` + text + `\`,${isCompleted},\`` + id + `\`, true)">Update</button>`;

    $(".modal-footer").html(mfBtns);

    var textValue = text; // $(`.todoContainer:eq(${todo})`).find(`.title`).html();

    $("textarea").text(textValue);

   }


   // Close Modal

   var modal = document.getElementById('myModal');
  
   function closeModal() {
    $("#myModal").fadeOut();
   }
   

   // Close modal when you click anywhere on window
   window.onclick = function(event) {
       if (event.target == modal) {
         $("#myModal").fadeOut();       
       }
   }
   

