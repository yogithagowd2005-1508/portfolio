document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. DARK/LIGHT THEME TOGGLE
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference in localStorage, or check system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
    } else if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
    } else {
        // Fallback to system preference (default dark in HTML)
        if (!systemPrefersDark) {
            htmlElement.setAttribute('data-theme', 'light');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        let newTheme = 'dark';

        if (currentTheme === 'dark') {
            newTheme = 'light';
        }

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    /* ==========================================================================
       2. MOBILE DRAWER NAVIGATION MENU
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        // Prevent body scrolling when mobile menu is open
        document.body.classList.toggle('no-scroll');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close menu when link is clicked
            if (mobileMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       3. STICKY NAVBAR & BACK-TO-TOP BUTTON
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Sticky Navbar effect
        if (scrollPos > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top visibility
        if (scrollPos > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       4. TYPING ANIMATION (HERO SUBTITLE)
       ========================================================================== */
    const words = [
        "Software Developer", 
        "Data Analytics Enthusiast", 
        "Machine Learning Enthusiast"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTextElement = document.getElementById('typing-text');
    let typeSpeed = 100;

    const typeEffect = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Delete faster
        } else {
            // Add character
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing speed
        }

        // Handle word boundaries
        if (!isDeleting && charIndex === currentWord.length) {
            // Finished typing, pause
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    };

    // Initialize typing
    if (typingTextElement) {
        setTimeout(typeEffect, 1000);
    }

    /* ==========================================================================
       5. SCROLL REVEAL (FADE-IN ANIMATION)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve after revealing to prevent repetitive triggers
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       6. SCROLL SPY (ACTIVE NAV LINK HIGHLIGHT)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 120; // Offset for sticky navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);

    /* ==========================================================================
       7. CONTACT FORM VALIDATION & INTERACTIVE RESPONSE
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all fields.', 'error');
                return;
            }

            // Disable submit button and show sending indicator
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            showFormStatus('', '');

            // Mock AJAX submission
            setTimeout(() => {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                // Show success message
                showFormStatus('Message sent successfully! Thank you for reaching out, C.K. Yogitha will reply soon.', 'success');
                
                // Reset form
                contactForm.reset();
            }, 1800);
        });
    }

    const showFormStatus = (message, type) => {
        formStatus.textContent = message;
        formStatus.className = 'form-status'; // Reset classes
        if (type) {
            formStatus.classList.add(type);
        }
    };
});
