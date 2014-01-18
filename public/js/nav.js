document.addEventListener('scroll',function(){
    var height = $('#post-nav-header').height();
    if (window.scrollY >= height-10) {
        $('#navbar').css({
            'position':'absolute',
            'top':height-55
        });
    } else {
        $('#navbar').css({
            'position':'fixed',
            'top':0
        });
    }
});
