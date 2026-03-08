document.addEventListener("DOMContentLoaded", () => {

    // 1. EFEK NAVBAR BLUR SAAT SCROLL
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
    });

    // 2. HAMBURGER MENU UNTUK MOBILE
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("nav-active");
            menuToggle.classList.toggle("is-active");
        });
    }

    // 3. ANIMASI MUNCUL HALUS (FADE IN - TETAP JALAN 1X BIAR AMAN)
    const faders = document.querySelectorAll(".fade-in");
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("appear");
                observer.unobserve(entry.target); // Dikunci biar gak ngilang lagi
            }
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));

    // 4. MESIN PENGHITUNG ANGKA (JALAN TERUS TIAP BALIK KE SECTION INI)
    const counters = document.querySelectorAll('.counter');

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');

            if (entry.isIntersecting) {
                // Kunci sementara biar gak jalan dobel kalau di-scroll terlalu cepat
                if (counter.getAttribute('data-animating') === 'true') return;
                counter.setAttribute('data-animating', 'true');

                let count = 0;
                // Kecepatan putaran angka (semakin kecil pembagi, semakin lambat)
                const inc = Math.max(1, Math.ceil(target / 40));

                const updateCount = () => {
                    if (count < target) {
                        count += inc;
                        if (count > target) count = target;
                        counter.innerText = count;
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerText = target;
                        counter.setAttribute('data-animating', 'false'); // Buka kunci setelah selesai
                    }
                };
                updateCount();
            } else {
                // RAHASIA: Pas keluar layar, angkanya di-reset ke 0 diem-diem
                counter.innerText = "0";
                counter.setAttribute('data-animating', 'false');
            }
        });
    }, { threshold: 0.5 }); // Jalan pas 50% elemen kotak statistik terlihat

    counters.forEach(counter => statObserver.observe(counter));

    // 5. ACCORDION FAQ (BUKA TUTUP PERTANYAAN)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Opsional: Tutup kotak lain yang sedang terbuka
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Buka atau tutup kotak yang diklik
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');

            if (item.classList.contains('active')) {
                // Set tinggi sesuai isi teksnya
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                // Tutup kembali
                answer.style.maxHeight = null;
            }
        });
    });
});