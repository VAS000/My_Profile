$(function(){
    
    // Trigger BxSlider 
    $('.bxslider').bxSlider({
        minSlides: 1,
        maxSlides: 3,
        pager: false,
        nextSelector: '.slider-next',
        prevSelector: '.slider-prev',
        nextText: '<i class="glyphicon glyphicon-chevron-right arrow-right"></i>',
        prevText: '<i class="glyphicon glyphicon-chevron-left arrow-left"></i>',
        slideWidth: $('.bxslider > div').width(),
        slideMargin: 10,
        pager: true
    });
});