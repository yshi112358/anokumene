'use strict';

$('.slogan').hide();
gsap.set(
    ['header img', 'header p', 'header button'],
    {
        opacity: 0,
        y: -20
    }
);

var video = $("video").get(0);
video.addEventListener("ended", function () {
    $('.logo video').hide();

    $('.slogan').fadeIn(function () {
        $('.curtain').fadeOut(4000);
        $('.slogan').delay(3000).fadeOut(1000, function () { $('.logo').hide(); });
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