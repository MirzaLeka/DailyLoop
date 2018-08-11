

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

console.log("T " + text);

let status = '';
let finished = '';

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

<h3 class="title">${data.todos[i].text}</h3>

    </div>

</div>

 <div class="row">
      
 <div class="col-sm-6"><p class="status">Status: ${status}</p></div>
 <div class="col-sm-6"><p class="finished">${finished}</p> </div>

  </div>

        </div>


    <div class="col-sm-3" style="height: 105px;"> 

    <div class="col-sm-4 todoBtnCol">
 <button class="btn todoBtn" title="Update Todo" onclick="openModal(\`` + text + `\`, ${data.todos[i].completed},\`` + id + `\`)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
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

function updateTodo(data, id, refresh) {

    data.text = $("textarea").val();

$.ajax({
url: "/todos/" + id,
data: JSON.stringify(data),
type: 'PATCH',
contentType: 'application/json',
processData: false,
dataType: 'json',
success: function (data) {

if (refresh) {
location.reload();
}

}


});

}

function combineValues(text, isCompleted, id, refresh) {

    var data = {};

    if (typeof(text) === 'string') {
        data.text = text;
        refresh = true;
    }

    if (typeof(isCompleted) === "boolean") {
        data.completed = isCompleted;
        refresh = false;
    }

//alert("REFRESH: " + refresh);

   updateTodo(data, id, refresh);

    
// update (data obj, id)
}



function completeInModal(text, isCompleted, id, refresh) {

    if (isCompleted) {
        isCompleted = false;
    } else {
        isCompleted = true;
    }

 console.log("new value of completed is " + isCompleted);

     combineValues(text, isCompleted, id, refresh);




}




/* Modal */

// Open Modal

function openModal(text, isCompleted, id) {
    modal.style.display = "flex";
    

var mb = ` 
<textarea rows=5 style="width: 100%"></textarea>
<br>
<button class="btn todoBtn" title="Complete Todo" onclick="completeInModal(47, ${isCompleted},\`` + id + `\`, 'noRefresh')"> <i class="fa fa-check" aria-hidden="true"></i></button>`;



$(".modal-body").html(mb);

var mfBtns = `<button class="btn btn-danger" onclick="closeModal()">Cancel</button>
<button class="btn btn-success" onclick="combineValues(\`` + text + `\`,'todoapp',\`` + id + `\`, true)">Update</button>`;

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
   

