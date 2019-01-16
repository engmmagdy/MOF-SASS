$(function () {
    $.fn.fontResizer = function (options) {
        var defaults = {
            increaseFont: " ", // increase font size
            decreaseFont: " ", // decrease font size
            defaultFont: " ", // default font size
            resizingArea: " ", // specific area to apply font resizer
            incLevel: "2", // increasing level
            decLevel: "1", // decreasing level
    };
        options = $.extend({}, defaults, options);
        return this.each(function () {
            
            $(options.resizingArea).each(function () {
                var defaultFont = parseInt($(this).css("font-size"));
                $(this).attr("data-font", defaultFont)
            });

            $(options.increaseFont).click(function () { // ++	
                $(options.resizingArea).each(function () {
                    var fontSize = parseInt($(this).css("font-size"));
                    var DefFont = parseInt($(this).attr("data-font"));
                    if ((fontSize - DefFont) == options.incLevel)
                        return;

                    fontSize = fontSize + 1 + "px";
                    $(this).css({ 'font-size': fontSize });
                });
            });

            $(options.decreaseFont).click(function () { // --	
                $(options.resizingArea).each(function () {
                    var fontSize = parseInt($(this).css("font-size"));
                    var DefFont = parseInt($(this).attr("data-font"));
                    if ((DefFont - fontSize) == options.decLevel)
                        return;

                    fontSize = fontSize - 1 + "px";
                    $(this).css({ 'font-size': fontSize });
                });
            });

            $(options.defaultFont).click(function () { // default	
                $(options.resizingArea).each(function () {
                    var DefFont = parseInt($(this).attr("data-font"));
                    $(this).css({ 'font-size': DefFont });
                });
            });

        });
    };

});
