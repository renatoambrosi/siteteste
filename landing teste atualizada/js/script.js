// Prosperity Test Landing Page - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-cubic',
        once: true,
        offset: 100
    });

    // Loading Screen Animation
    initLoadingScreen();
    
    // Floating Elements Animation
    initFloatingElements();
    
    // Header Scroll Effects
    initHeaderEffects();
    
    // FAQ Accordion
    initFAQAccordion();
    
    // Smooth Scroll for Navigation
    initSmoothScroll();
    
    // Back to Top Button
    initBackToTop();
    
    // Dynamic Text Animations
    initTextAnimations();
    
    // Prosperity Wheel Animation
    initProsperityWheel();
    
    // Interactive Pain Points
    initPainPoints();
    
    // CTA Button Animations
    initCTAAnimations();
    
    // Scroll Progress Indicator
    initScrollProgress();
    
    // Mouse Movement Effects
    initMouseEffects();
    
    // Testimonial Simulation
    initTestimonials();
    
    // Countdown Timer for Urgency
    initUrgencyElements();
});

// Loading Screen Animation
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading');
    const prosperitySymbol = loadingScreen.querySelector('.prosperity-symbol');
    
    // Animate the prosperity symbol
    let rotation = 0;
    const symbolInterval = setInterval(() => {
        rotation += 10;
        prosperitySymbol.style.transform = `rotate(${rotation}deg) scale(${1 + Math.sin(rotation * 0.1) * 0.2})`;
    }, 50);
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        clearInterval(symbolInterval);
        loadingScreen.classList.add('hidden');
        
        // Start main animations
        setTimeout(() => {
            document.body.style.overflow = 'visible';
            startMainAnimations();
        }, 500);
    }, 2000);
}

// Start main page animations
function startMainAnimations() {
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Start floating elements
    animateFloatingElements();
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Random initial position
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        element.style.left = randomX + '%';
        element.style.top = randomY + '%';
        
        // Random animation delay
        element.style.animationDelay = (Math.random() * 3) + 's';
    });
}

function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element) => {
        setInterval(() => {
            const currentLeft = parseFloat(element.style.left);
            const currentTop = parseFloat(element.style.top);
            
            const newLeft = currentLeft + (Math.random() - 0.5) * 2;
            const newTop = currentTop + (Math.random() - 0.5) * 2;
            
            element.style.left = Math.max(0, Math.min(100, newLeft)) + '%';
            element.style.top = Math.max(0, Math.min(100, newTop)) + '%';
        }, 3000 + Math.random() * 2000);
    });
}

// Header Scroll Effects
function initHeaderEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Show/hide header based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        // Add background blur effect
        if (currentScrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Dynamic Text Animations
function initTextAnimations() {
    // Typewriter effect for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        setTimeout(() => {
            typewriterEffect(subtitle, subtitle.textContent, 50);
        }, 1500);
    }
    
    // Animate numbers when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (element.classList.contains('animate-number')) {
                    animateNumber(element);
                }
            }
        });
    });
    
    document.querySelectorAll('.animate-number').forEach(el => {
        observer.observe(el);
    });
}

function typewriterEffect(element, text, speed) {
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

function animateNumber(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Prosperity Wheel Animation
function initProsperityWheel() {
    const wheel = document.querySelector('.prosperity-wheel');
    if (!wheel) return;
    
    const segments = wheel.querySelectorAll('.wheel-segment');
    
    // Hover effects removed as requested
    
    // Keep rotation continuous - wheel and elements rotate together
}

// Interactive Pain Points
function initPainPoints() {
    const painCategories = document.querySelectorAll('.pain-category');
    
    painCategories.forEach(category => {
        const painList = category.querySelector('.pain-list');
        const items = painList.querySelectorAll('li');
        
        // Hover functionality removed
        
        // Click to highlight
        category.addEventListener('click', () => {
            category.classList.add('highlighted');
            
            setTimeout(() => {
                category.classList.remove('highlighted');
            }, 2000);
        });
    });
}

// CTA Button Animations
function initCTAAnimations() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        // Ripple effect on click
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
        
        // Magnetic effect
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Mouse Movement Effects
function initMouseEffects() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Move floating elements based on mouse
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.01 + (index * 0.005);
            const x = (mouseX * speed) - (window.innerWidth * speed / 2);
            const y = (mouseY * speed) - (window.innerHeight * speed / 2);
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Parallax effect for gradient orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = 0.02 + (index * 0.01);
            const x = (mouseX * speed) - (window.innerWidth * speed / 2);
            const y = (mouseY * speed) - (window.innerHeight * speed / 2);
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Testimonial Simulation (disabled - removed popups)
function initTestimonials() {
    // Popups completamente removidos
}

function showFloatingTestimonial(testimonial) {
    // Função desabilitada - não cria mais popups
    return;
}

// Urgency Elements (disabled as requested)
function initUrgencyElements() {
    // Urgency elements removed as requested
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes slide-in-testimonial {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .pain-category.highlighted {
        background: rgba(255, 107, 107, 0.2) !important;
        transform: scale(1.02);
        box-shadow: 0 0 30px rgba(255, 107, 107, 0.3);
    }
    
    .floating-testimonial {
        font-size: 0.9rem;
    }
    
    .floating-testimonial p {
        margin: 0 0 0.5rem 0;
        color: #333;
        font-style: italic;
    }
    
    .floating-testimonial span {
        color: #666;
        font-weight: 600;
        font-size: 0.8rem;
    }
    
    .scroll-progress {
        box-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
    }
`;

document.head.appendChild(style);

// Enhanced scroll animations
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallax = scrolled * 0.5;
    
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${parallax}px)`;
    }
    
    // Reveal sections with custom animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !section.classList.contains('animated')) {
            section.classList.add('animated');
            
            // Add stagger animation to children
            const children = section.querySelectorAll('[data-aos]');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('aos-animate');
                }, index * 100);
            });
        }
    });
});

// Track user engagement
let engagementScore = 0;
const trackEngagement = (action, points) => {
    engagementScore += points;
};

// Track various user interactions
document.addEventListener('scroll', () => trackEngagement('scrolled', 1), { once: true });
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', () => trackEngagement('clicked CTA', 10));
});
document.querySelectorAll('.pain-category').forEach(category => {
    category.addEventListener('click', () => trackEngagement('engaged with pain points', 5));
});

// Pain List Toggle Function
function togglePainList(button) {
    const painList = button.previousElementSibling;
    const isExpanded = painList.classList.contains('expanded');
    
    if (isExpanded) {
        painList.classList.remove('expanded');
        button.textContent = 'Ver mais +';
    } else {
        painList.classList.add('expanded');
        button.textContent = 'Ver menos -';
    }
    
    // Add animation effect
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    trackEngagement('expanded pain list', 3);
}

// Make function available globally
window.togglePainList = togglePainList;

