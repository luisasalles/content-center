$(document).ready(function() {
    $(function() {
        var $tabButtonItem = $('#tab-button li'),
            $tabSelect = $('#tab-select'),
            $tabContents = $('.tab-contents'),
            activeClass = 'is-active';

        $tabButtonItem.first().addClass(activeClass);
        $tabContents.not(':first').hide();

        $tabButtonItem.find('a').on('click', function(e) {
            var target = $(this).attr('href');

            $tabButtonItem.removeClass(activeClass);
            $(this).parent().addClass(activeClass);
            $tabSelect.val(target);
            $tabContents.hide();
            $(target).show();
            e.preventDefault();
        });

        $tabSelect.on('change', function() {
            var target = $(this).val(),
                targetSelectNum = $(this).prop('selectedIndex');

            $tabButtonItem.removeClass(activeClass);
            $tabButtonItem.eq(targetSelectNum).addClass(activeClass);
            $tabContents.hide();
            $(target).show();
        });
    });

    document.getElementById('save1').addEventListener('click', function() {
        document.getElementById("form-annotation1").reset();
    });
    document.getElementById('save2').addEventListener('click', function() {
        document.getElementById("form-annotation2").reset();
    });
    document.getElementById('save3').addEventListener('click', function() {
        document.getElementById("form-annotation3").reset();
    });


    function FormatarTexto(tempo) {
        var horas = Math.floor(tempo / 3600);
        var minutos = Math.floor((tempo - (horas * 3600)) / 60);
        var segundos = Math.floor(tempo % 60);

        if (horas < 10) horas = '0' + horas;
        if (minutos < 10) minutos = '0' + minutos;
        if (segundos < 10) segundos = '0' + segundos;

        return horas + ':' + minutos + ':' + segundos;
    }
    document.getElementById('postit1').addEventListener('click', function click(e) {
        var time = document.getElementById('video').currentTime;
        var timePost = document.getElementById('tempoPostit1');

        timePost.innerHTML = FormatarTexto(time);

        var textAreaPost = document.getElementById('textAreaPost1');
        textAreaPost.removeAttribute("hidden");
        var btnPost = document.getElementById('btnPost1');
        btnPost.removeAttribute("hidden");
        document.getElementById('postit1').removeEventListener('click', click);
    });

    document.getElementById('btnPost1').addEventListener('click', function click(e) {
        var paragrafo = document.getElementById('textoPostit1');
        var textAreaPost = document.getElementById('textAreaPost1');
        paragrafo.innerHTML = textAreaPost.value;
        textAreaPost.style.visibility = "hidden";
        var btnPost = document.getElementById('btnPost1');
        btnPost.style.visibility = "hidden";
        var tituloPost = document.getElementById('tituloPost1');
        tituloPost.innerHTML = "Meu Post It";
    });

    document.getElementById('postit2').addEventListener('click', function click(e) {
        var time = document.getElementById('video').currentTime;
        var timePost = document.getElementById('tempoPostit2');

        timePost.innerHTML = FormatarTexto(time);

        var textAreaPost = document.getElementById('textAreaPost2');
        textAreaPost.removeAttribute("hidden");
        var btnPost = document.getElementById('btnPost2');
        btnPost.removeAttribute("hidden");
        document.getElementById('postit2').removeEventListener('click', click);
    });

    document.getElementById('btnPost2').addEventListener('click', function() {

        var paragrafo = document.getElementById('textoPostit2');
        var textAreaPost = document.getElementById('textAreaPost2');
        paragrafo.innerHTML = textAreaPost.value;
        textAreaPost.style.visibility = "hidden";
        var btnPost = document.getElementById('btnPost2');
        btnPost.style.visibility = "hidden";
        var tituloPost = document.getElementById('tituloPost2');
        tituloPost.innerHTML = "Meu Post It";
    });

    document.getElementById('postit3').addEventListener('click', function() {
        var time = document.getElementById('video').currentTime;
        var timePost = document.getElementById('tempoPostit3');

        timePost.innerHTML = FormatarTexto(time);

        var textAreaPost = document.getElementById('textAreaPost3');
        textAreaPost.removeAttribute("hidden");
        var btnPost = document.getElementById('btnPost3');
        btnPost.removeAttribute("hidden");
        document.getElementById('postit3').removeEventListener('click', click);
    });

    document.getElementById('btnPost3').addEventListener('click', function() {

        var paragrafo = document.getElementById('textoPostit3');
        var textAreaPost = document.getElementById('textAreaPost3');
        paragrafo.innerHTML = textAreaPost.value;
        textAreaPost.style.visibility = "hidden";
        var btnPost = document.getElementById('btnPost3');
        btnPost.style.visibility = "hidden";
        var tituloPost = document.getElementById('tituloPost3');
        tituloPost.innerHTML = "Meu Post It";
    });


});