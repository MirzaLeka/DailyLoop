"use strict";function changeForm(e){var n=document.getElementById("form");0==e?(n.innerHTML='\n        \n        <form class="signup-form" onsubmit="register();return false">\n\n        <h2 class="formHeader">Sign Up</h2>\n\n        <input class="loginInput" name="signupUsername" type="text" placeholder="Username" autofocus/>\n    \n        <input class="loginInput" name="signupEmail" type="text" placeholder="Email"/>   \n    \n        <input class="loginInput" name="signupPassword" id="pass" type="password" placeholder="Password"/>\n\n        <input class="loginInput" name="confirmPassword" id="confirmPass" type="password" placeholder="Confirm Password"/>\n    <br>\n        <input class="btn btn-success formBtn" type="submit" id="confirmBtn" value="REGISTER"/>\n    \n        <p class="changeForm" onclick="changeForm(1)">Already a member?</p>\n\n    </form>\n        \n        ',extraValidation()):(n.innerHTML='\n\n        <form class="signin-form" onsubmit="login();return false">\n        \n        <h2 class="formHeader">Sign In</h2>\n    \n        <input class="loginInput" oninput="fixForm()" name="signinEmail" type="email" placeholder="Email" autofocus/>\n\n        <input class="loginInput" oninput="fixForm()" name="signinPassword" id="signinPass" type="password" placeholder="Password"/>\n            <label id="loginFailed">Incorrect username or password</label>\n    <br id="breakTag">\n        <input class="btn btn-primary formBtn" type="submit" id="loginBtn" value="CONTINUE"/>\n\n        <p class="changeForm" onclick="changeForm(0)">Not a member?</p>\n\n        </form>\n        \n        ',extraConfirmation())}function register(){extraValidation();var e=$("input[name='signupUsername']").val(),n=$("input[name='signupEmail']").val(),a=$("#pass").val(),s=$("#confirmPass").val();if(""!=e&&""!=n&&""!=a&&""!=s&&a==s){var i={username:e,email:n,password:a};$.ajax({type:"POST",url:"/users",contentType:"application/json",dataType:"json",data:JSON.stringify(i),success:function(e){window.location.href="/home"},error:function(e){e.responseJSON.errmsg.substr(60,199).startsWith("u")?alert("Username is already in use"):alert("Email is already in use")}})}}function login(){extraConfirmation();var e=$("input[name='signinEmail']").val(),n=$("#signinPass").val();if(""!=e&&""!=n){var a={email:e,password:n};$.ajax({type:"POST",url:"/users/login",contentType:"application/json",dataType:"json",data:JSON.stringify(a),success:function(e){e&&(window.location.href="/home")},error:function(e){e&&(document.getElementById("loginFailed").style.display="block",$("#breakTag").css("display","none"))}})}}function fixForm(){$("#breakTag").css("display","block"),document.getElementById("loginFailed").style.display="none"}function extraValidation(){$.validator.addMethod("nowhitespace",function(e,n){return this.optional(n)||/^\S+$/i.test(e)},"No white space please."),$.validator.addMethod("strongUsername",function(e,n){return this.optional(n)||6<=e.length&&/[a-z]/i.test(e)},"Username must be at least 6 characters long and contain at least one letter."),$.validator.addMethod("strongPassword",function(e,n){return this.optional(n)||8<=e.length&&/\d/.test(e)&&/[a-z]/i.test(e)&&/[$-/:-?{-~!"^_`\[\]]/.test(e)},"Password must be at least 8 characters long and contain at least one number, one letter and one symbol."),$(".signup-form").validate({rules:{signupUsername:{required:!0,nowhitespace:!0,strongUsername:!0,maxlength:24},signupEmail:{required:!0,email:!0},signupPassword:{required:!0,strongPassword:!0,nowhitespace:!0,maxlength:32},confirmPassword:{required:!0,equalTo:"#pass",nowhitespace:!0},messages:{signupEmail:{required:"Please enter an email address.",email:"Please enter a valid email address."}}}})}function extraConfirmation(){$(".signin-form").validate({rules:{signinEmail:{required:!0,email:!0},signinPassword:{required:!0},messages:{signinEmail:{required:"Please enter an email address.",email:"Please enter a valid email address."}}}})}$(function(){$.validator.addMethod("nowhitespace",function(e,n){return this.optional(n)||/^\S+$/i.test(e)},"No white space please."),$.validator.addMethod("strongUsername",function(e,n){return this.optional(n)||6<=e.length&&/[a-z]/i.test(e)},"Username must be at least 6 characters long and contain at least one letter."),$.validator.addMethod("strongPassword",function(e,n){return this.optional(n)||8<=e.length&&/\d/.test(e)&&/[a-z]/i.test(e)&&/[$-/:-?{-~!"^_`\[\]]/.test(e)},"Password must be at least 8 characters long and contain at least one number, one letter and one symbol."),$(".signin-form").validate({rules:{signinEmail:{required:!0,email:!0},signinPassword:{required:!0,strongPassword:!0,nowhitespace:!0,maxlength:32},messages:{signinEmail:{required:"Please enter an email address.",email:"Please enter a valid email address."}}}}),$(".signup-form").validate({rules:{signupUsername:{required:!0,nowhitespace:!0,strongUsername:!0,maxlength:24},signupEmail:{required:!0,email:!0},signupPassword:{required:!0,strongPassword:!0,nowhitespace:!0,maxlength:32},confirmPassword:{required:!0,equalTo:"#pass",nowhitespace:!0},messages:{signupEmail:{required:"Please enter an email address.",email:"Please enter a valid email address."}}}})});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNoYW5nZUZvcm0iLCJudW0iLCJmb3JtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsInZhbGlkYXRvciIsImV4dHJhQ29uZmlybWF0aW9uIiwicmVnaXN0ZXIiLCJleHRyYVZhbGlkYXRpb24iLCJkYXRhIiwiJCIsInZhbCIsImVtYWlsIiwicGFzc3dvcmQiLCJjb25maXJtIiwiYWpheCIsImRhdGFUeXBlIiwid2luZG93IiwidHlwZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdWNjZXNzIiwibG9jYXRpb24iLCJocmVmIiwiZXJyb3IiLCJlcnIiLCJyZXNwb25zZUpTT04iLCJlcnJtc2ciLCJzdWJzdHIiLCJzdGFydHNXaXRoIiwiYWxlcnQiLCJydWxlcyIsInJlcXVpcmVkIiwic3Ryb25nUGFzc3dvcmQiLCJub3doaXRlc3BhY2UiLCJtYXhsZW5ndGgiLCJjb250ZW50VHlwZSIsImNvbmZpcm1QYXNzd29yZCIsImVxdWFsVG8iLCJtZXNzYWdlcyIsInN0eWxlIiwiZGlzcGxheSIsImNzcyIsImFkZE1ldGhvZCIsInZhbHVlIiwiZWxlbWVudCIsInRoaXMiLCJvcHRpb25hbCIsInRlc3QiLCJsZW5ndGgiLCJ2YWxpZGF0ZSIsInNpZ251cFVzZXJuYW1lIiwic3Ryb25nVXNlcm5hbWUiLCJzaWdudXBFbWFpbCIsInNpZ251cFBhc3N3b3JkIiwic2lnbmluRW1haWwiLCJzaWduaW5QYXNzd29yZCIsInVzZXJuYW1lIiwiZXJyVHlwZSJdLCJtYXBwaW5ncyI6ImFBQ0EsU0FBU0EsV0FBV0MsR0FFaEIsSUFBSUMsRUFBT0MsU0FBU0MsZUFBZSxRQUV4QixHQUFQSCxHQUlBQyxFQUFLRyxVQUFMLCt4QkFpRU5DLG9CQWdCRkosRUFBQUcsVUFBQSwwckJBY2tCRSxxQkFnSGIsU0FBQUMsV0FFREMsa0JBRUEsSUFBSUMsRUFBT0MsRUFBQSxnQ0FBQUMsTUFDUEMsRUFBQUYsRUFBVUUsNkJBREhELE1B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LFVBQUFBLGlCQURTLFNBQUFZLEVBQUFDLEdBRVRqQyxPQUFBQSxLQUFBQSxTQUFPaUMsSUFUUixHQU9VRCxFQVBWSyxRQVdISyxTQUFBQSxLQUFBQSxJQUNJdEIsZ0ZBR0FHLEVBQUFBLFVBQUFBLFVBQUFBLGlCQUFXLFNBQUFTLEVBQUFDLEdBSkMsT0FBQUMsS0FYYkMsU0FBQUYsSUFpQkhSLEdBQUFBLEVBQUFBLFFBQ0lMLEtBQUFBLEtBQUFBLElBQ0FNLFNBQUFBLEtBQUFBLElBQ0FKLHVCQUFjYyxLQUFBSixJQUhELDJHQU1BbEMsRUFBQSxnQkFBQXdDLFNBQUEsQ0FEUG5CLE1BQUEsQ0F0QlB3QixZQUFBLENBdkJDdkIsVUFBVSxFQXNCdEJwQixPQUFBLEdBbkJRNEMsZUFBZ0IsQ0F5RGZqRCxVQUFXLEVBdkRSMEIsZ0JBQWdCLEVBeUR4QnpCLGNBQUFBLEVBdkRRMkIsVUFBVyxJQTBEZnZCLFNBQVUsQ0FDVkMsWUFBYSxDQUNiQyxTQUFZLGlDQXZESkYsTUFBTywyQ0FrRWZGLEVBQUEsZ0JBQUF3QyxTQUFhTyxDQUNiMUIsTUFBQSxDQUNBb0IsZUFBYXRDLENBSGpCbUIsVUFBQSxFQW5EUUUsY0FBYyxFQXlEZmtCLGdCQUFBLEVBQ0hsQyxVQURHLElBR0hrQixZQUFjLENBQ2RwQixVQUFVLEVBQ1ZQLE9BQVlXLEdBdERaa0MsZUFBZ0IsQ0F5RGhCckMsVUFBT0ssRUFSSlcsZ0JBQUEsRUE5Q0NDLGNBQWMsRUF5RGxCVixVQUFPLElBRUphLGdCQUFJcUIsQ0F2REgxQixVQUFVLEVBeURYTSxRQUFJb0IsUUFDSDVCLGNBQU0sR0FFTkEsU0FBQUEsQ0FDQXVCLFlBQUEsQ0FFSHJCLFNBQUEsaUNBckJMcEIsTUFBQSIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5mdW5jdGlvbiBjaGFuZ2VGb3JtKG51bSkge1xyXG5cclxuICAgIGxldCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtXCIpO1xyXG5cclxuICAgIGlmIChudW0gPT0gMCkge1xyXG4gICAgXHJcbiAgICAgICAgLyogU2lnbiB1cCBGb3JtICovXHJcblxyXG4gICAgICAgIGZvcm0uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIFxyXG4gICAgICAgIDxmb3JtIGNsYXNzPVwic2lnbnVwLWZvcm1cIiBvbnN1Ym1pdD1cInJlZ2lzdGVyKCk7cmV0dXJuIGZhbHNlXCI+XHJcblxyXG4gICAgICAgIDxoMiBjbGFzcz1cImZvcm1IZWFkZXJcIj5TaWduIFVwPC9oMj5cclxuXHJcbiAgICAgICAgPGlucHV0IGNsYXNzPVwibG9naW5JbnB1dFwiIG5hbWU9XCJzaWdudXBVc2VybmFtZVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIGF1dG9mb2N1cy8+XHJcbiAgICBcclxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJsb2dpbklucHV0XCIgbmFtZT1cInNpZ251cEVtYWlsXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIvPiAgIFxyXG4gICAgXHJcbiAgICAgICAgPGlucHV0IGNsYXNzPVwibG9naW5JbnB1dFwiIG5hbWU9XCJzaWdudXBQYXNzd29yZFwiIGlkPVwicGFzc1wiIHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIi8+XHJcblxyXG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImxvZ2luSW5wdXRcIiBuYW1lPVwiY29uZmlybVBhc3N3b3JkXCIgaWQ9XCJjb25maXJtUGFzc1wiIHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiQ29uZmlybSBQYXNzd29yZFwiLz5cclxuICAgIDxicj5cclxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgZm9ybUJ0blwiIHR5cGU9XCJzdWJtaXRcIiBpZD1cImNvbmZpcm1CdG5cIiB2YWx1ZT1cIlJFR0lTVEVSXCIvPlxyXG4gICAgXHJcbiAgICAgICAgPHAgY2xhc3M9XCJjaGFuZ2VGb3JtXCIgb25jbGljaz1cImNoYW5nZUZvcm0oMSlcIj5BbHJlYWR5IGEgbWVtYmVyPzwvcD5cclxuXHJcbiAgICA8L2Zvcm0+XHJcbiAgICAgICAgXHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgZXh0cmFWYWxpZGF0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vIGFjdGlvbj1cIi9ob21lXCIgbWV0aG9kPVwiZ2V0XCJcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAvKiBTaWduIGluIEZvcm0gKi9cclxuXHJcbiAgICAgICAgZm9ybS5pbm5lckhUTUwgPSBgXHJcblxyXG4gICAgICAgIDxmb3JtIGNsYXNzPVwic2lnbmluLWZvcm1cIiBvbnN1Ym1pdD1cImxvZ2luKCk7cmV0dXJuIGZhbHNlXCI+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGgyIGNsYXNzPVwiZm9ybUhlYWRlclwiPlNpZ24gSW48L2gyPlxyXG4gICAgXHJcbiAgICAgICAgPGlucHV0IGNsYXNzPVwibG9naW5JbnB1dFwiIG9uaW5wdXQ9XCJmaXhGb3JtKClcIiBuYW1lPVwic2lnbmluRW1haWxcIiB0eXBlPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgYXV0b2ZvY3VzLz5cclxuXHJcbiAgICAgICAgPGlucHV0IGNsYXNzPVwibG9naW5JbnB1dFwiIG9uaW5wdXQ9XCJmaXhGb3JtKClcIiBuYW1lPVwic2lnbmluUGFzc3dvcmRcIiBpZD1cInNpZ25pblBhc3NcIiB0eXBlPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIvPlxyXG4gICAgICAgICAgICA8bGFiZWwgaWQ9XCJsb2dpbkZhaWxlZFwiPkluY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZDwvbGFiZWw+XHJcbiAgICA8YnIgaWQ9XCJicmVha1RhZ1wiPlxyXG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBmb3JtQnRuXCIgdHlwZT1cInN1Ym1pdFwiIGlkPVwibG9naW5CdG5cIiB2YWx1ZT1cIkNPTlRJTlVFXCIvPlxyXG5cclxuICAgICAgICA8cCBjbGFzcz1cImNoYW5nZUZvcm1cIiBvbmNsaWNrPVwiY2hhbmdlRm9ybSgwKVwiPk5vdCBhIG1lbWJlcj88L3A+XHJcblxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgICBcclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBleHRyYUNvbmZpcm1hdGlvbigpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuJChmdW5jdGlvbigpIHtcclxuXHJcbiQudmFsaWRhdG9yLmFkZE1ldGhvZCggXCJub3doaXRlc3BhY2VcIiwgZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xyXG4gICByZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApXHJcbiAgICB8fCAvXlxcUyskL2kudGVzdCggdmFsdWUgKTtcclxufSwgXCJObyB3aGl0ZSBzcGFjZSBwbGVhc2UuXCIpOyAgIFxyXG5cclxuXHJcbiQudmFsaWRhdG9yLmFkZE1ldGhvZCgnc3Ryb25nVXNlcm5hbWUnLCBmdW5jdGlvbih2YWx1ZSwgZWxlbWVudCkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9uYWwoZWxlbWVudCkgXHJcbiAgICAgIHx8IHZhbHVlLmxlbmd0aCA+PSA2XHJcbiAgICAgICYmIC9bYS16XS9pLnRlc3QodmFsdWUpO1xyXG4gIH0sICdVc2VybmFtZSBtdXN0IGJlIGF0IGxlYXN0IDYgY2hhcmFjdGVycyBsb25nIGFuZCBjb250YWluIGF0IGxlYXN0IG9uZSBsZXR0ZXIuJylcclxuXHJcblxyXG4kLnZhbGlkYXRvci5hZGRNZXRob2QoJ3N0cm9uZ1Bhc3N3b3JkJywgZnVuY3Rpb24odmFsdWUsIGVsZW1lbnQpIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbmFsKGVsZW1lbnQpIFxyXG4gICAgICB8fCB2YWx1ZS5sZW5ndGggPj0gOFxyXG4gICAgICAmJiAvXFxkLy50ZXN0KHZhbHVlKVxyXG4gICAgICAmJiAvW2Etel0vaS50ZXN0KHZhbHVlKVxyXG4gICAgICAmJiAvWyQtLzotP3stfiFcIl5fYFxcW1xcXV0vLnRlc3QodmFsdWUpO1xyXG4gIH0sICdQYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDggY2hhcmFjdGVycyBsb25nIGFuZCBjb250YWluIGF0IGxlYXN0IG9uZSBudW1iZXIsIG9uZSBsZXR0ZXIgYW5kIG9uZSBzeW1ib2wuJylcclxuXHJcblxyXG4vKiBTaWduIEluIGZvcm0gdmFsaWRhdGlvbiAqL1xyXG5cclxuJChcIi5zaWduaW4tZm9ybVwiKS52YWxpZGF0ZSh7XHJcbiAgICBydWxlczoge1xyXG4gICAgICAgIHNpZ25pbkVtYWlsOiB7XHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBlbWFpbDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2lnbmluUGFzc3dvcmQ6IHtcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHN0cm9uZ1Bhc3N3b3JkOiB0cnVlLFxyXG4gICAgICAgICAgICBub3doaXRlc3BhY2U6IHRydWUsXHJcbiAgICAgICAgICAgIG1heGxlbmd0aDogMzJcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgICAgIHNpZ25pbkVtYWlsOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogXCJQbGVhc2UgZW50ZXIgYW4gZW1haWwgYWRkcmVzcy5cIixcclxuICAgICAgICAgICAgICAgIGVtYWlsOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59KTtcclxuXHJcbi8qIFNpZ24gVXAgZm9ybSB2YWxpZGF0aW9uICovXHJcblxyXG4kKFwiLnNpZ251cC1mb3JtXCIpLnZhbGlkYXRlKHtcclxuICAgIHJ1bGVzOiB7XHJcbiAgICAgICAgc2lnbnVwVXNlcm5hbWU6IHtcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIG5vd2hpdGVzcGFjZTogdHJ1ZSxcclxuICAgICAgICAgICAgc3Ryb25nVXNlcm5hbWU6IHRydWUsXHJcbiAgICAgICAgICAgIG1heGxlbmd0aDogMjRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNpZ251cEVtYWlsOiB7XHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBlbWFpbDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2lnbnVwUGFzc3dvcmQ6IHtcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHN0cm9uZ1Bhc3N3b3JkOiB0cnVlLFxyXG4gICAgICAgICAgICBub3doaXRlc3BhY2U6IHRydWUsXHJcbiAgICAgICAgICAgIG1heGxlbmd0aDogMzJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmZpcm1QYXNzd29yZDoge1xyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgZXF1YWxUbzogXCIjcGFzc1wiLFxyXG4gICAgICAgICAgICBub3doaXRlc3BhY2U6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgICAgIHNpZ251cEVtYWlsOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogXCJQbGVhc2UgZW50ZXIgYW4gZW1haWwgYWRkcmVzcy5cIixcclxuICAgICAgICAgICAgICAgIGVtYWlsOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59KTtcclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiByZWdpc3RlcigpIHtcclxuXHJcbiAgICBleHRyYVZhbGlkYXRpb24oKTtcclxuXHJcbiAgICBsZXQgdXNlcm5hbWUgPSAkKFwiaW5wdXRbbmFtZT0nc2lnbnVwVXNlcm5hbWUnXVwiKS52YWwoKTtcclxuICAgIGxldCBlbWFpbCA9ICQoXCJpbnB1dFtuYW1lPSdzaWdudXBFbWFpbCddXCIpLnZhbCgpO1xyXG4gICAgbGV0IHBhc3N3b3JkID0gJChcIiNwYXNzXCIpLnZhbCgpO1xyXG4gICAgbGV0IGNvbmZpcm0gPSAkKFwiI2NvbmZpcm1QYXNzXCIpLnZhbCgpO1xyXG5cclxuICAgIGlmICh1c2VybmFtZSA9PSBcIlwiIHx8IGVtYWlsID09IFwiXCIgfHwgcGFzc3dvcmQgPT0gXCJcIiB8fCBjb25maXJtID09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhc3N3b3JkICE9IGNvbmZpcm0pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgXCJ1c2VybmFtZVwiIDogdXNlcm5hbWUsXHJcbiAgICAgICAgXCJlbWFpbFwiIDogZW1haWwsXHJcbiAgICAgICAgXCJwYXNzd29yZFwiIDogcGFzc3dvcmRcclxuICAgIH07XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICB1cmw6IFwiL3VzZXJzXCIsXHJcbiAgICAgICAgY29udGVudFR5cGUgOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgIGRhdGEgOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvaG9tZVwiO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcclxuXHJcbiAgICAgICAgICAgdmFyIGVyclR5cGUgPSAgZXJyLnJlc3BvbnNlSlNPTi5lcnJtc2cuc3Vic3RyKDYwLCAxOTkpO1xyXG5cclxuICAgICAgICAgICBpZiAoZXJyVHlwZS5zdGFydHNXaXRoKFwidVwiKSkge1xyXG4gICAgICAgICAgICBhbGVydChcIlVzZXJuYW1lIGlzIGFscmVhZHkgaW4gdXNlXCIpO1xyXG4gICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2VcIik7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGxvZ2luKCkge1xyXG5cclxuICAgIGV4dHJhQ29uZmlybWF0aW9uKCk7XHJcblxyXG4gICAgbGV0IGVtYWlsID0gJChcImlucHV0W25hbWU9J3NpZ25pbkVtYWlsJ11cIikudmFsKCk7XHJcbiAgICBsZXQgcGFzc3dvcmQgPSAkKFwiI3NpZ25pblBhc3NcIikudmFsKCk7XHJcblxyXG4gICAgaWYgKGVtYWlsID09IFwiXCIgfHwgcGFzc3dvcmQgPT0gXCJcIikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cmw6IFwiL3VzZXJzL1wiICsgZW1haWwsXHJcblxyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgXCJlbWFpbFwiIDogZW1haWwsXHJcbiAgICAgICAgXCJwYXNzd29yZFwiIDogcGFzc3dvcmRcclxuICAgIH1cclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgIHVybDogXCIvdXNlcnMvbG9naW5cIixcclxuICAgICAgICBjb250ZW50VHlwZSA6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICBkYXRhVHlwZSA6ICdqc29uJyxcclxuICAgICAgICBkYXRhIDogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvaG9tZVwiO1xyXG4gICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7XHJcblxyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbkZhaWxlZFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAkKFwiI2JyZWFrVGFnXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG4gICAgLyogUmVtb3ZlIGxhYmVsIGFuZCBmaXggZm9ybSAqL1xyXG5cclxuIGZ1bmN0aW9uIGZpeEZvcm0oKSB7XHJcbiAgICAkKFwiI2JyZWFrVGFnXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5GYWlsZWRcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG59XHJcblxyXG5cclxuLyogRXh0cmEgc3R1ZmYgKi9cclxuXHJcblxyXG5mdW5jdGlvbiBleHRyYVZhbGlkYXRpb24oKSB7XHJcblxyXG4gICAgJC52YWxpZGF0b3IuYWRkTWV0aG9kKCBcIm5vd2hpdGVzcGFjZVwiLCBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKVxyXG4gICAgICAgICB8fCAvXlxcUyskL2kudGVzdCggdmFsdWUgKTtcclxuICAgICB9LCBcIk5vIHdoaXRlIHNwYWNlIHBsZWFzZS5cIik7ICAgXHJcbiAgICAgXHJcbiAgICAgXHJcbiAgICAgJC52YWxpZGF0b3IuYWRkTWV0aG9kKCdzdHJvbmdVc2VybmFtZScsIGZ1bmN0aW9uKHZhbHVlLCBlbGVtZW50KSB7XHJcbiAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbmFsKGVsZW1lbnQpIFxyXG4gICAgICAgICAgIHx8IHZhbHVlLmxlbmd0aCA+PSA2XHJcbiAgICAgICAgICAgJiYgL1thLXpdL2kudGVzdCh2YWx1ZSk7XHJcbiAgICAgICB9LCAnVXNlcm5hbWUgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMgbG9uZyBhbmQgY29udGFpbiBhdCBsZWFzdCBvbmUgbGV0dGVyLicpXHJcbiAgICAgXHJcbiAgICAgXHJcbiAgICAgJC52YWxpZGF0b3IuYWRkTWV0aG9kKCdzdHJvbmdQYXNzd29yZCcsIGZ1bmN0aW9uKHZhbHVlLCBlbGVtZW50KSB7XHJcbiAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbmFsKGVsZW1lbnQpIFxyXG4gICAgICAgICAgIHx8IHZhbHVlLmxlbmd0aCA+PSA4XHJcbiAgICAgICAgICAgJiYgL1xcZC8udGVzdCh2YWx1ZSlcclxuICAgICAgICAgICAmJiAvW2Etel0vaS50ZXN0KHZhbHVlKVxyXG4gICAgICAgICAgICYmIC9bJC0vOi0/ey1+IVwiXl9gXFxbXFxdXS8udGVzdCh2YWx1ZSk7XHJcbiAgICAgICB9LCAnUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMgbG9uZyBhbmQgY29udGFpbiBhdCBsZWFzdCBvbmUgbnVtYmVyLCBvbmUgbGV0dGVyIGFuZCBvbmUgc3ltYm9sLicpXHJcbiAgICAgXHJcbiAgICAgXHJcbiAgICAgJChcIi5zaWdudXAtZm9ybVwiKS52YWxpZGF0ZSh7XHJcbiAgICAgICAgIHJ1bGVzOiB7XHJcbiAgICAgICAgICAgICBzaWdudXBVc2VybmFtZToge1xyXG4gICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgIG5vd2hpdGVzcGFjZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICBzdHJvbmdVc2VybmFtZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICBtYXhsZW5ndGg6IDI0XHJcbiAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgc2lnbnVwRW1haWw6IHtcclxuICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICBlbWFpbDogdHJ1ZVxyXG4gICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgIHNpZ251cFBhc3N3b3JkOiB7XHJcbiAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgc3Ryb25nUGFzc3dvcmQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgbm93aGl0ZXNwYWNlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgIG1heGxlbmd0aDogMzJcclxuICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICBjb25maXJtUGFzc3dvcmQ6IHtcclxuICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICBlcXVhbFRvOiBcIiNwYXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgbm93aGl0ZXNwYWNlOiB0cnVlXHJcbiAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgbWVzc2FnZXM6IHtcclxuICAgICAgICAgICAgICAgICBzaWdudXBFbWFpbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogXCJQbGVhc2UgZW50ZXIgYW4gZW1haWwgYWRkcmVzcy5cIixcclxuICAgICAgICAgICAgICAgICAgICAgZW1haWw6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcy5cIlxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgIFxyXG4gICAgIH0pO1xyXG5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGV4dHJhQ29uZmlybWF0aW9uKCkge1xyXG5cclxuICAgICQoXCIuc2lnbmluLWZvcm1cIikudmFsaWRhdGUoe1xyXG4gICAgICAgIHJ1bGVzOiB7XHJcbiAgICAgICAgICAgIHNpZ25pbkVtYWlsOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNpZ25pblBhc3N3b3JkOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtZXNzYWdlczoge1xyXG4gICAgICAgICAgICAgICAgc2lnbmluRW1haWw6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogXCJQbGVhc2UgZW50ZXIgYW4gZW1haWwgYWRkcmVzcy5cIixcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgfSk7XHJcblxyXG59Il19
