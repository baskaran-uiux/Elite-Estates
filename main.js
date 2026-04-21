/**
 * ELITE ESTATES TAMIL NADU - Monte-Inspired Advanced Animations
 */

// --- SMOOTH SCROLL (LENIS) ---
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// --- CURSOR LOGIC ---
const cursor = document.getElementById('custom-cursor');
const cursorOutline = document.getElementById('custom-cursor-outline');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    cursor.style.display = 'none';
    cursorOutline.style.display = 'none';
} else {
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        gsap.to(cursor, { x: clientX, y: clientY, duration: 0.1, ease: "none" });
        gsap.to(cursorOutline, { x: clientX, y: clientY, duration: 0.35, ease: "power2.out" });
    });
}

// Cursor Hover Effects
function initCursorEffects() {
    const interactive = document.querySelectorAll('a, button, .property-card-monte, .magnetic, .nav-btn-circle, .contact-link, .nav-capsule a, .menu-toggle');
    const cursorText = document.querySelector('.cursor-text');

    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 0, opacity: 0 });
            
            if(el.classList.contains('property-card-monte')) {
                // Project Hover: Big Circle with Text
                gsap.to(cursorOutline, { 
                    width: 150, 
                    height: 150, 
                    backgroundColor: "rgba(17, 17, 17, 0.85)", 
                    borderColor: "rgba(17, 17, 17, 0.85)",
                    duration: 0.4,
                    ease: "expo.out"
                });
                if(cursorText) {
                    cursorText.innerHTML = 'View Project <span>→</span>';
                    gsap.to(cursorText, { opacity: 1, fontSize: "0.7rem", duration: 0.3 });
                }
            } else {
                // Standard Hover: Slightly larger circle
                gsap.to(cursorOutline, { 
                    scale: 2.5, 
                    backgroundColor: "rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    width: 40,
                    height: 40,
                    duration: 0.4,
                    ease: "expo.out"
                });
            }
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, opacity: 1 });
            
            // Reset everything
            gsap.to(cursorOutline, { 
                scale: 1,
                width: 40,
                height: 40,
                backgroundColor: "transparent",
                border: "1px solid rgba(0,0,0,0.2)",
                duration: 0.4,
                ease: "expo.out"
            });
            
            if(cursorText) {
                gsap.to(cursorText, { opacity: 0, fontSize: "0", duration: 0.2 });
            }
        });
        
        if(el.classList.contains('magnetic')) {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.6, ease: "power2.out" });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            });
        }
    });
}

// Utility to split text into words for animation
function splitTextIntoWords(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        const text = el.innerText;
        el.innerHTML = text.split(' ').map(word => 
            `<span class="word-wrap" style="display:inline-block; overflow:hidden; vertical-align:bottom;">
                <span class="word" style="display:inline-block; transform:translateY(110%);">${word}</span>
            </span>`
        ).join(' ');
    });
}

window.addEventListener('load', () => {
    initCursorEffects();
    // 1. Initial Content Splitting
    splitTextIntoWords('#hero-main-title');
    splitTextIntoWords('.section-title');
    
    // Generalized Scroll Reveals for all split texts
    document.querySelectorAll('.section-title').forEach(title => {
        gsap.to(title.querySelectorAll('.word'), {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
            },
            y: 0,
            duration: 1.2,
            stagger: 0.04,
            ease: "expo.out"
        });
    });

    // Generalized Fade-Up for .reveal-up Class
    document.querySelectorAll('.reveal-up').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });
    
    const aboutText = document.querySelector('.reveal-text');
    if(aboutText) {
        const text = aboutText.innerText;
        aboutText.innerHTML = text.split(' ').map(word => `<span class="reveal-word">${word}</span>`).join(' ');
        
        gsap.to('.reveal-word', {
            scrollTrigger: {
                trigger: '.reveal-text',
                start: "top 80%",
                end: "bottom 30%",
                scrub: 1,
            },
            opacity: 1,
            stagger: 0.1,
            color: "#111111",
            ease: "none"
        });
    }

    const masterTl = gsap.timeline();

    // 1. Pre-loader Animation
    masterTl.to('#loader-content h1', {
        y: 0,
        duration: 1,
        ease: "power4.out"
    })
    .to('#loader-content h1', {
        y: -110,
        duration: 0.7,
        ease: "power4.in",
        delay: 0.6
    })
    .to('#pre-loader', {
        height: 0,
        duration: 1.2,
        ease: "expo.inOut"
    })
    // 2. Hero Entry (Restored Centauri Style)
    masterTl.to('.hero-main-wrap .word', {
        y: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "expo.out"
    }, "-=0.8")
    .from('.hero-description, .hero-actions', {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.6")
    .from('.visual-card', {
        opacity: 0,
        y: 100,
        duration: 1.5,
        stagger: 0.2,
        ease: "expo.out"
    }, "-=1")
    .from('.bottom-nav', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
    }, "-=1.5");

    // 3. Scroll Reveals (Monte Style)
    // Improved Advantage Cards Stagger
    gsap.from('.adv-card', {
        scrollTrigger: {
            trigger: '.advantages-grid',
            start: "top 85%", 
        },
        opacity: 0,
        y: 60,
        duration: 1.4,
        stagger: {
            amount: 0.6,
            from: "start"
        },
        ease: "expo.out"
    });

    // 3. Portfolio Mask Reveal (Monte Style)
    const portfolioItems = document.querySelectorAll('.property-card-monte');
    portfolioItems.forEach(item => {
        const mask = item.querySelector('.img-mask');
        const img = item.querySelector('img');
        const meta = item.querySelector('.property-meta');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tl.to(mask, {
            scaleX: 0,
            duration: 1.4,
            ease: "expo.inOut"
        })
        .from(img, {
            scale: 1.25,
            duration: 1.4,
            ease: "expo.inOut"
        }, 0)
        .from(meta, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8");
    });

    // Section Title Word Reveal
    document.querySelectorAll('.section-title').forEach(title => {
        gsap.to(title.querySelectorAll('.word'), {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
            },
            y: 0,
            duration: 1,
            stagger: 0.05,
            ease: "expo.out"
        });
    });

    // Parallax Effects
    gsap.to('.hero-image-side img', {
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            scrub: true
        },
        y: 100,
        ease: "none"
    });

    // Skew on Fast Scroll
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".property-img img", "skewY", "deg"),
        clamp = gsap.utils.clamp(-4, 4);

    ScrollTrigger.create({
        onUpdate: (self) => {
            let skew = clamp(self.getVelocity() / -400);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
                proxy.skew = skew;
                gsap.to(proxy, {
                    skew: 0,
                    duration: 0.8,
                    ease: "power3",
                    overwrite: true,
                    onUpdate: () => skewSetter(proxy.skew)
                });
            }
        }
    });

    // 4. Video Ownership Journey (Narrative Reveal)
    const ownershipTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.ownership-video-section',
            start: "top top",
            end: "+=300%",
            scrub: 1,
            pin: true,
            anticipatePin: 1
        }
    });

    // Video Zoom Parallax
    ownershipTl.to('.ownership-bg-video', {
        scale: 1.2,
        ease: "none"
    }, 0);

    // Start with Smart Ownership Title
    ownershipTl.to('.ownership-final', {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "expo.out"
    })
    .to('.ownership-final', {
        y: -30, // Much smaller movement to avoid nav
        scale: 0.85,
        duration: 2,
        ease: "power2.inOut"
    });

    // Staggered Steps Reveal underneath (they stay visible now)
    const steps = gsap.utils.toArray('.ownership-step');
    steps.forEach((step, i) => {
        ownershipTl.to(step, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        }, "+=0.8"); // Increased offset so they appear one by one
    });

    // Fade out everything at the very end
    ownershipTl.to(['.ownership-final', '.ownership-content'], {
        opacity: 0,
        y: -100,
        duration: 1.5,
        ease: "power2.in"
    }, "+=1");

    // 5. Tailored Solutions (List Reveal)
    gsap.from('.solution-item', {
        scrollTrigger: {
            trigger: '.solutions',
            start: "top 70%",
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "expo.out"
    });

    // 6. Contact Section Expansion Animation
    gsap.to('.contact-card', {
        scrollTrigger: {
            trigger: '.contact',
            start: "top 95%",
            end: "bottom 80%",
            scrub: 1,
        },
        width: "100%",
        borderRadius: "0px",
        ease: "none"
    });

    // 7. Testimonial Slider Logic
    const testimonialData = [
        {
            text: "Unrivaled customer service, cutting edge design and quality. Elite Estates is firmly lodged in our list of preferred partners for luxury properties.",
            name: "Arun Kumar",
            role: "FOUNDER, AK ARCHITECTS",
            img: "images/hero.png"
        },
        {
            text: "The architectural gems they curate blend tradition with modern innovation perfectly. A truly elite experience from start to finish.",
            name: "Priya Lakshmi",
            role: "CEO, LAKSHMI DESIGNS",
            img: "images/chennai.png"
        },
        {
            text: "Elite Estates redefined our living standards in Tamil Nadu. Their attention to detail and sustainability is unmatched.",
            name: "Sanjay Raghav",
            role: "DIRECTOR, SR DEVELOPERS",
            img: "images/chettinad.png"
        }
    ];

    let currentSlide = 0;
    const quoteText = document.querySelector('.quote-text');
    const clientName = document.querySelector('.client-meta h4');
    const clientRole = document.querySelector('.client-meta span');
    const clientImg = document.querySelector('.client-image-wrap img');
    const pagination = document.querySelector('.testimonial-pagination');

    function updateTestimonial(index) {
        const tl = gsap.timeline();
        
        // Fade out
        tl.to(['.client-image-wrap', '.client-quote-wrap'], {
            opacity: 0,
            y: 20,
            duration: 0.5,
            onComplete: () => {
                const data = testimonialData[index];
                quoteText.innerText = data.text;
                clientName.innerText = data.name;
                clientRole.innerText = data.role;
                clientImg.src = data.img;
                pagination.innerText = `${(index + 1).toString().padStart(2, '0')} / ${testimonialData.length.toString().padStart(2, '0')}`;
            }
        });

        // Fade in
        tl.to(['.client-image-wrap', '.client-quote-wrap'], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "expo.out"
        });
    }

    document.getElementById('next-btn').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonialData.length;
        updateTestimonial(currentSlide);
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonialData.length) % testimonialData.length;
        updateTestimonial(currentSlide);
    });

    // Initial reveal animation for the section
    gsap.from('#testimonials', {
        scrollTrigger: {
            trigger: '#testimonials',
            start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out"
    });
    // 8. Hover Image Reveal (List Tracking) - Desktop Only
    if (!isTouchDevice) {
        const revealItems = document.querySelectorAll('.list-item');
        revealItems.forEach(item => {
            const img = item.querySelector('.reveal-img');
            
            // Centering the image correctly
            gsap.set(img, { xPercent: -50, yPercent: -50 });

            item.addEventListener('mousemove', (e) => {
                gsap.to(img, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.8,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            });

            item.addEventListener('mouseenter', () => {
                gsap.to(['#custom-cursor', '#custom-cursor-outline'], { opacity: 0, duration: 0.3 });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(['#custom-cursor', '#custom-cursor-outline'], { opacity: 1, duration: 0.3 });
            });
        });
    }



    // 9. Full Screen Menu Logic
    const menuTrigger = document.getElementById('menu-trigger');
    const menuClose = document.getElementById('menu-close');
    const fullMenu = document.getElementById('full-screen-menu');
    const fullMenuLinks = document.querySelectorAll('.full-menu-link');
    const menuInfoBlocks = document.querySelectorAll('.menu-info-block');

    let isMenuOpen = false;

    // Create a GSAP timeline for the menu
    const menuTl = gsap.timeline({ paused: true });

    menuTl.to(fullMenu, {
        display: 'block',
        duration: 0,
    })
    .to(fullMenu, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.6,
        ease: "expo.inOut"
    })
    .fromTo(fullMenuLinks, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out" },
        "-=0.3"
    )
    .fromTo('.menu-info-section', 
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "expo.out" },
        "-=0.8"
    )
    .fromTo(menuInfoBlocks, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
        "-=0.6"
    );

    function openMenu() {
        isMenuOpen = true;
        menuTl.play();
        lenis.stop(); // Stop smooth scroll
        gsap.to(['#custom-cursor', '#custom-cursor-outline'], { borderColor: '#fff', backgroundColor: '#fff', opacity: 1 });
    }

    function closeMenu() {
        isMenuOpen = false;
        menuTl.reverse();
        lenis.start(); // Restart smooth scroll
    }

    if (menuTrigger) {
        menuTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            openMenu();
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    }

    // Close menu when clicking links
    fullMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // ESC key to close
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                lenis.scrollTo(target);
            }
        });
    });

    // Final global cursor init for new items
    initCursorEffects();
});
