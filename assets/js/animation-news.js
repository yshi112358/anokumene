'use strict';

$('.slogan').hide();
document.addEventListener('touchmove', disableScroll, { passive: false });
document.addEventListener('mousewheel', disableScroll, { passive: false });

gsap.set(
    ['header img', 'header p', 'header button', '.content'],
    {
        opacity: 0,
        y: -20
    }
);
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
}).to(".content", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.inOut"
});

function disableScroll(event) {
    event.preventDefault();
}

var isMenu = Boolean("false");
$("header button").on('click', function () {
    $('.curtain').fadeTo(200, 0.5);
    $('.menu').animate({ 'left': '60vw' }, 200);
    isMenu = Boolean("true");
    document.addEventListener('touchmove', disableScroll, { passive: false });
    document.addEventListener('mousewheel', disableScroll, { passive: false });
});

$(document).on('click', function (e) {
    if (isMenu && $(e.target).closest('.curtain').length) {
        $('.curtain').fadeOut(200);
        $('.menu').animate({ 'left': '100vw' }, 200);
        document.removeEventListener('touchmove', disableScroll, { passive: false });
        document.removeEventListener('mousewheel', disableScroll, { passive: false });
    }
});