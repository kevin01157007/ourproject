document.querySelector('.hamburger').addEventListener('click', function() {
    var sidebar = document.querySelector('.sidebar');
    var width = getComputedStyle(sidebar).width;
    if (width === '0px') {
        sidebar.style.width = '250px';
    } else {
        sidebar.style.width = '0px';
    }
});