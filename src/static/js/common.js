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
        }else{
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

});
