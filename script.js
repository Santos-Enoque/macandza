// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const nav = document.querySelector('.nav');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    } else {
        nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    }
});

// Active navigation highlight
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll('.section-header, .text-block, .gallery-item, .info-block, .stat');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Gallery hover effects enhancement
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Form submission handling
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.inquiry || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#1a5d1a' : type === 'error' ? '#5d1a1a' : '#1a1a5d'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        border-left: 4px solid ${type === 'success' ? '#d4af37' : type === 'error' ? '#ff4444' : '#d4af37'};
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(style);

// Enhanced scroll animations
const scrollElements = document.querySelectorAll('.hero-title .title-line, .hero-subtitle, .hero-cta');
scrollElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
    el.classList.add('slide-up');
});

// Add slide-up animation CSS
const slideUpStyle = document.createElement('style');
slideUpStyle.textContent = `
    .slide-up {
        opacity: 0;
        transform: translateY(30px);
        animation: slideUp 0.8s ease forwards;
    }
    
    @keyframes slideUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(slideUpStyle);

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const heroSection = document.querySelector('.hero');
    
    if (heroImage && heroSection) {
        const rate = scrolled * -0.5;
        if (scrolled < heroSection.offsetHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    }
});

// Gallery lightbox functionality
let currentImageIndex = 0;
const galleryData = [];

// Collect all gallery data
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const title = item.querySelector('h3')?.textContent || 'Untitled';
    const material = item.querySelector('p')?.textContent || '';
    const year = item.querySelector('.year')?.textContent || '';
    
    galleryData.push({
        src: img.src,
        title: title,
        material: material,
        year: year
    });
    
    item.addEventListener('click', () => {
        currentImageIndex = index;
        createLightbox(currentImageIndex);
    });
});

function createLightbox(index) {
    const { src: imageSrc, title, material, year } = galleryData[index];
    // Remove existing lightbox
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay">
            <div class="lightbox-content">
                <img src="${imageSrc}" alt="${title}" class="lightbox-image">
                <div class="lightbox-info">
                    <h3>${title}</h3>
                    <p>${material}</p>
                    <span>${year}</span>
                </div>
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev" ${index === 0 ? 'disabled' : ''}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <button class="lightbox-next" ${index === galleryData.length - 1 ? 'disabled' : ''}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
                <div class="lightbox-counter">${index + 1} / ${galleryData.length}</div>
            </div>
        </div>
    `;
    
    // Add lightbox styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(lightbox);
    
    // Style lightbox content
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        background: #111;
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    `;
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    lightboxImage.style.cssText = `
        width: auto;
        height: auto;
        max-width: 90vw;
        max-height: 70vh;
        object-fit: contain;
        display: block;
        margin: 0 auto;
    `;
    
    const lightboxInfo = lightbox.querySelector('.lightbox-info');
    lightboxInfo.style.cssText = `
        padding: 2rem;
        text-align: center;
    `;
    
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    lightboxClose.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(0, 0, 0, 0.7);
        border: none;
        color: white;
        font-size: 2rem;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    `;
    
    lightboxClose.addEventListener('mouseenter', () => {
        lightboxClose.style.background = 'rgba(212, 175, 55, 0.8)';
    });
    
    lightboxClose.addEventListener('mouseleave', () => {
        lightboxClose.style.background = 'rgba(0, 0, 0, 0.7)';
    });
    
    // Style navigation buttons
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const navButtonStyles = `
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.7);
        border: none;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 10;
    `;
    
    lightboxPrev.style.cssText = navButtonStyles + 'left: 2rem;';
    lightboxNext.style.cssText = navButtonStyles + 'right: 2rem;';
    
    // Disabled state
    const updateButtonStates = () => {
        if (currentImageIndex === 0) {
            lightboxPrev.disabled = true;
            lightboxPrev.style.opacity = '0.3';
            lightboxPrev.style.cursor = 'not-allowed';
        } else {
            lightboxPrev.disabled = false;
            lightboxPrev.style.opacity = '1';
            lightboxPrev.style.cursor = 'pointer';
        }
        
        if (currentImageIndex === galleryData.length - 1) {
            lightboxNext.disabled = true;
            lightboxNext.style.opacity = '0.3';
            lightboxNext.style.cursor = 'not-allowed';
        } else {
            lightboxNext.disabled = false;
            lightboxNext.style.opacity = '1';
            lightboxNext.style.cursor = 'pointer';
        }
    };
    
    updateButtonStates();
    
    // Hover effects for nav buttons
    [lightboxPrev, lightboxNext].forEach(btn => {
        if (!btn.disabled) {
            btn.addEventListener('mouseenter', () => {
                if (!btn.disabled) {
                    btn.style.background = 'rgba(212, 175, 55, 0.8)';
                    btn.style.transform = 'translateY(-50%) scale(1.1)';
                }
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'rgba(0, 0, 0, 0.7)';
                btn.style.transform = 'translateY(-50%) scale(1)';
            });
        }
    });
    
    // Style counter
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    lightboxCounter.style.cssText = `
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-family: 'Inter', sans-serif;
    `;
    
    // Navigation functionality
    const navigateToImage = (newIndex) => {
        if (newIndex < 0 || newIndex >= galleryData.length) return;
        
        currentImageIndex = newIndex;
        const { src, title, material, year } = galleryData[currentImageIndex];
        
        // Update image with fade effect
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = src;
            lightboxImage.alt = title;
            lightbox.querySelector('.lightbox-info h3').textContent = title;
            lightbox.querySelector('.lightbox-info p').textContent = material;
            lightbox.querySelector('.lightbox-info span').textContent = year;
            lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryData.length}`;
            
            lightboxImage.onload = () => {
                lightboxImage.style.opacity = '1';
            };
            
            updateButtonStates();
        }, 200);
    };
    
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateToImage(currentImageIndex - 1);
    });
    
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateToImage(currentImageIndex + 1);
    });
    
    // Add keyboard navigation
    const keyHandler = (e) => {
        if (e.key === 'ArrowLeft') {
            navigateToImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            navigateToImage(currentImageIndex + 1);
        }
    };
    document.addEventListener('keydown', keyHandler);
    
    // Add transition for image
    lightboxImage.style.transition = 'opacity 0.3s ease';
    
    // Show lightbox
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Close functionality
    const closeLightbox = () => {
        lightbox.style.opacity = '0';
        document.body.style.overflow = ''; // Restore body scroll
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.remove();
            }
            document.removeEventListener('keydown', keyHandler);
            document.removeEventListener('keydown', escapeHandler);
        }, 300);
    };
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // ESC key to close - update the original handler
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escapeHandler);
            document.removeEventListener('keydown', keyHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loaded class styles
const loadedStyle = document.createElement('style');
loadedStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }
    
    body.loaded::before {
        opacity: 0;
        pointer-events: none;
    }
`;
document.head.appendChild(loadedStyle);