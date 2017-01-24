(function () {

    const html       = document.querySelector('.html'),
          css        = document.querySelector('.css'),
          sass       = document.querySelector('.sass'),
          javascript = document.querySelector('.javascript'),
          jquery     = document.querySelector('.jquery'),
          bootstrap  = document.querySelector('.bootstrap'),
          gulp       = document.querySelector('.gulp'),
          git        = document.querySelector('.git'),
          sketch     = document.querySelector('.sketch'),
          hero       = document.querySelector(".hero"),
          small      = document.querySelector(".small"),
          skills     = document.querySelector(".skills");

    const elems = [html, css, sass, javascript, jquery, bootstrap, gulp, git, sketch];
    let counter = 0;
    let positionEndX;
    let positionEndY;
    let positionStart;
    const tl = new TimelineLite();

    function ieSupportSvg () {
        const isIE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);
        if (isIE11) {
            if (window.innerWidth < 767) {
                hero.setAttribute("height", "100vw");
            } else {
                hero.setAttribute("height", "50vw");
            }
        }
    }

    function removeHiddenClass () {
        if (counter < elems.length) {
            const getClass = elems[counter].getAttribute("class").split(" ").splice(1);
            elems[counter].setAttribute("class", getClass);
            positionEndX = parseInt(elems[counter].getAttribute("data-x-end"));
            positionEndY = parseInt(elems[counter].getAttribute("data-y-end"));
            heroAnimationTo(elems[counter], positionEndX, positionEndY);
            counter++;
            setTimeout(removeHiddenClass, 700);
        } else {
            counter = 0;
            // Set animation to infinite
            //addHiddenClass();
            //setTimeout(removeHiddenClass, 200);
        }
    }

    function addHiddenClass () {
        for (let i = 0; i < elems.length; i++) {
            elems[i].classList.add('hidden');
            positionStart = parseInt(elems[i].getAttribute("data-start"));
            TweenMax.to(elems[i], 0, {x: positionStart, y: 0});
        }
    }

    function changeHeroViewBox () {
        if (window.innerWidth < 767) {
            hero.setAttribute("viewBox", "0 0 349 366");
            tl.to(small, 0, {x: 0}).to(skills, 0, {x: 152});
        } else {
            hero.setAttribute("viewBox", "0 0 777 392");
            tl.to(small, 0, {x: 263}).to(skills, 0, {x: 415});
        }
        ieSupportSvg();
    }

    function heroAnimationTo (elem, posX, posY) {
        tl.to(elem, 0.2, {scale: 2}).to(elem, 0.2, {x: posX, y: posY, scale: 1, ease: Power0.easeNone});
    }

    window.addEventListener("DOMContentLoaded", changeHeroViewBox, false);
    window.addEventListener("resize", changeHeroViewBox, false);
    removeHiddenClass();

})();