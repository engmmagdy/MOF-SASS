/******************************************
    clear sharepoint new added elements in the DOM  after rendering
*******************************************/
function clearSPElements(selector) {
    $(selector).find("li.dfwp-item").each(function () {
        // get selector item structure
        var _itemHtml = $(this).html();
        $(selector).append(_itemHtml);
        // remove sharepoint elements
        $(selector).find(".ms-webpart-zone").remove();
    })
}


var direction = true;

function slickSlider(selector, dots, arrows, infinite, autoplaySpeed, prevArrow, nextArrow, direction, slidesToShow, slidesToScroll, autoplay, slide, fade, speed) {
    $(selector).slick({
        slide: slide,
        rtl: direction,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        infinite: infinite,
        fade: fade,
        autoplay: autoplay,
        autoplaySpeed: autoplaySpeed,
        speed: speed,
        prevArrow: prevArrow, //"<span class='prevArrow arrows'><i class='fa fa-angle-right'></i></span>",
        nextArrow: nextArrow, //"<span class='nextArrow arrows'><i class='fa fa-angle-left'></i></span>",
        dots: dots,
        arrows: arrows,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]


    });
}


/******************************************
   tooltip
*******************************************/

var slickDirection = true;



/******************************************
   detect browser version
*******************************************/
function detectBrowserVersion() {
    var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

        return 'IE' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) return 'Opera ' + tem[1];
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);

    return M.join('');
};

//  Format the SP Date Arabic and English

function SPdateFormat(datetoFormat) {
    //debugger;

    var date = datetoFormat.split(' ')[0].split('/')
    var formatedDate = new Date(date[2], date[1] - 1, date[0]);
    var locale = (window.location.href.indexOf('/') > -1) ? "ar-kw" : "en-us";
    monthName = formatedDate.toLocaleString(locale, {
        month: "long"
    });
    return ((formatedDate.getDate()) + ' ' + monthName + ' ' + formatedDate.getFullYear());
}

// substring text contnet function 
function listLimit(elm, line) {
    var maxHeight = parseInt(elm.css('line-Height')) * line;

    while (elm.height() > maxHeight) {
        var text = elm.text();
        elm.text(text.substring(0, text.length - 10)).text(elm.text() + '...');
    }
}



$(document).ready(function () {

    if (_spPageContextInfo.currentUICultureName != "ar-SA") {
        slickDirection = false;
        direction = false;
    }

    /*edit mode*/
    // returns 1 if in edit mode or not 
    var IsEditMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;

    if (IsEditMode != "1") {
        clearSPElements('.prev-minister .timeline');
        clearSPElements('.faq-section .accordion');
        clearSPElements('.mof-timeline');
    } else {
        $("body").addClass("editMode");
    }

    var mofUrl = $("#aspnetForm").attr('action');
    if (mofUrl != true) {
        $("body").addClass('internal-pages');
    }


    // Set childs Menu Animation
    //$(".MainMenu ul[id*=RootAspMenu] > li.static ul.dynamic").addClass("animated fadeInDown");

    //Get Mega Menu Content from SP List with Rest Service

    var URLpoint = "/" + _spPageContextInfo.webServerRelativeUrl.split("/")[0] + "_api/web/Lists/getbytitle('MegaMenuContent')/items";
    //console.log(URLpoint);
    $.ajax({
        url: URLpoint,
        type: "GET",
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        cache: false,
        success: function (data) {
            $(data.d.results).each(function () {
                var sortOrder = this.sortOrder;
                var ttl = this.MenuContent;
                $(".MainMenu ul[id$=RootAspMenu] > li").eq(sortOrder).find("ul.dynamic").append("<li>" + ttl + "</li>");
            });
        }
    });


    //Format the SP Date Arabic and English
    $('.news-list .card').each(function () {
        var dateArea = $(this).find('.card--date span');
        dateArea.html(SPdateFormat(dateArea.text()));
    })

    // Announcement slider
    slickSlider('.home-announcments .slider', false, true, true, 5000, '<i class="material-icons prevArrow  arrows">keyboard_arrow_right</i>', '<i class="material-icons nextArrow arrows ">keyboard_arrow_left</i>', slickDirection, 1, 1, false, 'article', false, 1000);

    slickSlider('.media-announcements  .slider', true, false, true, 8000, '<i class="material-icons prevArrow  arrows">keyboard_arrow_right</i>', '<i class="material-icons nextArrow arrows ">keyboard_arrow_left</i>', slickDirection, 1, 1, true, 'article', false, 1000);

    // Eservice slider
    //slickSlider('.mof-services .slider', true, true, true, 5000, '<i class="material-icons prevArrow  arrows">arrow_forward</i>', '<i class="material-icons nextArrow arrows ">arrow_back</i>', slickDirection, 5, 5, false, 'article', false, 1000);


    // News slider
    slickSlider('.media-center .media-news .dfwp-list', true, false, true, 5000, '', '', slickDirection, 1, 1, true, 'li', false, 1000);

    //slickSlider('.home-news .dfwp-list', true, false, true, 5000, '', '', slickDirection, 1, 1, false, 'li', false, 1000);




    slickSlider('.mainBanner .slider', false, false, true, 7000, '', '', slickDirection, 1, 1, true, 'article', true, 3000);

    $('.news-item .card--description').each(function () {
        listLimit($(this), 2.8)
    })


    $('.pager *').each(function () {
        $(this).html($(this).html().replace(/&nbsp;/gi, ''));
    });

    //  Laws and Policies

    slickSlider('.laws-policies .slider', true, false, true, 5000, '', '', slickDirection, 4, 1, false, 'article', false, 1000);

    // Add mofAds slider
    $('a[href="#mofAds"]').on('shown.bs.tab', function () {
        slickSlider('.ministry-ads .slider', false, true, true, false, '<span class="prevArrow arrows"><i class="fa fa-angle-right"></i></span>', '<span class="nextArrow arrows"><i class="fa fa-angle-left"></i></span>', slickDirection, 3, 3, false, 'article', false, 1000);
    });


    // $('.selectpicker').selectpicker();
    $("#grayscale-mode").on("click", function (evt) {
        evt.preventDefault();
        $("body").toggleClass("body--grayscale");
    });

    //Set investment guide Tabs
    /*$("select#lawsSelectors").on("change", function (event) {
        event.preventDefault();
        var tab = $(this).val();
        $(".grid-view.laws .content").not(tab).css("display", "none");
        $(tab).fadeIn();

    });*/


    //Set investment guide Tabs
    /*$("select#decreesSelectors").on("change", function (event) {
        event.preventDefault();
        var tab = $(this).val();
        $(".grid-view.decrees .content").not(tab).css("display", "none");
        $(tab).fadeIn();

    });*/


    //  Set card-header background image;
    /*$(".main-auctions .card .card-header, .twitter .card-header").each(function () {
        var imageSrc = $(this).next().find(".card--photo img").attr("src");
        $(this).append('<img src=\'' + imageSrc + '\' />');
        $(this).addClass("opacity-background");
        //console.log(imageSrc);
    });*/

    $('#auctionTime0').countdown({
        until: 3650011,
        padZeroes: true
    });
    $('#auctionTime1').countdown({
        until: 3650011,
        padZeroes: true
    });
    $('#auctionTime2').countdown({
        until: 3650011,
        padZeroes: true
    });
    $('#auctionTime3').countdown({
        until: 3650011,
        padZeroes: true
    });
    $('#auctionTime4').countdown({
        until: 3650011,
        padZeroes: true
    });
    $('#auctionTime5').countdown({
        until: 3650011,
        padZeroes: true
    });
    $('#auctionTime6').countdown({
        until: 3650011,
        padZeroes: true
    });
    $('#auctionTime7').countdown({
        until: 3650011,
        padZeroes: true
    });


    // Current Language  Start
    var otherCultureLang = null;
    var absoluteUrl = window.location.href; // returns absolute URL
    // returns current site language
    // var cultureLang = _spPageContextInfo.currentUICultureName.toLowerCase();
    var cultureLang = _spPageContextInfo.currentUICultureName.toLowerCase();


    if (cultureLang == "en-us")
        cultureLang = 'en';
    else
        cultureLang = 'ar';



    // $(".side-navbar .navbar-brand a").attr("href","/"+cultureLang);					// side logo url to current site collection

    if (_spPageContextInfo.currentUICultureName.toLowerCase() == "en-us")
        otherCultureLang = 'ar';
    else
        otherCultureLang = 'en';

    var variationLangUrl = absoluteUrl.replace(cultureLang, otherCultureLang); // returns other language absolute URL
    //$("#siteLogo").attr("href", variationLangUrl); // sets URL in change language button


    // check if user logged in or not
    if (typeof _spPageContextInfo.userId != 'undefined') {
        // Logged in
        // $(".projects-notes").hide();
    } else {
        //Anonymous

    }

    // Current language End
    //Detect your browser version and set class name in html tag
    var _detectBrowser = detectBrowserVersion();
    $("html").addClass(_detectBrowser);




    // Increase and Decreas Fonts 
    $(document).fontResizer({
        increaseFont: "#fontIncrease", // increase font size
        decreaseFont: "#fontDerease", // decrease font size
        defaultFont: "#fontDefault", // default font size
        resizingArea: ".inner-page .inner--title,.inner-page .inner--date, .inner-page .inner-description, .l-full-details .page--title, .l-full-details .page--description ", // specific area to apply font resizer
        incLevel: "5", // increasing level
        decLevel: "2", // decreasing level
    });


    //Back to Top button 
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 200) { // If page is scrolled more than 50px
            $('#backtoTop').fadeIn('normal'); // Fade in the arrow
        } else {
            $('#backtoTop').fadeOut('normal'); // Else fade out the arrow
        }
    });
    $('#backtoTop').click(function () { // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0 // Scroll to top of body
        }, 600);
    });



});



// =====================================================================================================================================================
// Addon Sticky navbar

/*jQuery(window).on("scroll", function () {
    var scrolltop = jQuery(this).scrollTop();
    if (scrolltop >= 147) {
        //jQuery("header .main-header").addClass("sticky");

    } else {
        if (scrolltop < 147) {
            //jQuery("header .main-header").removeClass("sticky");

        }
    }
});*/

// ======================================================================================================================================================



// chartJS
window.chartColors = {
    red: '#970e2b',
    green: 'rgb(75, 192, 192)',
    blue: '#2076ce'

};

var config = {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                7.9,
                21.5,
                15.0
            ],
            backgroundColor: [
                window.chartColors.red,
                window.chartColors.blue,
                window.chartColors.green
            ],
            label: 'Dataset 1',
        }],
        labels: [
            'عجز الموازنة',
            'المصروفات',
            'الايرادات'
        ],

    },
    options: {
        responsive: true,
        legend: {
            labels: {
                // This more specific font property overrides the global property
                fontFamily: "CairoFont",
                fontSize: 14
            }
        }
    }
};
jQuery.fn.exists = function () {
    return this.length > 0;
}

window.onload = function () {
    if ($(".general-budget").exists()) {
        var ctx = document.querySelector('#chart-area').getContext('2d');
        window.myPie = new Chart(ctx, config);
    }
};



// Print function
function pritFunction() {
    window.print();
}