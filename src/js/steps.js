document.addEventListener("DOMContentLoaded", () => {
  const prev = document.querySelector(".carousel-steps__prev");
  const next = document.querySelector(".carousel-steps__next");
  const slides = document.querySelector(".steps__list");
  const dotsContainer = document.querySelector(".carousel-steps__dots");
  const slidesArray = Array.from(
    document.querySelectorAll(".steps__list-item")
  );
  let slideIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  const showSlide = (index) => {
    slideIndex = index;
    const slideWidth = slidesArray[0].offsetWidth + 20;
    slides.style.transform = `translateX(-${slideWidth * index}px)`;
    updateDots();
    updateArrows();
  };

  const createDot = () => {
    slidesArray.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("carousel-steps__dot");
      if (index === 0) dot.classList.add("carousel-steps__dot--active");
      dotsContainer.appendChild(dot);
      dot.addEventListener("click", () => {
        showSlide(index);
      });
    });
  };

  const updateDots = () => {
    const dots = document.querySelectorAll(".carousel-steps__dot");
    dots.forEach((dot, index) => {
      if (index === slideIndex) {
        dot.classList.add("carousel-steps__dot--active");
      } else {
        dot.classList.remove("carousel-steps__dot--active");
      }
    });
  };

  const updateArrows = () => {
    if (slideIndex === 0) {
      prev.classList.add("carousel-steps__arrow--disabled");
      next.classList.remove("carousel-steps__arrow--disabled");
    } else if (slideIndex === slidesArray.length - 1) {
      next.classList.add("carousel-steps__arrow--disabled");
      prev.classList.remove("carousel-steps__arrow--disabled");
    } else {
      prev.classList.remove("carousel-steps__arrow--disabled");
      next.classList.remove("carousel-steps__arrow--disabled");
    }
  };

  const showPrevSlide = () => {
    if (slideIndex > 0) {
      slideIndex--;
      showSlide(slideIndex);
    }
  };

  const showNextSlide = () => {
    if (slideIndex < slidesArray.length - 1) {
      slideIndex++;
      showSlide(slideIndex);
    }
  };

  const handleClick = () => {
    next.addEventListener("click", () => {
      if (slideIndex < slidesArray.length - 1) {
        slideIndex++;
        showSlide(slideIndex);
      }
    });

    prev.addEventListener("click", () => {
      if (slideIndex > 0) {
        slideIndex--;
        showSlide(slideIndex);
      }
    });
  };

  const slideStart = () => {
    slidesArray.forEach((slide) => {
      slide.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
      });

      slide.addEventListener("touchmove", (event) => {
        touchEndX = event.touches[0].clientX;
      });

      slide.addEventListener("touchend", () => {
        if (touchStartX && touchEndX) {
          let diffX = touchStartX - touchEndX;

          if (diffX > 0) {
            showNextSlide();
          } else {
            showPrevSlide();
          }

          touchStartX = null;
          touchEndX = null;
        }
      });
    });
  };

  createDot();
  handleClick();
  slideStart();
  updateArrows();
});
