
function changeForm(num) {

    let form = document.getElementById("form");

    if (num == 0) {
    
        /* Sign up Form */

        form.innerHTML = `
        
        <form class="signup-form" onsubmit="register();return false">

        <h2 class="formHeader">Sign Up</h2>

        <input class="loginInput" name="signupUsername" type="text" placeholder="Username" autofocus/>
    
        <input class="loginInput" name="signupEmail" type="text" placeholder="Email"/>   
    
        <input class="loginInput" name="signupPassword" id="pass" type="password" placeholder="Password"/>

        <input class="loginInput" name="confirmPassword" id="confirmPass" type="password" placeholder="Confirm Password"/>
    <br>
        <input class="btn btn-success formBtn" type="submit" id="confirmBtn" value="REGISTER"/>
    
        <p class="changeForm" onclick="changeForm(1)">Already a member?</p>

    </form>
        
        `;

        extraValidation();

        // action="/home" method="get"

    } else {

        /* Sign in Form */

        form.innerHTML = `

        <form class="signin-form" onsubmit="login();return false">
        
        <h2 class="formHeader">Sign In</h2>
    
        <input class="loginInput" name="signinEmail" type="email" placeholder="Email" autofocus/>

        <input class="loginInput" name="signinPassword" id="signinPass" type="password" placeholder="Password"/>
    <br>
        <input class="btn btn-primary formBtn" type="submit" id="loginBtn" value="CONTINUE"/>

        <p class="changeForm" onclick="changeForm(0)">Not a member?</p>

        </form>
        
        `;

        extraConfirmation();

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


/* Sign In form validation */

$(".signin-form").validate({
    rules: {
        signinEmail: {
            required: true,
            email: true
        },
        signinPassword: {
            required: true,
            strongPassword: true,
            nowhitespace: true,
            maxlength: 24
        },
        messages: {
            signinEmail: {
                required: "Please enter an email address.",
                email: "Please enter a valid email address."
            }
        }
    }


});

/* Sign Up form validation */

$(".signup-form").validate({
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



function register() {

    extraValidation();

    let username = $("input[name='signupUsername']").val();
    let email = $("input[name='signupEmail']").val();
    let password = $("#pass").val();
    let confirm = $("#confirmPass").val();

    if (username == "" || email == "" || password == "" || confirm == "") {
        return;
    }

    if (password != confirm) {
        return;
    }

    let data = {
        "username" : username,
        "email" : email,
        "password" : password
    };

    $.ajax({
        type: "POST",
        url: "/users",
        contentType : 'application/json',
        dataType : 'json',
        data : JSON.stringify(data),
        success: function(data) {

        window.location.href = "/home";
        },

        error: function(err) {
            console.log(err);
        }
    });


}



function login() {

    extraConfirmation();

    let email = $("input[name='signinEmail']").val();
    let password = $("#signinPass").val();

    if (email == "" || password == "") {
        return;
    }

    $.ajax({
        type: "GET",
        url: "/users/" + email,
        success: function() {

            console.log("Okkkk");

        }

    })

    //window.location.href = "/home";

}


/* Extra stuff */


function extraValidation() {

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
     
     
     $(".signup-form").validate({
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

}


function extraConfirmation() {

    $(".signin-form").validate({
        rules: {
            signinEmail: {
                required: true,
                email: true
            },
            signinPassword: {
                required: true
            },
            messages: {
                signinEmail: {
                    required: "Please enter an email address.",
                    email: "Please enter a valid email address."
                }
            }
        }
    
    
    });

}