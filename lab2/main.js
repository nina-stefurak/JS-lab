const container = document.querySelector(".container"),
      slides = document.querySelector(".slides"),
      images = document.querySelectorAll("img"),
      buttons = document.querySelectorAll(".btn"),
      dotsContainer = document.querySelector(".dots-container");

let currentSlide = 0,
    intervalId;

const createDots = () => {
  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.dataset.slide = index;
    dotsContainer.appendChild(dot);
  });
};

const updateDots = () => {
  document.querySelectorAll(".dot").forEach(dot => {
    dot.classList.remove("active");
  });
  document.querySelector(`.dot[data-slide="${currentSlide}"]`).classList.add("active");
};

const autoSlide = () => {
  intervalId = setInterval(() => slideImage(++currentSlide), 2000);
};

const slideImage = () => {
  currentSlide = currentSlide === images.length ? 0 : currentSlide < 0 ? images.length - 1 : currentSlide;
  slides.style.transform = `translate(-${currentSlide * 100}%)`;
  console.log("Current slide:" +  currentSlide);
  updateDots(); 
};

const updateClick = (e) => {
  clearInterval(intervalId);
  currentSlide += e.target.id === "next" ? 1 : -1;
  slideImage(currentSlide);
  autoSlide();
};

const updateSlideFromDot = (e) => {
  if (e.target.classList.contains("dot")) {
    clearInterval(intervalId);
    currentSlide = Number(e.target.dataset.slide);
    slideImage();
    autoSlide();
  }
};

createDots(); 
updateDots(); 
autoSlide(); 
buttons.forEach(btn => btn.addEventListener("click", updateClick));
dotsContainer.addEventListener("click", updateSlideFromDot);
container.addEventListener("mouseover", () => clearInterval(intervalId));
container.addEventListener("mouseleave", autoSlide);
