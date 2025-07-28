document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('#main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Get the height of the sticky navigation bar
                const navHeight = document.querySelector('#main-nav').offsetHeight;
                // Calculate the target position, accounting for the fixed nav bar
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Section Animation on Scroll (Intersection Observer) ---
    // This observes sections as they enter the viewport and adds an 'animate-in' class.
    const sections = document.querySelectorAll('.section-content');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Active Navigation Link on Scroll ---
    // This highlights the current section in the navigation bar as you scroll.
    const navLinks = document.querySelectorAll('#main-nav a');
    const navBar = document.querySelector('#main-nav'); // Get the navigation bar element

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const navHeight = navBar.offsetHeight; // Get current nav height (important if it changes due to responsiveness)

        // Determine which section is currently in view
        sections.forEach(section => {
            // Adjust offset to account for sticky header. Subtracting 1px for a small buffer.
            const sectionTop = section.offsetTop - navHeight - 1;
            const sectionBottom = sectionTop + section.clientHeight;

            // Check if the current scroll position is within the bounds of this section
            if (pageYOffset >= sectionTop && pageYOffset < sectionBottom) {
                currentSectionId = '#' + section.id;
            }
        });

        // Add/remove 'active' class to navigation links
        navLinks.forEach(link => {
            link.classList.remove('active'); // Remove 'active' from all links first
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active'); // Add 'active' to the relevant link
            }
        });

        // Special case: If at the very top of the page, ensure the first link is active (e.g., 'Summary')
        if (window.pageYOffset === 0 && navLinks.length > 0) {
             navLinks[0].classList.add('active');
        }
    });

    // Manually trigger scroll event on page load to set the initial active link
    window.dispatchEvent(new Event('scroll'));

    // --- Pop-up Details for Skills ---
    // The pop-up (tooltip) for skill items is primarily handled by CSS `:hover` pseudoclass.
    // The HTML for the tooltip is already embedded within the .skill-item.
    // If you needed a *click-to-toggle* behavior instead of hover, you would add JavaScript here
    // to toggle a class (e.g., 'show-tooltip') on click.
});