"use strict";

//Show sport pictures

const $sportPicSection = document.querySelector(".place");
const $sportPics = document.querySelectorAll("#place--pic");

const showPic = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  const t1 = gsap.timeline({ paused: true });

  $sportPics.forEach((pic) => {
    t1.to(pic, { opacity: "1", duration: 0.3 });
  });

  t1.play();

  observer.unobserve(entry.target);
};

const picObserver = new IntersectionObserver(showPic, {
  root: null,
  threshold: 0.4,
});

picObserver.observe($sportPicSection);
