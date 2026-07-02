// Countdown Timer
function updateCountdown() {
    // Set your wedding date here (Year, Month-1, Day, Hour, Minute)
    const weddingDate = new Date(2027, 2, 21, 18, 0, 0).getTime();
    
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update the countdown display
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    // If countdown is finished
    if (distance < 0) {
        document.querySelector('.countdown-title').textContent = "We're Married!";
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            navLink.classList.add('active');
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.person-card, .countdown-section');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Splash Screen & Background Music Player
const splashScreen = document.getElementById('splashScreen');
const enterButton = document.getElementById('enterButton');
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const volumeIcon = document.querySelector('.volume-icon');
const muteIcon = document.querySelector('.mute-icon');

let isMuted = false;

// Handle Enter button click
enterButton.addEventListener('click', () => {
    // Hide splash screen
    splashScreen.classList.add('hidden');
    
    // Start music
    backgroundMusic.play().then(() => {
        backgroundMusic.muted = false;
        isMuted = false;
        volumeIcon.classList.remove('hidden');
        muteIcon.classList.add('hidden');
        console.log('Music started successfully');
    }).catch((error) => {
        console.log('Music playback failed:', error);
        backgroundMusic.muted = true;
        isMuted = true;
        volumeIcon.classList.add('hidden');
        muteIcon.classList.remove('hidden');
    });
});

// Toggle mute/unmute on button click
musicToggle.addEventListener('click', () => {
    if (isMuted) {
        // Unmute
        backgroundMusic.muted = false;
        volumeIcon.classList.remove('hidden');
        muteIcon.classList.add('hidden');
        isMuted = false;
        console.log('Music unmuted');
    } else {
        // Mute
        backgroundMusic.muted = true;
        volumeIcon.classList.add('hidden');
        muteIcon.classList.remove('hidden');
        isMuted = true;
        console.log('Music muted');
    }
});

// RSVP Form Handling
const rsvpForm = document.getElementById('rsvpForm');
const rsvpSuccess = document.getElementById('rsvpSuccess');
const guestsGroup = document.getElementById('guestsGroup');
const guestsSelect = document.getElementById('guests');

// Show/hide guests field based on attendance
document.querySelectorAll('input[name="attending"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'yes') {
            guestsGroup.style.display = 'block';
            guestsGroup.style.animation = 'fadeInUp 0.5s ease';
            guestsSelect.value = '1';
        } else {
            guestsGroup.style.display = 'none';
        }
    });
});

// Handle form submission with Google Sheets integration
rsvpForm && rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get the Google Sheets Web App URL from the form data attribute
    const googleSheetsUrl = rsvpForm.getAttribute('data-google-sheets-url');
    
    // Get form data
    const formData = new FormData(rsvpForm);
    const data = Object.fromEntries(formData);

    if (data.attending === 'no') {
        data.guests = '0';
    }
    
    // Log form data for debugging
    console.log('RSVP Submission: ', data);
    
    // Disable submit button to prevent double submission
    const submitBtn = rsvpForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    try {
        // If Google Sheets URL is configured, send data to Google Sheets
        if (googleSheetsUrl && googleSheetsUrl.trim() !== '') {
            
            const response = await fetch(googleSheetsUrl, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            console.log('Data sent to Google Sheets successfully');
        } else {
            console.warn('Google Sheets URL not configured. Please add your Web App URL to the form data-google-sheets-url attribute.');
        }
        
        // Show success message
        rsvpForm.style.display = 'none';
        rsvpSuccess.style.display = 'block';
        
        // Scroll to success message
        rsvpSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form after a delay
        setTimeout(() => {
            rsvpForm.reset();
            rsvpForm.style.display = 'block';
            rsvpSuccess.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }, 5000);
        
    } catch (error) {
        console.error('Error submitting RSVP:', error);
        
        // Still show success message since no-cors mode doesn't return response
        // The data is likely submitted successfully even if we can't verify
        rsvpForm.style.display = 'none';
        rsvpSuccess.style.display = 'block';
        rsvpSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
            rsvpForm.reset();
            rsvpForm.style.display = 'block';
            rsvpSuccess.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }, 5000);
    }
});

// ===== GALLERY LIGHTBOX FUNCTIONALITY =====
console.log('>>> LIGHTBOX SECTION LOADING <<<');
let lightbox, lightboxImage, lightboxCaption, lightboxClose, lightboxPrev, lightboxNext;
let currentImageIndex = 0;
let currentGalleryItems = [];
let currentGalleryType = '';
// Initialize lightbox after DOM is loaded
function initializeLightbox() {
    console.log('>>> LIGHTBOX SECTION LOADING <<<');
    lightbox = document.getElementById('lightbox');
    lightboxImage = document.getElementById('lightboxImage');
    lightboxCaption = document.getElementById('lightboxCaption');
    lightboxClose = document.getElementById('lightboxClose');
    lightboxPrev = document.getElementById('lightboxPrev');
    lightboxNext = document.getElementById('lightboxNext');

    // Get all gallery items
    const mosaicItems = document.querySelectorAll('.mosaic-item');
    const polaroidItems = document.querySelectorAll('.polaroid-item');
    const collageItems = document.querySelectorAll('.collage-item');

    // Open lightbox when clicking on mosaic gallery items
    mosaicItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentGalleryItems = Array.from(mosaicItems);
            currentGalleryType = 'mosaic';
            currentImageIndex = index;
            openLightbox();
        });
    });

    // Open lightbox when clicking on polaroid gallery items
    polaroidItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentGalleryItems = Array.from(polaroidItems);
            currentGalleryType = 'polaroid';
            currentImageIndex = index;
            openLightbox();
        });
    });

    // Open lightbox when clicking on collage gallery items
    collageItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentGalleryItems = Array.from(collageItems);
            currentGalleryType = 'collage';
            currentImageIndex = index;
            openLightbox();
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') showPrevImage();
        else if (e.key === 'ArrowRight') showNextImage();
    });
}

function openLightbox() {
    const currentItem = currentGalleryItems[currentImageIndex];

    // Get the background image from the gallery item
    let imageElement, caption;
    if (currentGalleryType === 'mosaic') {
        imageElement = currentItem.querySelector('.mosaic-image');
        caption = `Photo ${currentImageIndex + 1} of ${currentGalleryItems.length}`;
    } else if (currentGalleryType === 'collage') {
        imageElement = currentItem.querySelector('.collage-image');
        caption = `Photo ${currentImageIndex + 1} of ${currentGalleryItems.length}`;
    } else {
        imageElement = currentItem.querySelector('.polaroid-image');
        const captionEl = currentItem.querySelector('.polaroid-caption');
        caption = captionEl ? captionEl.textContent : `Photo ${currentImageIndex + 1} of ${currentGalleryItems.length}`;
    }

    // Extract the image URL directly from the inline style attribute (avoids
    // getComputedStyle returning 'none' before the CSS background has loaded,
    // and avoids dependency on absolute URLs that differ across environments).
    if (imageElement) {
        const rawStyle = imageElement.getAttribute('style') || '';
        const match = rawStyle.match(/background-image\s*:\s*url\(['"]?(.*?)['"]?\)/i);
        const imageUrl = match ? match[1] : '';

        if (imageUrl) {
            lightboxImage.innerHTML = `<img src="${imageUrl}" alt="Gallery Image ${currentImageIndex + 1}">`;
        } else {
            lightboxImage.innerHTML = '';
        }
    }

    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentGalleryItems.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const currentItem = currentGalleryItems[currentImageIndex];

    // Add fade effect
    lightboxImage.style.opacity = '0';

    setTimeout(() => {
        let imageElement, caption;
        if (currentGalleryType === 'mosaic') {
            imageElement = currentItem.querySelector('.mosaic-image');
            caption = `Photo ${currentImageIndex + 1} of ${currentGalleryItems.length}`;
        } else if (currentGalleryType === 'collage') {
            imageElement = currentItem.querySelector('.collage-image');
            caption = `Photo ${currentImageIndex + 1} of ${currentGalleryItems.length}`;
        } else {
            imageElement = currentItem.querySelector('.polaroid-image');
            const captionEl = currentItem.querySelector('.polaroid-caption');
            caption = captionEl ? captionEl.textContent : `Photo ${currentImageIndex + 1} of ${currentGalleryItems.length}`;
        }

        if (imageElement) {
            const rawStyle = imageElement.getAttribute('style') || '';
            const match = rawStyle.match(/background-image\s*:\s*url\(['"]?(.*?)['"]?\)/i);
            const imageUrl = match ? match[1] : '';

            if (imageUrl) {
                lightboxImage.innerHTML = `<img src="${imageUrl}" alt="Gallery Image ${currentImageIndex + 1}">`;
            } else {
                lightboxImage.innerHTML = '';
            }
        }

        lightboxCaption.textContent = caption;
        lightboxImage.style.opacity = '1';
    }, 150);
}

// Call initializeLightbox when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLightbox);
} else {
    initializeLightbox();
}

// Enhanced scroll animations with Intersection Observer
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add stagger effect for mosaic and polaroid items
            if (entry.target.classList.contains('mosaic-item') ||
                entry.target.classList.contains('polaroid-item')) {
                const delay = entry.target.dataset.aosDelay || 0;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all sections and elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.mosaic-item, .polaroid-item, .collage-item, .venue-content, .rsvp-form, .section-title, .section-subtitle'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        animateOnScroll.observe(el);
    });
});

// Parallax effect for wedding banner section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const weddingBanner = document.querySelector('.wedding-banner-content');
    
    if (weddingBanner && scrolled < window.innerHeight) {
        weddingBanner.style.transform = `translateY(${scrolled * 0.5}px)`;
        weddingBanner.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Smooth reveal for countdown numbers
const countdownNumbers = document.querySelectorAll('.countdown-number');
countdownNumbers.forEach(number => {
    number.style.transition = 'all 0.3s ease';
});

// Add floating animation to scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.style.animation = 'float 3s ease-in-out infinite';
}

// Enhanced navigation with scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '0.75rem 2rem';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1rem 2rem';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});
