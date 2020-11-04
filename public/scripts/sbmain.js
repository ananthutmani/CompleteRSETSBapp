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
// Preloader
// Scroll Color Change
$(function () {
    $(document).scroll(function () {
        var $nav = $("#navbr");
        var $home = $("#home");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $home.height());
    });
});
// Scroll Color Change
// for counter
var shell = document.querySelector(".parent");
shell.addEventListener("animationend", function () {
    (function ($) {
        $.fn.countTo = function (options) {
            options = $.extend({}, $.fn.countTo.defaults, options || {});
            var loops = Math.ceil(options.speed / options.refreshInterval),
                increment = (options.to - options.from) / loops;

            return $(this).each(function () {
                var _this = this,
                    loopCount = 0,
                    value = options.from,
                    interval = setInterval(updateTimer, options.refreshInterval);

                function updateTimer() {
                    value += increment;
                    loopCount++;
                    $(_this).html(value.toFixed(options.decimals));

                    if (typeof (options.onUpdate) == 'function') {
                        options.onUpdate.call(_this, value);
                    }

                    if (loopCount >= loops) {
                        clearInterval(interval);
                        value = options.to;

                        if (typeof (options.onComplete) == 'function') {
                            options.onComplete.call(_this, value);
                        }
                    }
                }
            });
        };

        $.fn.countTo.defaults = {
            from: 0,
            to: 100,
            speed: 1000,
            refreshInterval: 100,
            decimals: 0,
            onUpdate: null,
            onComplete: null,
        };
    })(jQuery);

    jQuery(function ($) {
        $('.timer1').countTo({
            from: 0,
            to: 30,
            speed: 800,
            refreshInterval: 25,
            onComplete: function (value) {
                console.debug(this);
            }
        });
        $('.timer2').countTo({
            from: 0,
            to: 100,
            speed: 1000,
            refreshInterval: 25,
            onComplete: function (value) {
                console.debug(this);
            }
        });
        $('.timer3').countTo({
            from: 0,
            to: 250,
            speed: 1200,
            refreshInterval: 25,
            onComplete: function (value) {
                console.debug(this);
            }
        });
    });
});
// Counter end
// Gallery
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}
// Gallery
$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 2,
        itemsDesktop: [1000, 2],
        itemsDesktopSmall: [979, 2],
        itemsTablet: [768, 1],
        pagination: false,
        navigation: true,
        navigationText: ["", ""],
        autoPlay: true
    });
});
// Membership cards
var cards = document.getElementsByClassName('disappear3');
var cardbtn1 = document.querySelector('.cardbutton1');
var cardbtn2 = document.querySelector('.cardbutton2');
function expand3() {
    for (var i = 0; i < cards.length; i++)
        cards[i].classList.toggle('d-none');
    cardbtn1.classList.toggle('d-none');
    cardbtn2.classList.toggle('d-none');
}
// Navbar collapsing on outside touch
$(document).click(function (e) {
    if (!$(e.target).is('#navbar')) {
        $('.collapse').collapse('hide');
    }
});
