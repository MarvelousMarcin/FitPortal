const balls = document.querySelectorAll(".ball");
console.log(balls);

const t1 = gsap.timeline({
  default: { delay: 0, duration: 0.3 },
  repeat: -1,
  paused: true,
  repeatDelay: 0,
  delay: 0,
  yoyo: true,
});
balls.forEach((ball) => {
  t1.to(ball, { rotation: 360, scaleX: 1.7, scaleY: 1.7 });
});

t1.play();
