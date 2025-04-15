document.addEventListener('DOMContentLoaded', function() {
    // Typing animation setup
    const roles = [
        "Full Stack Developer",
        "Python Developer",
        "Data Analyst",
        "Tech Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const typedTextSpan = document.querySelector(".typed-text");
        const cursorSpan = document.querySelector(".cursor");
        
        if (!typedTextSpan || !cursorSpan) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing animation
    setTimeout(type, 1000);

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });

    // Handle CV download
    const cvLink = document.querySelector('a[href$="CV.pdf"]');
    if (cvLink) {
        cvLink.addEventListener('click', function(e) {
            const path = this.getAttribute('href');
            if (!path.startsWith('http') && !path.startsWith('//')) {
                const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');
                this.href = baseUrl + path;
            }
        });
    }
}); 