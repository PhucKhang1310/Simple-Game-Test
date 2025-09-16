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

function changeSlide(newIndex) {
  clearInterval(slideTimer);
  hideSlide(slideIndex);
  showSlide((slideIndex = newIndex));
  startAutoSlide();
}

function currentSlide(newIndex) {
  clearInterval(slideTimer);
  hideSlide(slideIndex);
  showSlide((slideIndex = newIndex));
  startAutoSlide();
}

function startAutoSlide() {
  slideTimer = setInterval(() => {
    hideSlide(slideIndex);
    slideIndex++;
    showSlide(slideIndex);
  }, 5000);
}

function showSlide(newIndex) {
  if (newIndex > images.length - 1) {
    newIndex = 0;
  }
  if (newIndex < 0) {
    newIndex = images.length - 1;
  }

  slides[newIndex].style.display = "block";
  thumbnails[newIndex].classList.add("active");

  slideIndex = newIndex;
}

function hideSlide(previousIndex){
  slides[previousIndex].style.display = "none";
  thumbnails[previousIndex].classList.remove("active");
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
