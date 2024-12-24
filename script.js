// navbar js 
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});


// gsap slider

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



// gsap img and video marquee right to left
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.media-track');
    const items = document.querySelectorAll('.media-item:not(.clone)');
    const totalWidth = Array.from(items).reduce((acc, item) => {
        return acc + item.offsetWidth + 20; // 20px is the gap
    }, 0);

    // Initialize GSAP timeline
    const tl = gsap.timeline({ repeat: -1 });

    // Animate the track
    tl.to(track, {
        x: -totalWidth,
        duration: 30,
        ease: "none",
        onComplete: () => {
            gsap.set(track, { x: 0 });
        }
    });

    // Pause on hover
    track.addEventListener('mouseenter', () => {
        tl.pause();
    });

    track.addEventListener('mouseleave', () => {
        tl.play();
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reset animation
            tl.restart();
        }, 250);
    });
});



// gsap img slider left to right

document.addEventListener('DOMContentLoaded', function() {
    // Using different class names to avoid conflicts
    const slider = document.querySelector('.slider-inner');
    const slides = document.querySelectorAll('.slide-element:not(.slide-clone)');
    
    // Calculate total width including gap
    const totalWidth = Array.from(slides).reduce((acc, slide) => {
        return acc + slide.offsetWidth + 20; // 20px gap
    }, 0);

    // Set initial position for left-to-right movement
    gsap.set(slider, { x: -totalWidth });

    // Create timeline with different variable name
    const sliderTimeline = gsap.timeline({ repeat: -1 });

    // Animate from left to right
    sliderTimeline.to(slider, {
        x: 0,
        duration: 30,
        ease: "none",
        onComplete: () => {
            gsap.set(slider, { x: -totalWidth });
        }
    });

    // Hover handlers with unique names
    slider.addEventListener('mouseenter', () => {
        sliderTimeline.pause();
    });

    slider.addEventListener('mouseleave', () => {
        sliderTimeline.play();
    });

    // Resize handler with different timeout variable
    let sliderResizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(sliderResizeTimeout);
        sliderResizeTimeout = setTimeout(() => {
            sliderTimeline.restart();
        }, 250);
    });
});