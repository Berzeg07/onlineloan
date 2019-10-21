$(document).ready(function() {

    $('.burger').click(function() {
        $(this).toggleClass('active');
        $('.main-nav').toggleClass('active');
    });

    $('.main-nav__top').click(function() {
        var $this = $(this);
        if (!$this.hasClass("active")) {
            $(".main-nav__inner").slideUp();
            $(".main-nav__top").removeClass("active");
        }
        $this.toggleClass("active");
        $this.next().slideToggle();
    });

    $(function() {
        $(document).click(function(event) {
            if ($(event.target).closest(".burger").length) return;
            if ($(event.target).closest(".main-nav").length) return;

            $('.burger').removeClass('active');
            $('.main-nav').removeClass('active');
            event.stopPropagation();
        });
    });

    $(function() {
        $(document).click(function(event) {
            if ($(event.target).closest(".main-nav").length) return;
            $('.main-nav__inner').slideUp();
            $('.main-nav__top').removeClass('active');
            event.stopPropagation();
        });
    });

    // custom select *
    $('.select-custom select').select2();

    var elem = document.querySelector('#js-range');
    var init = new Powerange(elem, {
        min: 10000,
        max: 100000,
        start: 45000,
        step: 1000
    });

    var elem2 = document.querySelector('#range-header');
    if (elem2 != null) {
        var init = new Powerange(elem2, {
            min: 10000,
            max: 100000,
            start: 30000,
            step: 1000
        });
    }

    var elemDay = document.querySelector('#day-range');
    var init = new Powerange(elemDay, {
        min: 1,
        max: 735,
        start: 41,
        step: 1
    });

    var elemDay2 = document.querySelector('#day-range-header');
    if (elemDay2 != null) {
        var init = new Powerange(elemDay2, {
            min: 1,
            max: 735,
            start: 30,
            step: 1
        });
    }

    var daysObj = {
        Mon: 'Понедельник',
        Tue: 'Вторник',
        Wed: 'Среда',
        Thu: 'Четверг',
        Fri: 'Пятница',
        Sat: 'Суббота',
        Sun: 'Воскресенье'
    }

    var monthObj = {
        Jan: 'Января',
        Feb: 'Февраля',
        Mar: 'Марта',
        Apr: 'Апреля',
        May: 'Мая',
        Jun: 'Июня',
        Jul: 'Июля',
        Aug: 'Августа',
        Sep: 'Сентября',
        Oct: 'Октября',
        Nov: 'Ноября',
        Dec: 'Декабря'
    }

    var curent = Date.now();

    function showDate(dayVal) {
        var daysNum = +dayVal;
        var future = new Date(curent + daysNum * 24 * 60 * 60 * 1000);
        $('#resDate').html(future);
        var str = $('#resDate').html();
        var arr = str.split(' ');
        arr.splice(4, 6);
        var dayArr = arr[0],
            monthArr = arr[1],
            numArr = arr[2],
            yearArr = arr[3];
        if (numArr.charAt(0) === '0')
            numArr = numArr.slice(1);
        var stringInner = `<li>${daysObj[dayArr]}</li><li>${numArr} ${monthObj[monthArr]}, ${yearArr}</li>`
        $('#resDate').html(stringInner);
    }

    function displayValue() {
        $('#calcSum').val(elem.value);
        $('#calcDay').val(elemDay.value);
        if (elem2 != null) {
            $('#calcSumHeader').val(elem2.value);
            $('#calcDayHeader').val(elemDay2.value);
        }
        resTotal();
        var dayInner = $('#calcDay').val();
        showDate(dayInner);
    }

    function resTotal() {
        var sum = $('#calcSum').val(),
            day = $('#calcDay').val(),
            proc = $('.calc-res__proc i').html(),
            total = (sum * proc / 100) * +day + +sum;
        $('#total').html(total);
    }

    elem.onchange = function() {
        $('#calcSum').val(elem.value);
        resTotal();
    };
    elemDay.onchange = function() {
        $('#calcDay').val(elemDay.value);
        var dayInner = $('#calcDay').val();
        showDate(dayInner);
        resTotal();
    };

    // elem2.onchange = function() {
    //     $('#calcSumHeader').val(elem2.value);
    // };
    // elemDay2.onchange = function() {
    //     $('#calcDayHeader').val(elemDay2.value);
    // };

    displayValue();


    $('.bank-tabs span').click(function() {
        $('.bank-tabs span').removeClass('active');
        $(this).addClass('active');
    });

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


    banner = new Swiper('.banner-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        simulateTouch: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

    });

    loanterm = new Swiper('.loanterm-slider', {
        slidesPerView: 7,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            499: {
                slidesPerView: 1
            },
            500: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3
            },
            1279: {
                slidesPerView: 3
            },
            1280: {
                slidesPerView: 4
            },
            1599: {
                slidesPerView: 4
            },
            1600: {
                slidesPerView: 5
            },
            1800: {
                slidesPerView: 5
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });

});
