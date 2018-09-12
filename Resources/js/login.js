
function changeForm(num) {

    let form = document.getElementById("form");

    if (num == 0) {
    
        /* Sign up Form */

        form.innerHTML = `
        
        <h2 class="formHeader">Sign Up</h2>
    
        <input class="loginInput" type="text" placeholder="Username" autofocus required/>
        
        <input class="loginInput" type="email" placeholder="Email" required/>

        <input class="loginInput" type="password" placeholder="Password" required/>

        <button class="btn btn-success formBtn" id="confirmBtn">CONFIRM</button>

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