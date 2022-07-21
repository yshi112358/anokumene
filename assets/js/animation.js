'use strict';

$('.slogan').hide();

var video = $("video").get(0);
video.addEventListener("ended", function () {
    $('.slogan').fadeIn();
});