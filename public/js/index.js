document.addEventListener('scroll',function(){
    var height = $('#signup').height();
    if (window.scrollY >= height+40) {
        $('#header').css({
            'position':'absolute',
            'top':height-260
        });
    } else {
        $('#header').css({
            'position':'fixed',
            'top':0
        });
    }
});
