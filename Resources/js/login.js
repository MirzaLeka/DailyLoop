
function changeForm(num) {

    let form = document.getElementById("form");

    if (num == 0) {
    
        /* Sign up Form */

        form.innerHTML = `
        
        <h2 class="formHeader">Sign Up</h2>
    
        <input class="loginInput" type="text" placeholder="Username" id="signupUsername" autofocus required/>
        <p class="error" id="errorUsername"></p>

        <input class="loginInput" type="email" placeholder="Email" id="signupEmail" required/>
        <p class="error" id="errorEmail"></p>

        <input class="loginInput" type="password" placeholder="Password" id="signupPassword" required/>
        <p class="error" id="errorPassword"></p>

        <button class="btn btn-success formBtn" onclick="signup()">CONFIRM</button>

        <p class="changeForm" onclick="changeForm(1)">Already a member?</p>
        
        `;

    } else {

        /* Sign in Form */

        form.innerHTML = `
        
        <h2 class="formHeader">Sign In</h2>
    
        <input class="loginInput" type="email" placeholder="Email" autofocus required/>

        <input class="loginInput" type="password" placeholder="Password" required/>

        <button class="btn btn-primary formBtn" id="loginBtn">LOG IN</button>

        <p class="changeForm" onclick="changeForm(0)">Not a member?</p>
        
        `;

    }

}


$(function() {

$("#signup-form").validate({
    rules: {
        signupUsername: {
            required: true
        },
        signupEmail: {
            required: true,
            email: true
        },
        signupPassword: {
            required: true
        }
    }


});

});


// function signup() {

//     let username = document.getElementById("signupUsername").value;
//     let usernameError = document.getElementById("errorUsername");

//     if (username == "") {
//         usernameError.style.display = "block";
//         usernameError.innerHTML = "Something"
//     }

// // if member already exists print error

// }


// function clearErrors() {

// }


// function login() {

// // if member doesn't exist print error

// }

