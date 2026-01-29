// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.glass-header');
const equalizerBars = document.querySelectorAll('.bar');

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

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
        header.style.backdropFilter = 'blur(25px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.05)';
        header.style.backdropFilter = 'blur(20px)';
    }
});

// Enhanced Equalizer Animation
function animateEqualizer() {
    equalizerBars.forEach((bar, index) => {
        const randomHeight = Math.random() * 40 + 20;
        const randomDelay = Math.random() * 0.5;
        
        bar.style.animation = 'none';
        bar.style.height = `${randomHeight}px`;
        
        setTimeout(() => {
            bar.style.animation = `equalizer-dance 1s ease-in-out infinite`;
            bar.style.animationDelay = `${randomDelay}s`;
        }, 100);
    });
}

// Animate equalizer periodically
setInterval(animateEqualizer, 3000);

// Scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for multiple elements
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.content-card, .section-header, .gift-card-content, .global-content');
    
    animatedElements.forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
        
        // Set initial state for children
        const children = element.children;
        Array.from(children).forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            child.style.transition = 'all 0.6s ease';
        });
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroBg && heroContent) {
        heroBg.style.transform = `scale(${1.1 + scrolled * 0.0005}) translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled * 0.001;
    }
});

// Simple 3D Card Hover Effects
document.querySelectorAll('.content-card, .gift-card-info').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Button ripple effect
document.querySelectorAll('button').forEach(button => {
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
        
        // Add ripple styles if not already in CSS
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                button {
                    position: relative;
                    overflow: hidden;
                }
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

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

// Dynamic particle generation
function createParticle() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle dynamic';
    
    const size = Math.random() * 60 + 20;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 15;
    const delay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${animationDuration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.background = `radial-gradient(circle, ${getRandomColor()}, transparent)`;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, (animationDuration + delay) * 1000);
}

function getRandomColor() {
    const colors = [
        'rgba(139, 92, 246, 0.3)',
        'rgba(236, 72, 153, 0.3)',
        'rgba(59, 130, 246, 0.3)',
        'rgba(168, 85, 247, 0.3)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Generate particles periodically
setInterval(createParticle, 3000);

// Cursor glow effect (optional, for desktop)
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);
    
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-glow {
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
        }
    `;
    document.head.appendChild(cursorStyle);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based performance optimizations
    const scrolled = window.pageYOffset;
    
    // Reduce animation intensity on mobile
    if (window.innerWidth < 768) {
        document.querySelectorAll('.particle').forEach(particle => {
            particle.style.animationDuration = '25s';
        });
    }
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Music visualization on hover (for music section)
const musicSection = document.querySelector('.music-section');
if (musicSection) {
    musicSection.addEventListener('mouseenter', () => {
        equalizerBars.forEach((bar, index) => {
            bar.style.animationDuration = '0.5s';
            bar.style.height = `${Math.random() * 60 + 20}px`;
        });
    });
    
    musicSection.addEventListener('mouseleave', () => {
        equalizerBars.forEach((bar, index) => {
            bar.style.animationDuration = '1s';
        });
        animateEqualizer();
    });
}

console.log('🎵 myTunes DJ Theme Loaded Successfully! 🎧');
