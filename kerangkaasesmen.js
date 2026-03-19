// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = document.querySelector('.scroll-top');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 300) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== AOS (ANIMATE ON SCROLL) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(element => {
        observer.observe(element);
    });
});

// ===== TOGGLE SUBJECT DETAIL =====
function toggleDetail(button) {
    const card = button.closest('.subject-card');
    const detail = card.querySelector('.subject-detail');
    const icon = button.querySelector('i');
    
    if (detail.style.display === 'none' || detail.style.display === '') {
        detail.style.display = 'block';
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-chevron-up"></i> Sembunyikan Detail';
        
        // Smooth scroll to detail
        setTimeout(() => {
            detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        detail.style.display = 'none';
        button.classList.remove('active');
        button.innerHTML = '<i class="fas fa-chevron-down"></i> Lihat Detail';
    }
}

// ===== TOGGLE FAQ =====
function toggleFaq(question) {
    const faqItem = question.closest('.faq-item');
    const allFaqItems = document.querySelectorAll('.faq-item');
    
    // Close all other FAQs
    allFaqItems.forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    faqItem.classList.toggle('active');
    
    // Smooth scroll to question if opening
    if (faqItem.classList.contains('active')) {
        setTimeout(() => {
            question.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
}

// ===== MOBILE MENU =====
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuIcon) {
    mobileMenuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
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
    if (navLinks && mobileMenuIcon) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnMenuIcon = mobileMenuIcon.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnMenuIcon && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuIcon.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

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

// ===== SUBJECT CARD HOVER EFFECT =====
const subjectCards = document.querySelectorAll('.subject-card');

subjectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===== INFO CARD COUNTER ANIMATION =====
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe info cards and trigger animation
const infoObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const infoContent = entry.target.querySelector('.info-content p');
            if (infoContent) {
                const text = infoContent.textContent.trim();
                // Extract number from text
                const match = text.match(/\d+/);
                if (match) {
                    const targetNumber = parseInt(match[0]);
                    animateValue(infoContent, 0, targetNumber, 1500);
                    
                    // Add back the text after number
                    setTimeout(() => {
                        const restOfText = text.replace(/\d+/, targetNumber);
                        infoContent.textContent = restOfText;
                    }, 1500);
                }
            }
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach(card => {
    infoObserver.observe(card);
});

// ===== DOWNLOAD BUTTON INTERACTIONS =====
const downloadButtons = document.querySelectorAll('.btn-download');
downloadButtons.forEach(button => {
    button.addEventListener('click', function() {
        const originalContent = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengunduh...';
        this.style.pointerEvents = 'none';
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Berhasil!';
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.style.pointerEvents = 'auto';
            }, 2000);
        }, 1500);
    });
});

// ===== TAB FUNCTIONALITY (UPDATED FOR NEW HTML) =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // 1. Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // 2. Add active class to clicked button
        this.classList.add('active');
        
        // 3. Hide all tab contents
        tabContents.forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active-content');
        });
        
        // 4. Show target content based on data-target attribute
        const targetId = this.getAttribute('data-target');
        if (targetId) {
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.style.display = 'block';
                
                // Add slight delay for animation trigger (CSS transition)
                setTimeout(() => {
                    targetContent.classList.add('active-content');
                }, 10);
            }
        }
    });
});

// ===== BREADCRUMB ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const breadcrumbItems = document.querySelectorAll('.breadcrumb a, .breadcrumb span');
    breadcrumbItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 * index);
    });
});

// ===== SCROLL PROGRESS INDICATOR =====
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Create progress bar if doesn't exist
    let progressBar = document.getElementById('scrollProgress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scrollProgress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #4154f1 0%, #6c7cff 100%);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrolled + '%';
});

// ===== CONSOLE MESSAGE =====
console.log('%c📚 Kerangka Asesmen TKA SMP ', 'background: #4154f1; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%cPusat Asesmen Pendidikan - Kemdikbudristek', 'color: #4154f1; font-size: 11px; font-style: italic;');

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`⚡ Halaman dimuat dalam ${loadTime}ms`);
});