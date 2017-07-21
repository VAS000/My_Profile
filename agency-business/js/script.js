$(document).ready(function(){

    var banner = $('.banner');
    var topHeader = $('.top-header');
    var navbar = $('.navbar');

    function afterResize(){
        banner.height($(window).height() - topHeader.outerHeight() - navbar.outerHeight());
    }

    afterResize();

    $(window).resize(function(){
        afterResize();
    });

    // Slide Toggle Contact Form When User Clicks On The Arrow
    $('.arrow').on('click', function(){
        var box = $(this).next('.box');
        var xButton = box.find('span');
        if(box.data('status') === 'opened'){
            xButton.fadeOut(500, function(){
                box.slideUp(500, function(){
                    box.data('status','closed');
                });
            });
        }else{
            box.slideDown(500, function(){
                xButton.fadeIn(500, function(){
                    box.data('status','opened');
                });
            });
        }
    });

    $('.contact .box span').on('click', function(){
        $(this).fadeOut(500, function(){
            $(this).parent().slideUp(500, function(){
                $(this).data('status','closed');
            });
        });
    });

    $(window).on('load', function() {
        $('.loader .cssload-aim').fadeOut(1000, function () {
            $(this).parent().fadeOut(1000);
        });
    });

    // Activate WoW 

    var wowActive = true;
    var wowSections = ['.top-header', '.banner', 'nav', '.about-us', '.our-approch', 
        '.steps .holder', '.our-work', '.projects .holder', '.contact', '.get-in-touch', 'footer'
    ];
    if(wowActive){
        for(var i=0; i<wowSections.length; i++){
            $(wowSections[i]).addClass('wow').prop('data-wow-delay', '1s');
        }
    }

    new WOW().init();


    // Trigger NiceScroll
    $("html").niceScroll({
        cursorcolor: '#dd2a24',
        cursoropacitymin: 1,
        cursorwidth: '15px',
        cursorborder: '1px solid #FFF',
        cursorborderradius: 0,
        cursorminheight: 70,
        horizrailenabled:false
    });

});