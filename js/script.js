$(function(){
    
    // Declare Global Variables 
    var slideBar = $('.slidebar');
    var wrapper = $('.wrapper');
    var footerWidth = $('.footer').width();


    // On window resize

    $(window).resize(function(){
        if(slideBar.width() != 200){
            $('.footer, .wrapper .head').css({
                width: '100%'
            });
        }else{
            $('.footer, .wrapper .head').css({
                width: 'calc(100% - 200px)'
            });
        }
    })


    // Slidebar Toggle "active" Class 
    $('.slidebar').find('li').on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    // Slidebar Add Animation Class On Hover 
    slideBar.find('a').addClass('animation-all-3ms');
    slideBar.find('a').hover(function(){
        $(this).css('font-size', '16px');
    }, function(){
        $(this).css('font-size', '15px');
    });


    slideBar.find('a').on('click', function(){
        var data = $(this).data('section');
        wrapper.find('.slide').fadeOut(350).delay(350);
        $('.' + data).fadeIn(350);
        if(data == 'skills'){
            progressBarAnimation();
        }
        $('.toggleMenu').click();
    });

    // Animate Wrapper After Clicking On Toggle Button 
    $('.toggleMenu').on('click', function(){
        var time = 500;
        if(slideBar.width() == 200){
            slideBar.hide(time);
            slideBar.animate({
                width: 0,
            });
            wrapper.animate({
                marginLeft: 0
            }, time);
            $('.footer, .wrapper .head').animate({
                width: '100%'
            }, time);
        }else{
            slideBar.show(0);
            slideBar.animate({
                width: 200,
            });
            wrapper.animate({
                marginLeft: 200
            },time);
            $('.footer, .wrapper .head').animate({
                width: $('.footer').width() - 200
            }, time);
        }
        $(this).find('span:nth-child(2)').toggle();
        $(this).find('span:first-child').toggleClass('rotatePlus');
        $(this).find('span:last-child').toggleClass('rotateMinus');
    });

    // Activate And Trigger Circular Progress Bar After Clicking On 'Skills'

    function progressBarAnimation(){
        var countCircles = 0;
        $('.circle').each(function(){
            var percent = $(this).data('percent') / 100;
            var circleColor = '#2C3E50';
            if(countCircles % 2 === 0){
                circleColor = '#E74C3C';
            }
            $(this).circleProgress({
                value: percent,
                size: 200,
                fill: {
                    color: circleColor
                }
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(Math.round($(this).data('percent') * progress) + '<i>%</i>');
            });
            countCircles++;
        });
    }


    // MixitUp
    //$('.work').mixItUp();
    //$('.work ul.list li').on('click', function () {
    //    $(this).addClass('active').siblings().removeClass('active');
    //});

    // Work Hover on image Effect 

    $('.work .mix').mouseenter(function(){
        var content = $(this).find('.content');
        if(!content.hasClass('work-animating')){
            content.addClass('work-animating');
            content.slideDown(500, function(){
                content.removeClass('work-animating');
            });
        }
    });

    $('.work .mix').mouseleave(function(){
        $(this).find('.content').slideUp(500);
    });

    $('.slide:not(".about")').hide();


    // Send AJAX Request 
    
    $('#submit').on('click', function(e){
        e.preventDefault();
        showMessage('form .message', 'error', 'Form Submition Is Disabled', 600, 2000);
        /*
        $('.contact form .error_field').css('display', 'none');
        var formData = $(this).closest('form').serialize();
        $.ajax({
            type: "POST",
            url: 'ajax.php',
            data: formData,
            datatype: 'json',
            cache: false,
            contentType: 'application/x-www-form-urlencoded',
            success: function(response){
                grecaptcha.reset();
                $('.contact form .loader').hide(500);
                $('.contact form [name]').css('border-color', '#080');
                var response = JSON.parse(response);
                if(response.success){
                    showMessage('form .message', 'success', response.success, 600, 2000);
                    $('#submit').prop('disabled', true).css({
                        cursor: 'not-allowed',
                        backgroundColor: '#29C62C',
                        borderColor: '#2C3E50'
                    }).text('Thank you !');
                }else if(response.internal_error){
                    showMessage('form .message', 'error', response.internal_error, 600, 2000);
                }else{
                    var object = response.errors;
                    for(var prop in object){
                        var se = 'input[name='+prop+']';
                        var ob = object[prop];
                        var value = ob[Object.keys(ob)[0]];
                        var selector = $('.contact form [name='+prop+']');
                        selector.css('border-color', '#E74C3C');
                        if(!selector.next().is('.error_field')){
                            selector.after('<div class="error_field">'+value+'</div>');
                        }else{
                            selector.next().text(value);
                        }
                        selector.next().slideDown(500);
                    }
                }
            },
            error: function (r, e) { // (Request, Error)
                var m;
                if (r.status === 0) {
                    m = 'Error: Connection Error';
                } else if (r.status == 404) {
                    m = 'Error: Page Not Found';
                } else if (r.status == 500) {
                    m = 'Error: Internal Server Error';
                } else if (exception === 'parsererror') {
                    m = 'Error: Request Parse Error';
                } else if (exception === 'timeout') {
                    m = 'Erro: Request Time Out';
                } else if (exception === 'abort') {
                    m = 'Error: Request Terminated!';
                } else {
                    m = 'Error: Undefined Error Accured';
                }
                showMessage('form .message', 'error', m, 600, 2000);
                $('.contact form .loader').hide(500);
            },
            //fail: function(){
            //    showMessage('form .message', 'error', 'Sorry. Error while trying to send you message!', 600, 2000);
            //    $('.contact form .loader').hide(500);
            //},
            beforeSend: function() { 
                $('.contact form .loader').show(500);
            }
        });
        */
    });

    // Function To Show Specific Message Based On The Parameters
    function showMessage(selector, status, message, time, delay){
        var className = (status === 'success')? 'success-message':'error-message';
        $(selector).css('display', 'none').text(message).addClass(className).slideDown(time, function(){
            $(this).delay(delay).slideUp(time, function(){
                $(this).removeClass(className).text('');
            });
        });
    }

    // Trigger NiceScroll
    /*
    $('html').niceScroll({
        cursorcolor: '#2C3E50',
        cursoropacitymin: 1,
        cursorwidth: '12px',
        cursorborderradius: 0,
        cursorminheight: 10,
        zindex: 900
    });
    */

    // Change Work Content Color On Hover 
    $('.work .holder .content').each(function(){
        $(this).find('h4').css('color', '#'+$(this).data('color'));
        $(this).find('a').css('border-color', '#'+$(this).data('color'));
    });

    // Testing/Debugging

    $('.captcha').hide();

});