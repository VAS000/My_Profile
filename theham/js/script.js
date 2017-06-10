$(function(){

    // Adjust Header Height 
    //$('.header').height($(window).height() - $('.navbar').outerHeight() - 100);

    // About Company Section Selection
    $('.about-company ul li').on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.section-content').hide();
        $('#section' + $(this).data('section')).show();
    });

    // Progress Bar Change To Relevant Data
    $('.my-progress span').each(function(){
        $(this).css({
            width: $(this).parent().data('complete') + '%',
            backgroundColor: '#' + $(this).parent().data('color')
        })
    });

    // MixitUp
    $('.work').mixItUp();
    $('.work ul.list li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    // Services Toggle Active item And Show Corresponding Section
    $('.services ul li').on('click', function(){
        /*
        var first = $(this).parent().find('li:first-child').text();
        var current = $(this).text();
        $(this).text(first);
        $(this).parent().find('li:first-child').text(current);
        */
        $(this).addClass('active').siblings().removeClass('active');
        $('.services .holder > div').fadeOut(350).delay(350);
        $('.services #section' + $(this).data('section')).fadeIn(350);
    });

    // Breaking News Hover Effect
    $('.breaking-news .box').hover(function(){
        $(this).find('.date').css('backgroundColor', '#18cfab');
        $(this).find('h4').css('color', '#18cfab');
    }, function(){
        $(this).find('.date').css('backgroundColor', '#203e38');
        $(this).find('h4').css('color', '#717171');
    });

    // Pricing Hover

    $('.pricing-table .box').hover(function(){
        $(this).addClass('active');
        $(this).find('.price').css('backgroundColor', '#18cfab');
        $(this).find('h4').css('color', '#18cfab');
    }, function(){
        $(this).removeClass('active');
        $(this).find('.price').css('backgroundColor', '#2e4a5b');
        $(this).find('h4').css('color', '#2e4a5b');
    })

    // Testimonials Slider 

    $('.testimonials ul li[data-slide]').on('click', function(){
        var li = $(this);
        var length = $('.testimonials ul li img').length;
        if(li.attr('data-slide') === 'next'){
            var active = li.siblings('.active');
            if(active.next().attr('data-agent')){
                active.removeClass('active').next().addClass('active');
                $('.testimonials .box').fadeOut(350).delay(350);
                $('#agent' + active.next().data('agent')).fadeIn(350);
            }else{
                active.removeClass('active');
                $('.testimonials ul li').eq(1).addClass('active');
                $('.testimonials .box').fadeOut(350).delay(350);
                $('#agent' + $('.testimonials ul li').eq(1).data('agent')).fadeIn(350);
            }
        }else{
            var active = li.siblings('.active');
            if(active.prev().attr('data-agent')){
                active.removeClass('active').prev().addClass('active');
                $('.testimonials .box').fadeOut(350).delay(350);
                $('#agent' + active.prev().data('agent')).fadeIn(350);
            }else{
                active.removeClass('active');
                $('.testimonials ul li').eq(length).addClass('active');
                $('.testimonials .box').fadeOut(350).delay(350);
                $('#agent' + $('.testimonials ul li').eq(length).data('agent')).fadeIn(350);
            }
        }
    });

    $('.testimonials ul li img').on('click', function(){
        $(this).parent().addClass('active').siblings().removeClass('active');
        $('.testimonials .box').fadeOut(350).delay(350);
        $('#agent' + $(this).parent().data('agent')).fadeIn(350);
        /*else if($(this).has('i')){
            var active = li.siblings('.active');
            if(active.prev().attr('data-agent')){
                var data = active.prev().data('agent');
                active.removeClass('active').prev().addClass('active');
                $('.testimonials .box').fadeOut(350).delay(350);
                $('#agent' + data).fadeIn(350);
            }else if()
        }
        */
    });

    // Our Team Effect On Hover
    $('.our-team .image').hover(function(){
        $(this).find('.overlay').fadeIn(300).end().find('.circle').fadeIn(300);
        $(this).next().css('backgroundColor', '#18cfab').find('span:not(:first-of-type)').css('color', '#2e4a5b');
    }, function(){
        $(this).find('.overlay').fadeOut(300).end().find('.circle').fadeOut(300);
        $(this).next().css('backgroundColor', '#2e4a5b').find('span:not(:first-of-type)').css('color', '#18cfab');
    });
    
    // Adjust Google Map Dimensions
    $('.contact .map iframe').height($('.contact .info').height());

    // Responsive Small Size Font Header 
    function headerResize(){
        if($(window).width() <= 768){
            $('h3').each(function(){
                if($(this).next().is('.separator')){
                    $(this).css({
                        fontSize: '36px',
                        marginTop: '0px'
                    });
                }
            });
        }   
    }

    headerResize();
    // Window Resize
    $(window).resize(function(){
        headerResize();
    });

    // Attach WOWJS And Animate Classes
    var animateEffects = [
        "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp",
        "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInRight", "fadeInUp",
        "flip", "flipInX", "flipInY",
        "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight",
        "slideInUp", "slideInDown", "slideInLeft", "slideInRight",
        "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp"
    ];

    /*
    $('body > div').each(function(){
        $(this).addClass(animateEffects[Math.floor(Math.random() * animateEffects.length)]);
        $(this).addClass('wow');
    });
    */
    
    // Trigger WOWJS
    new WOW().init();

    // Trigger NiceScroll

    $("html").niceScroll({
        cursorcolor: '#18cfab',
        cursoropacitymin: 1,
        cursorwidth: '10px',
        cursorborder: '#2e4a5b',
        cursorborderradius: 0,
        cursorminheight: 40
    });

    // Scroll When Click on Links
    $('.navbar ul li a').click(function () {
        if($(this).attr('data-section')){
            $('html, body').animate({
                scrollTop: $('#' + $(this).data('section')).offset().top
            }, 1000);
        }
    });

});