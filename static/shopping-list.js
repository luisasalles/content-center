$(document).ready(function() {

    var elements = document.getElementsByName("btn-cart");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', go, false);
    }

    function go() {
        swal({
                title: "Quer ir para carrinho ?",
                text: "Ou continuar comprando ?",
                icon: "info",
                buttons: ["Continuar comprando", "Ir para carrinho"],
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    window.location.href = "shopping.html";
                } else {
                    swal("Curso adicionado ao carrinho!");
                }
            });
    };

});