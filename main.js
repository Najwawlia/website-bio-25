/* ==========================================================
 * BioGizi - Enhanced JavaScript
 * 1. Scroll Animation (Fade In)
 * 2. Active Link Navbar
 * 3. Progress Bar
 * 4. Smooth Scroll
 * ========================================================== */

// 1. FUNGSI UNTUK MENGATUR ANIMASI SCROLL (FADE IN)
function setupScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// 2. FUNGSI UNTUK MENGATUR NAVIGASI AKTIF
function setupActiveNavbar() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.navbar nav a');
    
    const options = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active-link'));
                
                const currentId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.navbar nav a[href="#${currentId}"]`);
                
                if (activeLink) {
                    activeLink.classList.add('active-link');
                }
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// 3. FUNGSI PROGRESS BAR
function setupProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// 4. SMOOTH SCROLL UNTUK SEMUA LINK
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 5. JALANKAN SEMUA FUNGSI SAAT DOKUMEN SIAP
document.addEventListener('DOMContentLoaded', () => {
    setupScrollAnimation();
    setupActiveNavbar();
    setupProgressBar();
    setupSmoothScroll();
    
    // Animasi awal untuk elemen yang sudah terlihat
    setTimeout(() => {
        const visibleElements = document.querySelectorAll('.fade-in');
        visibleElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('animate');
            }
        });
    }, 100);
});