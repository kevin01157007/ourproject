window.onload = function() {
    setInterval(function() {
        document.getElementById('goboard').classList.toggle('fadeInOut');
        document.getElementById('goboard1').classList.toggle('fadeInOut');
    }, 4000);
    document.querySelector('.hamburger').addEventListener('click', function() {
        var sidebar = document.querySelector('.sidebar');
        var width = getComputedStyle(sidebar).width;
        if (width === '0px') {
            sidebar.style.width = '250px';
        } else {
            sidebar.style.width = '0px';
        }
    });
};