window.onload = function() {
    setInterval(function() {
        document.getElementById('goboard').classList.toggle('fadeInOut');
        document.getElementById('goboard1').classList.toggle('fadeInOut');
    }, 4000);
};