// Карусель "Участники"
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel-players");
  const slides = carousel.querySelector(".players__list");
  const numbers = carousel.querySelector(".carousel-players__numbers");
  const prev = carousel.querySelector(".carousel-players__prev");
  const next = carousel.querySelector(".carousel-players__next");

  const slidesArray = Array.from(
    carousel.querySelectorAll(".players__list-item")
  );

  const slideWidthMob = slidesArray[0].offsetWidth + 32;
  const slideWidthPc = slidesArray[0].offsetWidth + 20;

  let slideIndex = 0;
  let timerId;

  const updateCarousel = () => {
    const slideWidth = window.innerWidth >= 1200 ? slideWidthPc : slideWidthMob;
    slides.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
    updateNumbers();
  };

  const showNextSlide = (direction) => {
    if (direction === "next") {
      slideIndex =
        (slideIndex +
          (window.innerWidth >= 1200 ? 3 : window.innerWidth >= 768 ? 2 : 1)) %
        slidesArray.length;
    } else if (direction === "prev") {
      slideIndex =
        (slideIndex -
          (window.innerWidth >= 1200 ? 3 : window.innerWidth >= 768 ? 2 : 1) +
          slidesArray.length) %
        slidesArray.length;
    }
    updateCarousel();
  };

  const updateNumbers = () => {
    const totalSlides = slidesArray.length;
    let currentSlide;

    if (window.innerWidth >= 1200) {
      currentSlide = (slideIndex + 3) % totalSlides || totalSlides;
    } else if (window.innerWidth >= 768) {
      currentSlide = (slideIndex + 2) % totalSlides || totalSlides;
    } else {
      currentSlide = slideIndex + 1;
    }

    const numbersHalf = document.createElement("span");
    numbersHalf.classList.add("carousel-players__numbers--half");
    numbersHalf.textContent = `/${totalSlides}`;

    numbers.innerHTML = "";
    numbers.textContent = `${currentSlide}`;
    numbers.appendChild(numbersHalf);
  };

  const startAutoScroll = () => {
    timerId = setInterval(() => showNextSlide("next"), 4000);
  };

  const stopAutoScroll = () => {
    clearInterval(timerId);
  };

  startAutoScroll();

  carousel.addEventListener("mouseenter", stopAutoScroll);
  carousel.addEventListener("mouseleave", startAutoScroll);

  updateNumbers();

  let touchStartX;
  let touchEndX;

  const slideStart = () => {
    slidesArray.forEach((slide) => {
      slide.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
      });

      slide.addEventListener("touchmove", (event) => {
        touchEndX = event.touches[0].clientX;
      });

      slide.addEventListener("touchend", () => {
        let diffX = touchStartX - touchEndX;

        if (diffX > 0) {
          showNextSlide("next");
        } else {
          showNextSlide("prev");
        }

        touchStartX = null;
        touchEndX = null;
      });
    });
  };

  slideStart();
  next.onclick = () => showNextSlide("next");
  prev.onclick = () => showNextSlide("prev");
});
