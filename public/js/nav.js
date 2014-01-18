document.addEventListener('scroll',function(){
    var height = $('#post-nav-header').height();
    if (window.scrollY >= height+1) {
        $('#navbar').css({
            'position':'absolute',
            'top':height-45
        });
    } else {
        $('#navbar').css({
            'position':'fixed',
            'top':0
        });
    }
});
