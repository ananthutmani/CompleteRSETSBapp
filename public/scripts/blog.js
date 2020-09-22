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
            to: 10,
            speed: 800,
            refreshInterval: 25,
            onComplete: function (value) {
                console.debug(this);
            }
        });
        $('.timer2').countTo({
            from: 0,
            to: 50,
            speed: 1000,
            refreshInterval: 25,
            onComplete: function (value) {
                console.debug(this);
            }
        });
        $('.timer3').countTo({
            from: 0,
            to: 300,
            speed: 1200,
            refreshInterval: 25,
            onComplete: function (value) {
                console.debug(this);
            }
        });
    });
});
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
