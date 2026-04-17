 document.addEventListener('DOMContentLoaded', function() {

            // Sticky Header
            const header = document.getElementById('main-header');
            if (header) {
                const stickyOffset =  50;
                window.addEventListener('scroll', function() { header.classList.toggle("scrolled", window.pageYOffset > stickyOffset); }, { passive: true });
            } else { console.warn("Header element not found."); }

            

            // Mobile Nav Toggle
            const hamburgerMenu = document.getElementById('hamburger-menu');
            const nav = document.querySelector('header nav');
            if (hamburgerMenu && nav) {
                hamburgerMenu.addEventListener('click', () => {
                    nav.classList.toggle('active');
                    hamburgerMenu.classList.toggle('active');
                });
                
                // Close menu when a link is clicked
                nav.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        nav.classList.remove('active');
                        hamburgerMenu.classList.remove('active');
                    });
                });
            }

            // Testimonial Slider
            if (typeof Swiper !== 'undefined') {
                try {
                    new Swiper('.testimonial-slider', {
                        loop: true, autoplay: { delay: 5500, disableOnInteraction: true }, slidesPerView: 1, spaceBetween: 30, grabCursor: true,
                        pagination: { el: '.swiper-pagination', clickable: true }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, watchSlidesProgress: true,
                    });
                } catch (e) { console.error("Swiper init failed:", e); }
            } else { console.warn("Swiper library not found."); }

            // Footer Year
            const yearSpan = document.getElementById('current-year');
            if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }

            // Scroll Animations
           // ===== SIMPLE SCROLL ANIMATION (WORKS 100%) =====
            const handleFadeIn = () => {
                const elements = document.querySelectorAll(".fade-in-hidden");
                const screenHeight = window.innerHeight;

                elements.forEach(el => {
                    const position = el.getBoundingClientRect().top;
                    if (position < screenHeight - 100) {
                        el.classList.add("fade-in-visible");
                    }
                });
            };

            // Run once on load and on scroll
            handleFadeIn();
            window.addEventListener("scroll", handleFadeIn, { passive: true });

            // ===== BOUNCE WHEN ABOUT COLUMNS MEET =====
            let aboutBounced = false;
            const handleBounce = () => {
                if (aboutBounced) return;
                if (window.innerWidth < 768) return; // skip on small screens

                const left = document.querySelector('.about-left');
                const right = document.querySelector('.about-right');
                if (!left || !right) return;

                const rectL = left.getBoundingClientRect();
                const rectR = right.getBoundingClientRect();

                const leftVisible = rectL.top < window.innerHeight && rectL.bottom > 0;
                const rightVisible = rectR.top < window.innerHeight && rectR.bottom > 0;

                // Consider them 'meeting' when their top positions are close
                const verticalGap = Math.abs(rectL.top - rectR.top);

                if (leftVisible && rightVisible && verticalGap < 140) {
                    left.classList.add('bounce-left');
                    right.classList.add('bounce-right');
                    aboutBounced = true;
                }
            };

            // Run on load and scroll
            handleBounce();
            window.addEventListener('scroll', handleBounce, { passive: true });
            // Lightbox
            const lightboxModal = document.getElementById('lightbox-modal');
            const lightboxImage = document.getElementById('lightbox-image');
            const closeButton = document.querySelector('.lightbox-close');
            const galleryImages = document.querySelectorAll('.gallery-item img');
            if (lightboxModal && lightboxImage && closeButton && galleryImages.length > 0) {
                const openLightbox = (imgSrc, imgAlt) => { lightboxImage.src = imgSrc; lightboxImage.alt = imgAlt; lightboxModal.classList.add('active'); document.body.classList.add('lightbox-open'); };
                const closeLightbox = () => { lightboxModal.classList.remove('active'); document.body.classList.remove('lightbox-open'); setTimeout(() => { lightboxImage.src = ""; lightboxImage.alt = ""; }, 400); };
                galleryImages.forEach(image => { image.addEventListener('click', (e) => { e.preventDefault(); openLightbox(image.src, image.alt); }); });
                closeButton.addEventListener('click', closeLightbox);
                lightboxModal.addEventListener('click', (e) => { if (e.target === lightboxModal) { closeLightbox(); } });
                document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightboxModal.classList.contains('active')) { closeLightbox(); } });
            } else { console.warn("Lightbox elements not found."); }

            const scrollBtn = document.getElementById("scrollTopBtn");
            if (scrollBtn) {
                // Show button when scrolling down
                window.addEventListener("scroll", () => {
                    if (window.pageYOffset > 300) {
                        scrollBtn.style.display = "flex";
                    } else {
                        scrollBtn.style.display = "none";
                    }
                }, { passive: true });

                // Scroll to top when clicked
                scrollBtn.addEventListener("click", () => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                });
            } else {
                console.warn("Scroll-to-top button not found.");
            }
            

        });