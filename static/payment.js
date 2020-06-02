$(document).ready(function() {

    document.getElementById("buy-sucess").addEventListener('click', alert, false);

    function alert(ev) {
        ev.preventDefault();
        swal({
                title: "Tem certeza que quer concluir a compra?",
                icon: "warning",
                buttons: ["Não, quero voltar!", "Sim, quero comprar!"],
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Compra Concluída!! Assim que recebermos a confirmação do pagamento o curso estará disponível :) ", {
                        icon: "success",
                    }).then(() => {
                        window.location.href = "acc_aluno.html";
                    });
                } else {
                    swal("Pode continuar comprando.");
                }
            });
    };
});