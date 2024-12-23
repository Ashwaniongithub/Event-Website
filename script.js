window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});



let currentSlide = 0;
const slides = document.querySelectorAll('.gslide');
const navButtons = document.querySelectorAll('.gslider-nav button');
let autoplayInterval;
let isPlaying = true;
const SLIDE_DURATION = 5000; // Time between slides in ms

function updateNavButtons() {
    navButtons.forEach((btn, index) => {
        if (index < slides.length) {
            btn.classList.toggle('active', index === currentSlide);
        }
    });
}

function animateSlide(slideIndex) {
    const slide = slides[slideIndex];
    const text = slide.querySelector('.gslide-text');
    const img = slide.querySelector('.gslide-img');
    
    gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    });
    
    gsap.to(img, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut"
    });
}

function resetSlide(slideIndex) {
    const slide = slides[slideIndex];
    const text = slide.querySelector('.gslide-text');
    const img = slide.querySelector('.gslide-img');
    
    gsap.set(text, {
        opacity: 0,
        y: 50
    });
    
    gsap.set(img, {
        opacity: 0
    });
}

function changeSlide(newIndex) {
    if (newIndex === currentSlide) return;
    
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;
    
    // Reset current slide
    gsap.to(slides[currentSlide], {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            slides[currentSlide].classList.remove('active');
            resetSlide(currentSlide);
            
            // Show new slide
            slides[newIndex].classList.add('active');
            gsap.to(slides[newIndex], {
                opacity: 1,
                duration: 0.5,
                onComplete: () => animateSlide(newIndex)
            });
        }
    });
    
    currentSlide = newIndex;
    updateNavButtons();
}

function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
        changeSlide(currentSlide + 1);
    }, SLIDE_DURATION);
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

function toggleAutoplay() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        startAutoplay();
        playPauseBtn.textContent = '⏸️';
    } else {
        stopAutoplay();
        playPauseBtn.textContent = '▶️';
    }
}

// Pause on hover
document.querySelector('.gslider').addEventListener('mouseenter', () => {
    if (isPlaying) stopAutoplay();
});

document.querySelector('.gslider').addEventListener('mouseleave', () => {
    if (isPlaying) startAutoplay();
});

// Initial setup
animateSlide(0);
startAutoplay();