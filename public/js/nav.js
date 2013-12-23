document.addEventListener('scroll',function(){
    var height = $('#post-nav-header').height();
    if (window.scrollY <= height) {
        $('#navbar').css({
            'position':'fixed',
            'width':'100%',
            'top':0
        });
    } else {
        $('#navbar').css({
            'position':'absolute',
            'top':height-45
        });
    }
});
