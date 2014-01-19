document.addEventListener('scroll',function(){
    var height = $('#signup').height();
    if (window.scrollY >= height+1) {
        $('#header').css({
            'position':'absolute',
            'top':height-300
        });
    } else {
        $('#header').css({
            'position':'fixed',
            'top':0
        });
    }
});

