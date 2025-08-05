// 1. 헤더 scroll 반응
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  const scrollThreshold = window.innerHeight * 0.1;
  header.classList.toggle("scrolled", window.scrollY > scrollThreshold);
});

// 2. DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // 네비게이션 클릭 시
  const navItems = document.querySelectorAll(".navigation a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((nav) => nav.classList.remove("selected"));
      item.classList.add("selected");
    });
  });

  // point 애니메이션
  gsap.from(".point", {
    y: -150,
    opacity: 0,
    duration: 1,
    ease: "bounce.out",
    delay: 0.2,
  });

  gsap.fromTo(
    ".point",
    {
      rotationX: 0,
      transformOrigin: "center",
    },
    {
      rotationX: 180,
      duration: 1.2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      delay: 0.2,
    }
  );

  // ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // main-end 영역
  ScrollTrigger.create({
    trigger: ".main-end",
    start: "top 85%",
    scrub: true,
    onEnter: () => {
      const endContent = document.querySelector(".end__content");
      if (endContent && !endContent.classList.contains("active")) {
        endContent.classList.add("active");
      }
    },
  });

  // home_container h2 왼쪽 사라짐, pt 오른쪽 사라짐
  const h2s = document.querySelectorAll(".home_container h2");
  const pt = document.querySelector(".pt");

  if (h2s.length && pt) {
    gsap.to(h2s, {
      x: "-100%",
      opacity: 0,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: "#home",
        start: "top 0%",
        end: "bottom 70%",
        scrub: true,
      },
    });

    gsap.to(pt, {
      x: "100%",
      opacity: 0,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom 85%",
        scrub: true,
      },
    });
  }
});

// 3. 프로젝트 슬라이더
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (typeof Flicking === "undefined") {
      console.error("Flicking이 로드되지 않았습니다!");
      return;
    }

    const slider = document.querySelector("#project-slider");
    if (!slider) return;

    if (!slider.querySelector(".flicking-camera")) {
      const camera = document.createElement("div");
      camera.className = "flicking-camera";
      slider.appendChild(camera);
    }

    new Flicking(slider, {
      circular: true,
      gap: 20,
      align: "center",
      defaultIndex: 0,
      moveType: "freeScroll",
      adaptive: true,
    }).resize();
  }, 1000);
});

// 4. 푸터 및 About
document.addEventListener("DOMContentLoaded", () => {
  function fadeInOnScroll(selector) {
    const element = document.querySelector(selector);
    if (!element) return;
    window.addEventListener("scroll", () => {
      if (element.getBoundingClientRect().top < window.innerHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  fadeInOnScroll(".footer_text");
  fadeInOnScroll(".me_content");
});

// 5. footer_text, me_content
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  function applyTextAnimation(selector, triggerElement) {
    const textEl = document.querySelector(selector);
    if (!textEl) return;
    const original = textEl.innerHTML.trim();
    const wrapped = original.replace(
      /(<br\s*\/?>)|([^<>\s]+)/g,
      (match, brTag, text) => {
        if (brTag) return brTag;
        return text
          .split("")
          .map((ch) => `<span>${ch}</span>`)
          .join("");
      }
    );
    textEl.innerHTML = wrapped;

    gsap.fromTo(
      `${selector} span`,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: triggerElement,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }

  applyTextAnimation(".footer_text", ".footer_container");
  applyTextAnimation(".me_content", ".about_container");
});

// 6. Arrow-up
window.addEventListener("scroll", () => {
  const arrowUp = document.querySelector(".arrow-up");
  if (!arrowUp) return;
  const scrolledToBottom =
    document.body.scrollHeight - window.innerHeight - window.scrollY < 200;
  arrowUp.classList.toggle("show", scrolledToBottom);
});
