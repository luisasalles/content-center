$(document).ready(function() {
    document.getElementById('qtdParc').addEventListener('change', function() {
        var select = document.getElementById('qtdParc');
        var valueSelect = select.options[select.selectedIndex].value;
        var valorFinal = document.getElementById('exampleInputAmount').value;
        var valorParcela = valorFinal / valueSelect;
        var div = document.getElementById("textParc");
        div.innerHTML = "<p> X " + parseFloat(valorParcela) + "<p>";
    });
});