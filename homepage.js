// ===== SMOOTH SCROLL & NAVBAR =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = document.querySelector('.scroll-top');
    
    // Add shadow to navbar on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
});

// Scroll to top functionality
document.getElementById('scrollTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== AOS (Animate On Scroll) IMPLEMENTATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.addEventListener('DOMContentLoaded', function() {
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(element => {
        observer.observe(element);
    });
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuIcon) {
    mobileMenuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Change icon
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnMenuIcon = mobileMenuIcon.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnMenuIcon && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = mobileMenuIcon.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    } else {
        return num + '%';
    }
}

// Observe stats and trigger counter animation
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            
            statItems.forEach(item => {
                const text = item.textContent;
                let target;
                
                if (text.includes('K')) {
                    target = parseFloat(text) * 1000;
                } else if (text.includes('M')) {
                    target = parseFloat(text) * 1000000;
                } else if (text.includes('%')) {
                    target = parseFloat(text);
                } else {
                    target = parseFloat(text);
                }
                
                animateCounter(item, target);
            });
            
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== CARD TILT EFFECT (OPTIONAL ENHANCEMENT) =====
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ===== CONSOLE MESSAGE =====
console.log('%c🎓 Pusat Asesmen Pendidikan ', 'background: #4154f1; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%cWebsite TKA - Mengukur Capaian Akademik Secara Objektif', 'color: #012970; font-size: 12px;');