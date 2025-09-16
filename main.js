// Define your images
const images = [
  { src: "Image1.jpg", alt: "Image 1" },
  { src: "Image2.png", alt: "Image 2" },
  { src: "Image3.jpg", alt: "Image 3" },
  { src: "Image4.jpg", alt: "Image 4" },
  { src: "Image5.png", alt: "Image 5" },
  { src: "Image6.jpg", alt: "Image 6" },
];

let slideIndex = 0;
let slideTimer;
const overlay = document.getElementById("overlay");
const slides = document.getElementsByClassName("slideshow-display");
const thumbnails = document.getElementsByClassName("thumbnail");
const slideshowContainer = document.getElementById("slideshow-container");
const thumbnailContainer = document.getElementById("thumbnail-container");

function generateSlideshow() {
  images.forEach((image, index) => {
    const slideDiv = document.createElement("div");
    slideDiv.className = "slideshow-display";
    slideDiv.innerHTML = `
            <div class="slideshow-counter">${index + 1}/${images.length}</div>
            <img class="slideshow-image" src="media/${image.src}" alt="${
      image.alt
    }">
        `;
    slideshowContainer.appendChild(slideDiv);

    const columnDiv = document.createElement("div");
    columnDiv.className = "column";
    columnDiv.innerHTML = `
            <img class="thumbnail" src="media/${image.src}" onclick="currentSlide(${index})" alt="${image.alt}">
        `;
    thumbnailContainer.appendChild(columnDiv);
  });
}

function changeSlide(increment) {
  clearInterval(slideTimer);
  showSlide(slideIndex + increment);
  startAutoSlide();
}

function currentSlide(newIndex) {
  clearInterval(slideTimer);
  showSlide(newIndex);
  startAutoSlide();
}

function startAutoSlide() {
  slideTimer = setInterval(() => {
    showSlide(slideIndex+1);
  }, 5000);
}

function showSlide(newIndex) {
  if (newIndex >= slides.length) {
    newIndex = 0;
  }
  if (newIndex < 0) {
    newIndex = slides.length - 1;
  }

  slides[slideIndex].style.display = "none";
  thumbnails[slideIndex].classList.remove("active");

  slideIndex = newIndex;
  slides[slideIndex].style.display = "block";
  thumbnails[slideIndex].classList.add("active");
}

function overlayOn() {
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
}

function overlayOff() {
  overlay.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  generateSlideshow();
  showSlide(slideIndex);
  startAutoSlide();
});
