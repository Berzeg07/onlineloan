$(document).ready(function() {

    $(".switch__button").on("click", function() {
        var $button = $(this);
        var element = $button.parent().find(".product__counter");
        var oldValue = element.text();
        if ($button.parent().hasClass('product__amount')) {
            if ($button.text() == "+") {
                var newVal = parseFloat(oldValue) + 1000;
            } else {
                if (parseFloat(oldValue) < 3000) {
                    return;
                }
                var newVal = parseFloat(oldValue) - 1000;
            }
        } else {
            if ($button.text() == "+") {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                if (parseFloat(oldValue) < 8) {
                    return;
                }
                var newVal = parseFloat(oldValue) - 1;
            }
        }
        $button.parent().find(".product__counter i").html(newVal);
    });

    var mySwiper = undefined;

    function initSwiper() {
        var screenWidth = $(window).width();
        if (screenWidth < 992 && mySwiper == undefined) {
            mySwiper = new Swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    767: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 2
                    },
                    991: {
                        slidesPerView: 3
                    }
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        } else if (screenWidth > 991 && mySwiper != undefined) {
            mySwiper.destroy();
            mySwiper = undefined;
            jQuery('.swiper-wrapper').removeAttr('style');
            jQuery('.swiper-slide').removeAttr('style');
        }
    }

    //Swiper plugin initialization
    initSwiper();

    //Swiper plugin initialization on window resize
    $(window).on('resize', function() {
        initSwiper();
    });

});
