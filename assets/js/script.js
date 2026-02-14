// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form validation
const form = document.getElementById('contact-form');
if(form){
    form.addEventListener('submit', function(e){
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if(name === "" || email === "" || message === ""){
            alert("Please fill all fields!");
            return;
        }

        // Send email using EmailJS
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(() => {
                alert("Thank you! Your message has been sent. We'll contact you soon.");
                form.reset();
            })
            .catch((err) => {
                console.error(err);
                alert("Oops! Something went wrong. Please try again or email us directly.");
            });
    });
}

// Add this to your existing script.js or create new file
document.addEventListener('DOMContentLoaded', function() {
    // ==================== SLIDESHOW ====================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentSlide = 0;
    let slideInterval;

    // Show specific slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Next slide
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Previous slide
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Event listeners
    if (nextArrow) nextArrow.addEventListener('click', () => {
        nextSlide();
        resetSlideInterval();
    });
    
    if (prevArrow) prevArrow.addEventListener('click', () => {
        prevSlide();
        resetSlideInterval();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetSlideInterval();
        });
    });

    // Auto slide
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    if (slides.length > 0) {
        startSlideInterval();
        
        // Pause on hover
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slideshowContainer.addEventListener('mouseleave', startSlideInterval);
        }
    }

    // ==================== TESTIMONIALS FIX ====================
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevTestimonialBtn = document.querySelector('.prev-btn');
    const nextTestimonialBtn = document.querySelector('.next-btn');
    
    if (testimonialsContainer && testimonialCards.length > 0) {
        let currentTestimonial = 0;
        
        // Function to update testimonial display
        function updateTestimonialDisplay() {
            // Calculate scroll position based on card width
            const card = testimonialCards[0];
            const cardStyle = window.getComputedStyle(card);
            const cardWidth = card.offsetWidth;
            const gap = parseInt(cardStyle.marginRight) || 30;
            const totalWidth = cardWidth + gap;
            
            // Scroll to current testimonial
            testimonialsContainer.scrollLeft = currentTestimonial * totalWidth;
            
            // Update active dot
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            if (testimonialDots[currentTestimonial]) {
                testimonialDots[currentTestimonial].classList.add('active');
            }
        }
        
        // Next testimonial
        if (nextTestimonialBtn) {
            nextTestimonialBtn.addEventListener('click', () => {
                // Calculate how many cards can fit
                const containerWidth = testimonialsContainer.offsetWidth;
                const cardWidth = testimonialCards[0].offsetWidth + 30;
                const cardsPerView = Math.floor(containerWidth / cardWidth);
                
                if (currentTestimonial < testimonialCards.length - cardsPerView) {
                    currentTestimonial++;
                    updateTestimonialDisplay();
                }
            });
        }
        
        // Previous testimonial
        if (prevTestimonialBtn) {
            prevTestimonialBtn.addEventListener('click', () => {
                if (currentTestimonial > 0) {
                    currentTestimonial--;
                    updateTestimonialDisplay();
                }
            });
        }
        
        // Dot navigation
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                updateTestimonialDisplay();
            });
        });
        
        // Update on window resize
        window.addEventListener('resize', updateTestimonialDisplay);
        
        // Initialize
        updateTestimonialDisplay();
        
        // Auto scroll testimonials (optional)
        let testimonialInterval = setInterval(() => {
            const containerWidth = testimonialsContainer.offsetWidth;
            const cardWidth = testimonialCards[0].offsetWidth + 30;
            const cardsPerView = Math.floor(containerWidth / cardWidth);
            
            if (currentTestimonial < testimonialCards.length - cardsPerView) {
                currentTestimonial++;
            } else {
                currentTestimonial = 0;
            }
            updateTestimonialDisplay();
        }, 5000);
        
        // Pause auto scroll on hover
        testimonialsContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialsContainer.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                const containerWidth = testimonialsContainer.offsetWidth;
                const cardWidth = testimonialCards[0].offsetWidth + 30;
                const cardsPerView = Math.floor(containerWidth / cardWidth);
                
                if (currentTestimonial < testimonialCards.length - cardsPerView) {
                    currentTestimonial++;
                } else {
                    currentTestimonial = 0;
                }
                updateTestimonialDisplay();
            }, 5000);
        });
    }
});