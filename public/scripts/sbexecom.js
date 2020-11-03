new WOW().init();
// Preloader
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
    const fadeEffect = setInterval(() => {
        if (!loader.style.opacity) {
            loader.style.opacity = 1;
        }
        if (loader.style.opacity > 0) {
            loader.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 50);
    setTimeout(function () {
        loader.style.visibility = "hidden";
    }, 700);
});
// execom
var images1 = document.getElementsByClassName('disappear1');
var images2 = document.getElementsByClassName('disappear2');
var cards = document.getElementsByClassName('disappear3');
var btn1 = document.querySelector('.tier1');
var btn2 = document.querySelector('.tier2');
var btn3 = document.querySelector('.tier3');
var cardbtn1 = document.querySelector('.cardbutton1');
var cardbtn2 = document.querySelector('.cardbutton2');
function expand1() {
    for (var i = 0; i < images1.length; i++)
        images1[i].classList.toggle('d-none');
    btn1.classList.toggle('d-none');
    btn2.classList.toggle('d-none');
}
function expand2() {
    for (var i = 0; i < images2.length; i++)
        images2[i].classList.toggle('d-none');
    btn2.classList.toggle('d-none');
    btn3.classList.toggle('d-none');
}
function expand3() {
    for (var i = 0; i < cards.length; i++)
        cards[i].classList.toggle('d-none');
    cardbtn1.classList.toggle('d-none');
    cardbtn2.classList.toggle('d-none');
}