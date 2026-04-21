// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursor = document.querySelector("#custom-cursor");
const cursorDot = document.querySelector("#cursor-dot");

if (cursor && cursorDot) {
    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");
    const dotXSetter = gsap.quickSetter(cursorDot, "x", "px");
    const dotYSetter = gsap.quickSetter(cursorDot, "y", "px");

    window.addEventListener("mousemove", (e) => {
        xSetter(e.clientX - 16);
        ySetter(e.clientY - 16);
        dotXSetter(e.clientX - 4);
        dotYSetter(e.clientY - 4);
    });

    // Expand cursor on interactive elements
    const interactables = document.querySelectorAll("a, button, input, select, textarea, .cursor-pointer");
    interactables.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("cursor-expanded");
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        });
        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("cursor-expanded");
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });
}

// GSAP Reveal Animations
const reveals = document.querySelectorAll(".gs-reveal");
reveals.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
    });
});

const fadeUps = document.querySelectorAll(".gs-fade-up");
fadeUps.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
    });
});

const fadeLefts = document.querySelectorAll(".gs-fade-left");
fadeLefts.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 80%",
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
    });
});

// Image Reveal with Parallax-like effect
gsap.from(".gs-reveal-img img", {
    scrollTrigger: {
        trigger: ".gs-reveal-img",
        start: "top 70%",
    },
    scale: 1.2,
    filter: "blur(10px)",
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
});

// Doctors Slider Logic
const slider = document.querySelector("#doctors-slider");
const nextBtn = document.querySelector("#slider-next");
const prevBtn = document.querySelector("#slider-prev");

if (slider && nextBtn && prevBtn) {
    let scrollAmount = 0;
    const scrollStep = 400;

    nextBtn.addEventListener("click", () => {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
        gsap.to(slider, {
            scrollTo: { x: scrollAmount },
            duration: 0.8,
            ease: "power2.inOut",
        });
        // Since ScrollToPlugin isn't loaded, we'll use standard scroll
        slider.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        });
    });

    prevBtn.addEventListener("click", () => {
        scrollAmount = Math.max(scrollAmount - scrollStep, 0);
        slider.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        });
    });
}

// Header Scroll Effect
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("shadow-2xl", "py-2");
        header.classList.remove("py-4");
    } else {
        header.classList.remove("shadow-2xl", "py-2");
        header.classList.add("py-4");
    }
});

// Form Submission Simulation
const form = document.querySelector("#appointment-form");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = form.querySelector("button");
        const originalText = btn.innerText;
        
        btn.innerText = "Processing...";
        btn.disabled = true;

        setTimeout(() => {
            btn.innerText = "Appointment Confirmed! ✅";
            btn.classList.add("bg-green-600");
            form.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove("bg-green-600");
                btn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// Navigation Active State on Scroll
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});
