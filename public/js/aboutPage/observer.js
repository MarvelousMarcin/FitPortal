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
  threshold: 0.6,
});

picObserver.observe($sportPicSection);

// Make colorful and bigger title

const $plusesSection = document.querySelector(".pluses");
const $plusesTitles = document.querySelectorAll(".pluses--title");

const animateTitles = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  const t2 = gsap.timeline({ paused: true });

  $plusesTitles.forEach((title) => {
    t2.to(title, {
      color: "#42bdb3",
      duration: 0.4,
    }).to(title, { color: "#000000", duration: 1 });
  });

  t2.play();

  observer.unobserve(entry.target);
};

const plusesObserver = new IntersectionObserver(animateTitles, {
  root: null,
  threshold: 0.4,
});

plusesObserver.observe($plusesSection);
