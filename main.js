// Define your images
const images = [
    { src: "Image1.jpg", alt: "Image 1" },
    { src: "Image2.png", alt: "Image 2" },
    { src: "Image3.jpg", alt: "Image 3" },
    { src: "Image4.jpg", alt: "Image 4" },
    { src: "Image5.png", alt: "Image 5" },
    { src: "Image6.jpg", alt: "Image 6" }
];

let slideIndex = 1;
let slideTimer;

function generateSlideshow() {
    const slideshowContainer = document.getElementById('slideshow-container');
    const thumbnailContainer = document.getElementById('thumbnail-container');
    
    images.forEach((image, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slideshow-display';
        slideDiv.innerHTML = `
            <div class="slideshow-counter">${index + 1}/${images.length}</div>
            <img class="slideshow-image" src="media/${image.src}" alt="${image.alt}">
        `;
        slideshowContainer.appendChild(slideDiv);
        
        const columnDiv = document.createElement('div');
        columnDiv.className = 'column';
        columnDiv.innerHTML = `
            <img class="thumbnail" src="media/${image.src}" onclick="currentSlide(${index + 1})" alt="${image.alt}">
        `;
        thumbnailContainer.appendChild(columnDiv);
    });
}

function changeSlide(n) {
    clearInterval(slideTimer);
    showSlide(slideIndex += n);
    startAutoSlide();
}

function currentSlide(n) {
    clearInterval(slideTimer);
    showSlide(slideIndex = n);
    startAutoSlide();
}

function startAutoSlide() {
    slideTimer = setInterval(() => {
        slideIndex++
        showSlide(slideIndex);
    }, 5000);
}

function showSlide(n) {
    let slides = document.getElementsByClassName("slideshow-display");
    let thumbnails = document.getElementsByClassName("thumbnail");
    
    if (n > images.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = images.length }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].classList.remove("active");
    }
    
    slides[slideIndex - 1].style.display = "block";
    thumbnails[slideIndex - 1].classList.add("active");
}

function overlayOn() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("overlay").style.alignItems = "center";
    document.getElementById("overlay").style.justifyContent = "center";
}

function overlayOff() {
    document.getElementById("overlay").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    generateSlideshow();
    showSlide(slideIndex);
    startAutoSlide();
});