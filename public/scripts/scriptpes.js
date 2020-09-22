new WOW().init();
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

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("opener").style.display = "none";
    document.querySelector('html').style.overflowY = "hidden";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    setTimeout(function () {
        document.getElementById("opener").style.display = "block";
    }, 600);
    document.querySelector('html').style.overflowY = "scroll";
}

// Foriegn start
var shell = document.querySelector(".parent");
shell.addEventListener("animationend", function () {
    (function ($) {
        $.fn.countTo = function (options) {
            // merge the default plugin settings with the custom options
            options = $.extend({}, $.fn.countTo.defaults, options || {});

            // how many times to update the value, and how much to increment the value on each update
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
            from: 0,  // the number the element should start at
            to: 100,  // the number the element should end at
            speed: 1000,  // how long it should take to count between the target numbers
            refreshInterval: 100,  // how often the element should be updated
            decimals: 0,  // the number of decimal places to show
            onUpdate: null,  // callback method for every time the element is updated,
            onComplete: null,  // callback method for when the element finishes updating
        };
    })(jQuery);

    jQuery(function ($) {
        $('.timer1').countTo({
            from: 0,
            to: 20,
            speed: 800,
            refreshInterval: 25,
            onComplete: function (value) {
                console.debug(this);
            }
        });
        $('.timer2').countTo({
            from: 0,
            to: 35,
            speed: 1000,
            refreshInterval: 25,
            onComplete: function (value) {
                console.debug(this);
            }
        });
        $('.timer3').countTo({
            from: 0,
            to: 45,
            speed: 1200,
            refreshInterval: 25,
            onComplete: function (value) {
                console.debug(this);
            }
        });
    });
});
// Foriegn end
// gallery start
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
// gallery end 
// PES membership benefits
var cards = document.getElementsByClassName('disappear3');
var cardbtn1 = document.querySelector('.cardbutton1');
var cardbtn2 = document.querySelector('.cardbutton2');
function expand3() {
    for (var i = 0; i < cards.length; i++)
        cards[i].classList.toggle('d-none');
    cardbtn1.classList.toggle('d-none');
    cardbtn2.classList.toggle('d-none');
}
// PES membership benefits end
// Testimonial
$(document).ready(function () {
    $("#testimonial-slider").owlCarousel({
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
// $(window).scroll(function() {
//     var hT = $('#counter').offset().top,
//         hH = $('#counter').outerHeight(),
//         wH = $(window).height(),
//         wS = $(this).scrollTop();
//      console.log((hT-wH) , wS);
//     if (wS > (hT+hH-wH)){
//      $('#opener').css('background-image','url(../../images/svgs/ham1.svg)');
//     }
//     if (wS < (hT+hH-wH)){
//      $('#opener').css('background-image','url(../../images/svgs/ham.svg)');
//     }
//  });