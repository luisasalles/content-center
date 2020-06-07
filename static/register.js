$(document).ready(function() {
    var form = document.getElementById("form-register");

    form.addEventListener("submit", function(e) {
        var password = document.getElementById("password-register").value;
        var confirmPassword = document.getElementById("confirm-password-register").value;

        if (password != confirmPassword) {
            e.preventDefault();
            document.getElementById("password-register").style.border = "2px solid red";
            document.getElementById("confirm-password-register").style.border = "2px solid red";
            $('#alert-pass').show();
        }
    });

    document.getElementById("confirm-password-register").addEventListener('click', function() {
        document.getElementById("password-register").style.border = "0px";
        document.getElementById("confirm-password-register").style.border = "0px";
        $('#alert-pass').hide();
    });

    document.getElementById("password-register").addEventListener('click', function() {
        document.getElementById("password-register").style.border = "0px";
        document.getElementById("confirm-password-register").style.border = "0px";
        $('#alert-pass').hide();
    });

});