$(document).ready(function() {
    var form = document.getElementById("form-newpass");

    form.addEventListener("submit", function(e) {
        var password = document.getElementById("new-password").value;
        var confirmPassword = document.getElementById("confirm-new-password").value;

        if (password != confirmPassword) {
            e.preventDefault();
            document.getElementById("new-password").style.border = "2px solid red";
            document.getElementById("confirm-new-password").style.border = "2px solid red";
            $('#alert-pass').show();
        }
    });

    document.getElementById("confirm-new-password").addEventListener('click', function() {
        document.getElementById("new-password").style.border = "0px";
        document.getElementById("confirm-new-password").style.border = "0px";
        $('#alert-pass').hide();
    });

    document.getElementById("new-password").addEventListener('click', function() {
        document.getElementById("new-password").style.border = "0px";
        document.getElementById("confirm-new-password").style.border = "0px";
        $('#alert-pass').hide();
    });

});