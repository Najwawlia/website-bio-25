/* ==========================================================
   BioGizi JS - Interactivity & Scroll Animations
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Fungsi Muncul Saat Scroll (Reveal on Scroll)
    const observerOptions = {
        threshold: 0.1 // Animasi jalan kalau 10% elemen sudah masuk layar
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Pilih elemen yang mau dikasih efek muncul (Hero, Kartu, Stepper)
    const elementsToAnimate = document.querySelectorAll('.trio-card, .timeline-item, .hero-image-placeholder, h1, h2');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in'); // Tambahkan class dasar
        observer.observe(el);
    });

    // 2. Efek Parallax Ringan pada Logo
    const logoContainer = document.querySelector('.hero-image-placeholder img');
    if (logoContainer) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 30;
            const y = (window.innerHeight / 2 - e.pageY) / 30;
            logoContainer.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
        });
    }

    // 3. Click Effect pada Kartu (Biar kerasa 'Neobrutalism')
    const cards = document.querySelectorAll('.trio-card');
    cards.forEach(card => {
        card.addEventListener('mousedown', () => {
            card.style.transform = 'translate(4px, 4px)';
            card.style.boxShadow = '2px 2px 0px var(--text-dark)';
        });
        card.addEventListener('mouseup', () => {
            card.style.transform = 'translate(-4px, -4px)';
            card.style.boxShadow = '12px 12px 0px var(--primary)';
        });
    });
});