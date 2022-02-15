var down = document.getElementById("down");
var totop = document.getElementById("totop");
window.addEventListener("scroll", function (event) {
    var scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 500) {
        totop.style.display = 'flex'
    } else {
        totop.style.display = 'none'
    }
});
down.onclick = function () {
    var elt = document.createElement('a');
    elt.setAttribute('href', '/resources/1.png');
    elt.setAttribute('download', 'file.png');
    elt.style.display = 'none';
    document.body.appendChild(elt);
    elt.click();
    document.body.removeChild(elt);
}
totop.onclick = function () {
    cancelAnimationFrame(timer);
    var timer = requestAnimationFrame(function fn () {
        var scrollTop = document.documentElement.scrollTop;
        if (scrollTop > 0) {
            document.documentElement.scrollTop = scrollTop - 50;
            timer = requestAnimationFrame(fn);
        } else {
            cancelAnimationFrame(timer);
        }
    });
}