$(document).ready(function() {

    $(".switch__button").on("click", function() {
        var $button = $(this);
        var element = $button.parent().find(".product__counter");
        var oldValue = element.text();
        if ($button.parent().hasClass('product__amount')) {
            if ($button.text() == "+") {
                if (parseFloat(oldValue) > 29000) {
                    return;
                }
                var newVal = parseFloat(oldValue) + 1000;
            } else {
                if (parseFloat(oldValue) < 3000) {
                    return;
                }
                var newVal = parseFloat(oldValue) - 1000;
            }
            var btnParents = $button.parents('tr');
            if (btnParents[0] != undefined) {
                var days = btnParents.find('.product__term i'),
                    totalHtml = btnParents.find('.table-sum'),
                    daysInner = days.text(),
                    totalProcent = newVal * 1 / 100,
                    totalSum = newVal + (totalProcent * parseFloat(daysInner));
                totalHtml.html(totalSum + ' ');
            }
        } else {
            if ($button.text() == "+") {
                if (parseFloat(oldValue) > 29) {
                    return;
                }
                var newVal = parseFloat(oldValue) + 1;
            } else {
                if (parseFloat(oldValue) < 8) {
                    return;
                }
                var newVal = parseFloat(oldValue) - 1;
            }
            var btnParents = $button.parents('tr');
            if (btnParents[0] != undefined) {
                var count = btnParents.find('.product__amount i'),
                    totalHtml = btnParents.find('.table-sum'),
                    countInner = count.text(),
                    totalProcent = parseFloat(countInner) * 1 / 100,
                    totalSum = parseFloat(countInner) + (totalProcent * newVal);
                totalHtml.html(totalSum + ' ');
            }
        }
        $button.parent().find(".product__counter i").html(newVal);
    });

    var mySwiper = undefined;

    function initSwiper() {
        var screenWidth = $(window).width();
        if (screenWidth < 992 && mySwiper == undefined) {
            mySwiper = new Swiper('.product__slider', {
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

    microloans = new Swiper('.microloans-slider', {
        slidesPerView: 7,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            374: {
                slidesPerView: 1
            },
            375: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 4
            },
            991: {
                slidesPerView: 4
            },
            992: {
                slidesPerView: 5
            },
            1279: {
                slidesPerView: 5
            },
            1280: {
                slidesPerView: 6
            },
            1499: {
                slidesPerView: 6
            },
            1500: {
                slidesPerView: 7
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

});
