$(function() {
// Скрипт для вспливающей контактной формы в блоке контактов
    $(document).ready(function() {
        $('a#go').click( function(event){
            event.preventDefault();
            $('#overlay').fadeIn(400,
                function(){
                    $('#modal_form')
                        .css('display', 'block')
                        .animate({opacity: 1, top: '50%'}, 200);
                });
        });

        $('#modal_close, #overlay').click( function(){
            $('#modal_form')
                .animate({opacity: 0, top: '45%'}, 200,
                    function(){
                        $(this).css('display', 'none');
                        $('#overlay').fadeOut(400);
                    }
                );
        });
    });
// Скрипт для вспливающей формы для видео
    $(document).ready(function() {
        $('a#video_go').click( function(event){
            event.preventDefault();
            $('#video_overlay').fadeIn(400,
                function(){
                    $('#video_modal_form')
                        .css('display', 'block')
                        .animate({opacity: 1, top: '50%'}, 200);
                });
        });
        $('#video_modal_close, #video_overlay').click( function(){
            $('#video_modal_form')
                .animate({opacity: 0, top: '45%'}, 200,
                    function(){
                        $(this).css('display', 'none');
                        $('#video_overlay').fadeOut(400);
                    }
                );
        });
    });
// кнопка с градиентом
    $(document).mousemove(function(event) {
        windowWidth = $(window).width();
        windowHeight = $(window).height();

        mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
        mouseYpercentage = Math.round(event.pageY / windowHeight * 100);

        $('.radial-gradient').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #3498db, #004790)');
    });

    // меню прилипает к верху при прокрутке
    /*  $(window).scroll(function () {
     if ($(window).scrollTop() > 140) {
     $('div.b-head__menu').addClass('fixed');
     }
     else if ($(window).scrollTop() < 140) {
     $('div.b-head__menu').removeClass('fixed');
     }
     });*/

//паралакс на проектах
    $(window).scroll(function(){
        var st=$(this).scrollTop();
        $(".projects__all__list-item__left").css({
            "transform":"translate(0%,-" + st/100 +"%"
        });
        $(".projects__all__list-item__right").css({
            "transform":"translate(0%,-" + st/50 +"%"
        });
    });
//появление белой рамки при скролле
    $(window).scroll(function(){
        if ($(window).scrollTop() > 10) {
            $(".b-logo__a").addClass("b-logo__a__scroll");
            $(".b-page__header__container").addClass("header__container__scroll");
            $(".b-link").addClass("b-link__scroll");

        }
        else if ($(window).scrollTop() < 10) {
            $(".b-logo__a").removeClass("b-logo__a__scroll");
            $(".b-page__header__container").removeClass("header__container__scroll");
            $(".b-link").removeClass("b-link__scroll");
        }
    });
});
//паралакс на первом секшине
$(function(){
    var mouseX = 0, mouseY = 0, limitX = 40, limitY = 40;
    $('.b-page__main__content').mousemove(function(e){
        var offset = $('.b-page__main__content').offset();
        mouseX = Math.min(e.pageX - offset.left, limitX);
        mouseY = Math.min(e.pageY - offset.top, limitY);
        if (mouseX < 0) mouseX = 0;
        if (mouseY < 0) mouseY = 0;
    });

    var follower = $('.b-page__main__content');
    var xp = 0, yp = 0;
    var loop = setInterval(function(){
        xp += (mouseX - xp) / 30;
        yp += (mouseY - yp) / 30;
        follower.css({left:xp, top:yp});

    }, 10);

});
//валидация формы

$(document).ready(function() {
    var formBlock = $('.contacts__form').find('form');
    var formName = formBlock.find('input[type=text]');
    var formTextarea = formBlock.find('textarea');
    formName.on('blur', function() {
        if($(this).val().match(/^[a-zA-Z0-9_\s]{2,255}$/g)) {
            $(this).removeClass('error');
        }
        else {
            $(this).addClass('error');
        }
    })
    formName.on('focus', function() {
        $(this).removeClass('error')
    })

    formTextarea.on('blur', function() {
        if($(this).val().match(/^.{2,30000}$/gm)) {
            $(this).removeClass('error');
        }
        else {
            $(this).addClass('error');
        }
    })
    formTextarea.on('focus', function() {
        $(this).removeClass('error')
    })

    formBlock.on('submit', function(event) {
        if(formName.val().length == 0 || formName.hasClass('error')  ||
            formTextarea.val().length == 0 || formTextarea.hasClass('error')) {
            event.preventDefault();
            formName.addClass('error');
            formTextarea.addClass('error');
        }
    })

    $('#send__form').on('click', function () {
        $("#contact__form__main input, #contact__form__main textarea").removeClass('error');
        $.ajax({
            url: 'ajaxmail.php',
            type: 'POST',
            data: $("#contact__form__main").serialize(),
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    $("#contact__form__main").hide();
                    $("#contact__form__main__msg").show();
                    $('html, body').animate({
                        scrollTop: ($("#contact__form__main__msg").offset().top-80)
                    }, 1000);
                } else {
                    $('#' + response.field).addClass('error');
                }
            },
            error: function () { }
        });
        return false;
    });
});

$(function(){
   //scroll to
    var hash;

    //scrollto when click to link
    $(".b-menu a, .onepage-pagination a").click(function() {
        var url = $(this).attr('href');
        hash = url.substring(url.indexOf('#'));
        return scrollto_with_hash(hash);
    });

    //scrollto when click to other link with hash
    hash = window.location.hash.replace('#', '');

    if (hash != '') {
        hash = '#' + hash;
        scrollto_with_hash(hash);
        //return scrollto_with_hash(hash);
    }

    function scrollto_with_hash(hash) {
        var val = 50;
        /*var width = $(window).width();
         if (width <= 610) {
         val = 100;
         }*/

        if ($(hash).length) {
            $('html, body').animate({
                scrollTop: $(hash).offset().top - val
            }, 600);
            return false;
        }
    }
});
$(function(){
    var offset1 = $("#block1").offset();
    var offset2 = $("#block2").offset();
    var offset3 = $("#block3").offset();
    var offset4 = $("#block4").offset();
    var section = $("#section-name__title");
    $(window).scroll(function(){
        if ($(window).scrollTop()==0) {
            $(".section-name__go-up").addClass("section-name__none");
        }
        else if ($(window).scrollTop() > offset1.top && $(window).scrollTop() < offset2.top) {
            section.text("About me");
            $(".section-name").removeClass("section-name__none");
            $(".section-name__go-up").addClass("section-name__none");
        }
        else if ($(window).scrollTop() > offset2.top && $(window).scrollTop() < offset3.top) {
            section.text("Some projects");
            $(".section-name").removeClass("section-name__none");
            $(".section-name__go-up").addClass("section-name__none");
        }
        else if ($(window).scrollTop() > offset3.top && $(window).scrollTop() < offset4.top) {
            section.text("My contacts");
            $(".section-name").removeClass("section-name__none");
            $(".section-name__go-up").addClass("section-name__none");
        }
        else {
            $(".section-name").addClass("section-name__none");
            $(".section-name__go-up").removeClass("section-name__none");
        }
    });

});
// plugin for convas
$(function(){
    $(window).resize(function() {
        var h, d;
        h = $(window).height();
        d = $(window).width();
        $("#whiteborder").css('width', d);
        $("#whiteborder").css('height', h);
    })
});