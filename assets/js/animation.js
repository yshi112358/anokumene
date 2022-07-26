'use strict';
$(window).on('load', function () {

    var $widget = $('iframe.twitter-timeline');
    var $widgetContents = $widget.contents();
    $widgetContents.find('head').append('<link href="./assets/css/tw.css" rel="stylesheet" type="text/css">');

});

var ua = window.navigator.userAgent.toLowerCase();
var isiOS = ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document;

$('.slogan').hide();
scrollOff();

gsap.set(
    ['header img', 'header p', 'header button', '#top', '#news', '#music', '#artist', '#sns'],
    {
        opacity: 0,
        y: -20
    }
);

var video = $(".opening-animation video").get(0);
video.addEventListener("ended", function () {
    $('.opening-animation video').hide();

    $('.slogan').fadeIn(function () {
        $('.curtain').fadeOut(4000, function () {
            scrollOn();
        });
        $('.slogan').delay(3000).fadeOut(1000, function () { $('.opening-animation').hide(); });
        const tl = gsap.timeline();
        tl.to("header img", {
            y: 0,
            opacity: 1,
            duration: 1.5,
            delay: 0.5,
            ease: "power2.inOut"
        }).to("header p", {
            y: 0,
            opacity: 1,
            duration: 1.5,
            delay: -0.5,
            ease: "power2.inOut"
        }).to("header button", {
            y: 0,
            opacity: 1,
            duration: 1.5,
            delay: -1.0,
            ease: "power2.inOut"
        }).to("#top", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut"
        }).to("#news", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut"
        }).to("#music", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut"
        }).to("#artist", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut"
        }).to("#sns", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut"
        });
    });
});

$(function () {
    $(".slogan").mgGlitch({
        // set 'true' to stop the plugin
        destroy: false,
        // set 'false' to stop glitching
        glitch: true,
        // set 'false' to stop scaling
        scale: true,
        // set 'false' to stop glitch blending
        blend: true,
        // select blend mode type
        blendModeType: 'hue',
        // set min time for glitch 1 elem
        glitch1TimeMin: 50,
        // set max time for glitch 1 elem
        glitch1TimeMax: 300,
        // set min time for glitch 2 elem
        glitch2TimeMin: 10,
        // set max time for glitch 2 elem
        glitch2TimeMax: 100,
    });
});

var isMenu = Boolean("false");
$("header button").on('click', function () {
    $('.curtain').fadeTo(200, 0.5);
    $('.cancel').css({ 'top': '50vh', 'left': '30vw' });
    $('.cancel').fadeIn();
    $('.menu').animate({ 'left': '60vw' }, 200);
    isMenu = Boolean("true");
    scrollOff();
});

$(document).on('click', function (e) {
    if (isMenu && ($(e.target).closest('.curtain').length || $(e.target).closest('.cancel').length)) {
        $('.curtain').fadeOut(200);
        $('.cancel').fadeOut(200);
        $('.menu').animate({ 'left': '100vw' }, 200);
        $('.article-detail').animate({ 'bottom': '-100vh' }, 200);
        scrollOn();
    }
});

$('#news .article-button').each(function () {
    var id = $(this).attr('id');
    $.ajax({
        url: './assets/news/' + id + '.txt',
        success: function (data) {
            var data_array = data.split(/\r\n|\r|\n/, 3);  // 改行コードで分割
            $('#' + id).html('<img src="./assets/news/' + id + '.png" class="article-thumbnail">'
                + '<p class="article-date">' + data_array[0] + '</p>'
                + '<p class="article-title">' + data_array[1] + '</p>')
            // $('#' + id + ' .article-date').html(data_array[0]);
            // $('#' + id + ' .article-title').html(data_array[1]);
            // $('#' + id + ' .article-thumbnail').attr('src', './assets/news/' + id + '.png');
        }
    });
});

var currentNews;
$("#news button").on('click', function () {
    var id = $(this).attr('id');
    $.ajax({
        url: './assets/news/' + id + '.txt',
        success: function (data) {
            loadArticle(data, id);
        }
    });

    $('.curtain').fadeTo(200, 0.5);
    $('.cancel').css({ 'top': '10vh', 'left': '50vw' });
    $('.cancel').fadeIn();
    $('.article-detail').animate({ 'bottom': '0vh' }, 200);
    isMenu = Boolean("true");
    scrollOff();
});

// 右矢印処理
$(".article-detail .arrow-right").on('click', function () {
    var id = 'news' + ('0' + (Number(currentNews.slice(-2)) - 1)).slice(-2);

    $.ajax({
        url: './assets/news/' + id + '.txt',
        success: function (data) {
            switchArticle(data, id, -1);
        }
    });
});

// 左矢印処理
$(".article-detail .arrow-left").on('click', function () {
    var id = 'news' + ('0' + (Number(currentNews.slice(-2)) + 1)).slice(-2);

    $.ajax({
        url: './assets/news/' + id + '.txt',
        success: function (data) {
            switchArticle(data, id, 1);
        }
    });
});

function loadArticle(data, id) {
    var data_array = data.split(/\r\n|\r|\n/, 3);  // 改行コードで分割
    $('.article-detail .article-date').html(data_array[0]);
    $('.article-detail .article-title').html(data_array[1]);
    $('.article-detail .article-contents').html(data_array[2]);
    $('.article-detail .article-thumbnail').attr('src', './assets/news/' + id + '.png');
    // 右矢印の有効化
    $('.article-detail .arrow-right').css('opacity', 0.5);
    $.ajax({
        url: './assets/news/news' + ('0' + (Number(id.slice(-2)) - 1)).slice(-2) + '.txt',
        success: function (data) {
            $('.article-detail .arrow-right').css('opacity', 1);
        }
    });
    // 左矢印の有効化
    $('.article-detail .arrow-left').css('opacity', 0.5);
    $.ajax({
        url: './assets/news/news' + ('0' + (Number(id.slice(-2)) + 1)).slice(-2) + '.txt',
        success: function (data) {
            $('.article-detail .arrow-left').css('opacity', 1);
        }
    });
    currentNews = id;
}

function switchArticle(data, id, dir) {
    var tl = gsap.timeline();
    tl.to(".article-detail .article-date", {
        x: 20 * dir,
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut"
    }).to(".article-detail .article-title", {
        x: 20 * dir,
        opacity: 0,
        duration: 0.2,
        delay: -0.1,
        ease: "power2.inOut"
    }).to(".article-detail .article-thumbnail", {
        x: 20 * dir,
        opacity: 0,
        duration: 0.2,
        delay: -0.1,
        ease: "power2.inOut"
    }).to(".article-detail .article-contents", {
        x: 20 * dir,
        opacity: 0,
        duration: 0.2,
        delay: -0.1,
        ease: "power2.inOut",
        onComplete: () => {
            loadArticle(data, id);
        }
    }).set(
        ['.article-detail .article-date', '.article-detail .article-title', '.article-detail .article-thumbnail', '.article-detail .article-contents'],
        {
            opacity: 0,
            x: -20 * dir
        }
    ).to(".article-detail .article-date", {
        x: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut"
    }).to(".article-detail .article-title", {
        x: 0,
        opacity: 1,
        duration: 0.2,
        delay: -0.1,
        ease: "power2.inOut"
    }).to(".article-detail .article-thumbnail", {
        x: 0,
        opacity: 1,
        duration: 0.2,
        delay: -0.1,
        ease: "power2.inOut"
    }).to(".article-detail .article-contents", {
        x: 0,
        opacity: 1,
        duration: 0.2,
        delay: -0.1,
        ease: "power2.inOut"
    });
}

var $window = $(window),
    $html = $('html'),
    $body = $('body'),
    $overlay = $('.overlay'),
    scrollbar_width = window.innerWidth - document.body.scrollWidth,
    touch_start_y;
$window.on('touchstart', function (event) {
    touch_start_y = event.originalEvent.changedTouches[0].screenY;
});


function scrollOff() {
    if (isiOS) {
    }
    else {
        $('html').css('overflow', 'hidden');
    }
}

function scrollOn() {
    if (isiOS) {
    }
    else {
        $('html').css('overflow', 'auto');
    }
}