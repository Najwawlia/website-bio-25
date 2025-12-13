/* ==========================================================
 * BioGizi - SCRIPT UTAMA
 * 1. Intersection Observer untuk Animasi Scroll (Fade In)
 * 2. Active Link Navbar
 * ========================================================== */

// 1. FUNGSI UNTUK MENGATUR ANIMASI SCROLL (FADE IN)
function setupScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // Menggunakan viewport sebagai root
        rootMargin: '0px',
        threshold: 0.1 // Pemicu ketika 10% elemen terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Elemen terlihat, tambahkan kelas .animate
                entry.target.classList.add('animate');
                // Hentikan pengamatan setelah dianimasikan
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Amati setiap elemen .fade-in
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}


// 2. FUNGSI UNTUK MENGATUR NAVIGASI AKTIF
function setupActiveNavbar() {
    // Amati semua section yang memiliki class .content-section
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.navbar nav a');
    
    // Opsi untuk Intersection Observer
    const options = {
        root: null,
        // Pemicu ketika bagian (section) berada di tengah viewport
        // Ini memastikan hanya 1 section yang dianggap 'aktif'
        rootMargin: '-50% 0px -50% 0px', 
        threshold: 0 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hapus semua kelas aktif
                navLinks.forEach(link => link.classList.remove('active-link'));
                
                // Dapatkan ID bagian yang sedang terlihat
                const currentId = entry.target.getAttribute('id');
                
                // Temukan dan tambahkan kelas aktif ke tautan yang sesuai
                const activeLink = document.querySelector(`.navbar nav a[href="#${currentId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active-link');
                }
            }
        });
    }, options);

    // Amati setiap bagian konten
    sections.forEach(section => {
        observer.observe(section);
    });
}

// 3. JALANKAN SEMUA FUNGSI SAAT DOKUMEN SIAP
document.addEventListener('DOMContentLoaded', () => {
    setupScrollAnimation();
    setupActiveNavbar();
});