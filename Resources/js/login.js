
function changeForm(num) {

    let form = document.getElementById("form");

    if (num == 0) {
    
        /* Sign up Form */

        form.innerHTML = `
        
        <form id="signup-form">

        <h2 class="formHeader">Sign Up</h2>

        <input class="loginInput" name="signupUsername" type="text" placeholder="Username" autofocus/>
    
        <input class="loginInput" name="signupEmail" type="text" placeholder="Email"/>   
    
        <input class="loginInput" name="signupPassword" id="pass" type="password" placeholder="Password"/>

        <input class="loginInput" name="confirmPassword" type="password" placeholder="Confirm Password"/>
    <br>
        <input onclick="funky()" class="btn btn-success formBtn" type="submit" id="confirmBtn" value="CONTINUE"/>
    
        <p class="changeForm" onclick="changeForm(1)">Already a member?</p>

    </form>
        
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

$.validator.addMethod( "nowhitespace", function( value, element ) {
   return this.optional( element )
    || /^\S+$/i.test( value );
}, "No white space please.");   


$.validator.addMethod('strongUsername', function(value, element) {
    return this.optional(element) 
      || value.length >= 6
      && /\d/.test(value)
      && /[a-z]/i.test(value);
  }, 'Username must be at least 6 characters long and contain at least one number and one character.')


$.validator.addMethod('strongPassword', function(value, element) {
    return this.optional(element) 
      || value.length >= 8
      && /\d/.test(value)
      && /[a-z]/i.test(value)
      && /[$-/:-?{-~!"^_`\[\]]/.test(value);
  }, 'Password must be at least 8 characters long and contain at least one number, one character and one symbol.')


$("#signup-form").validate({
    rules: {
        signupUsername: {
            required: true,
            nowhitespace: true,
            strongUsername: true,
            maxlength: 24
        },
        signupEmail: {
            required: true,
            email: true
        },
        signupPassword: {
            required: true,
            strongPassword: true,
            nowhitespace: true,
            maxlength: 24
        },
        confirmPassword: {
            required: true,
            equalTo: "#pass",
            nowhitespace: true
        },
        messages: {
            signupEmail: {
                required: "Please enter an email address.",
                email: "Please enter a valid email address."
            }
        }
    }


});

});


function funky() {
    // window.location.href='/home'
}


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

