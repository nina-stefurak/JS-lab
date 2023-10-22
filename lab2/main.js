const container = document.querySelector(".container"),
slides = document.querySelector(".slides"),
images = document.querySelectorAll("img"),
buttons = document.querySelectorAll(".btn");

let currentSlide = 1,
    intervalId;

const autoSlide = () => {
    intervalId = setInterval(() => slideImage(++currentSlide), 2000);
};
autoSlide();

const slideImage = () => {
    currentSlide = currentSlide === images.length ? 0 : currentSlide < 0 ? images.length - 1 : currentSlide;

slides.style.transform = `translate(-${currentSlide * 100}%)`;
};

const updateClick = (e) => {

    clearInterval(intervalId);
    currentSlide += e.target.id === "next" ? 1 : -1;
    slideImage(currentSlide);
    autoSlide();
};

buttons.forEach(btn => btn.addEventListener("click", updateClick))

container.addEventListener("mouseover", () => clearInterval(intervalId));
container.addEventListener("mouseleave", autoSlide);