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

// Main DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // ==================== SLIDESHOW ====================
    const slides = document.querySelectorAll('.slide');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const dotsContainer = document.getElementById('slideshow-dots');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        // Create dots dynamically
        let dots = [];
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < slides.length; i++) {
                const dot = document.createElement('span');
                dot.className = `dot ${i === 0 ? 'active' : ''}`;
                dot.setAttribute('data-slide', i);
                dot.addEventListener('click', () => {
                    showSlide(i);
                    resetSlideInterval();
                });
                dotsContainer.appendChild(dot);
            }
            dots = document.querySelectorAll('.dot');
        } else {
            // Fallback to static dots if container doesn't exist
            dots = document.querySelectorAll('.dot');
        }

        // Show specific slide
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
           
            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
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

        // Event listeners for arrows
        if (nextArrow) {
            nextArrow.addEventListener('click', () => {
                nextSlide();
                resetSlideInterval();
            });
        }
       
        if (prevArrow) {
            prevArrow.addEventListener('click', () => {
                prevSlide();
                resetSlideInterval();
            });
        }

        // Auto slide
        function startSlideInterval() {
            slideInterval = setInterval(nextSlide, 5000); // 5 seconds for better readability
        }

        function resetSlideInterval() {
            clearInterval(slideInterval);
            startSlideInterval();
        }

        startSlideInterval();
       
        // Pause on hover
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slideshowContainer.addEventListener('mouseleave', startSlideInterval);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetSlideInterval();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetSlideInterval();
            }
        });
    }

    // ==================== TESTIMONIALS ====================
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
            const gap = 30; // Gap between cards
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
       
        // Auto scroll testimonials
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

// ==================== WORKSHOP GALLERY MODAL ====================
// Workshop data - Add your workshop details here
const workshopData = {
    'digital-mental-health': {
        title: 'Digital Mental Health: Coping with Social Media Pressure',
        date: '7th February 2026',
        conductedBy: 'Ms. Melani Hansika',
        description: `A big thank you to Ms. Melani for delivering an eye-opening workshop on "Digital Mental Health: Coping with Social Media Pressure".<br><br>
                     In a world where we're constantly connected, this session reminded us how important it is to set healthy boundaries, be mindful of our digital habits, and protect our mental well-being.<br><br>
                     We truly appreciate Ms. Melani's engaging session and the valuable insights shared with our participants.`,
        images: [
            'assets/images/Workshop Poster.jpg',
            'assets/images/IMG_8140.JPG'
        ]
    }
    // Add more workshops here as needed
};

let currentWorkshop = null;
let currentImageIndex = 0;

// Function to open workshop modal
window.openWorkshopModal = function(workshopId, imageIndex = 1) {
    const workshop = workshopData[workshopId];
    if (!workshop) return;
   
    currentWorkshop = workshopId;
    currentImageIndex = imageIndex - 1; // Convert to 0-based index
   
    // Update modal content
    document.getElementById('modalWorkshopTitle').textContent = workshop.title;
    document.getElementById('modalWorkshopMeta').textContent =
        `${workshop.date} | ${workshop.conductedBy}`;
    document.getElementById('modalWorkshopDescription').innerHTML = workshop.description;
   
    // Update main image
    document.getElementById('modalMainImage').src = workshop.images[currentImageIndex];
   
    // Generate thumbnails
    const thumbnailsContainer = document.getElementById('modalThumbnails');
    thumbnailsContainer.innerHTML = '';
   
    workshop.images.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.classList.add('modal-thumb');
        if (index === currentImageIndex) {
            thumb.classList.add('active');
        }
        thumb.onclick = () => changeImageTo(index);
        thumbnailsContainer.appendChild(thumb);
    });
   
    // Show modal
    const modal = document.getElementById('workshopModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
};

// Function to change image (next/prev)
window.changeImage = function(direction) {
    if (!currentWorkshop) return;
    const workshop = workshopData[currentWorkshop];
    if (!workshop) return;
   
    currentImageIndex = (currentImageIndex + direction + workshop.images.length) % workshop.images.length;
   
    // Update main image
    document.getElementById('modalMainImage').src = workshop.images[currentImageIndex];
   
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.modal-thumb');
    thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
};

// Function to change to specific image
window.changeImageTo = function(index) {
    if (!currentWorkshop) return;
    const workshop = workshopData[currentWorkshop];
    if (!workshop) return;
   
    currentImageIndex = index;
    document.getElementById('modalMainImage').src = workshop.images[currentImageIndex];
   
    const thumbnails = document.querySelectorAll('.modal-thumb');
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
};

// Function to close modal
window.closeModal = function() {
    const modal = document.getElementById('workshopModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
};

// Close modal if clicked outside
window.onclick = function(event) {
    const modal = document.getElementById('workshopModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Keyboard navigation for modal
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('workshopModal');
    if (modal && modal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'Escape') {
            closeModal();
        }
    }
});

// ==================== FOOTER LOADER ====================
async function loadFooter() {
    // Check if supabase is available
    if (typeof supabase === 'undefined') {
        // Fallback footer if supabase not available
        const copyrightEl = document.getElementById('copyright-text');
        const socialEl = document.getElementById('footer-social');
       
        if (copyrightEl) {
            copyrightEl.textContent = '© 2026 StraightWay Global Institute. All Rights Reserved.';
        }
       
        if (socialEl) {
            socialEl.innerHTML = `
                <a href="#" target="_blank"><i class="fab fa-facebook"></i></a>
                <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="#" target="_blank"><i class="fab fa-whatsapp"></i></a>
                <a href="#" target="_blank"><i class="fab fa-linkedin"></i></a>
                <a href="mailto:info@straightwayglobal.org"><i class="fas fa-envelope"></i></a>
            `;
        }
        return;
    }
   
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .eq('id', 1)
            .single();
       
        if (error || !data) {
            console.error('Error loading footer:', error);
            return;
        }
       
        const copyrightEl = document.getElementById('copyright-text');
        const socialEl = document.getElementById('footer-social');
       
        if (copyrightEl) {
            copyrightEl.textContent = data.copyright_text || '© 2026 StraightWay Global Institute. All Rights Reserved.';
        }
       
        if (socialEl) {
            const socialLinks = [];
            if (data.facebook_url) socialLinks.push(`<a href="${data.facebook_url}" target="_blank"><i class="fab fa-facebook"></i></a>`);
            if (data.instagram_url) socialLinks.push(`<a href="${data.instagram_url}" target="_blank"><i class="fab fa-instagram"></i></a>`);
            if (data.whatsapp_url) socialLinks.push(`<a href="${data.whatsapp_url}" target="_blank"><i class="fab fa-whatsapp"></i></a>`);
            if (data.linkedin_url) socialLinks.push(`<a href="${data.linkedin_url}" target="_blank"><i class="fab fa-linkedin"></i></a>`);
            if (data.contact_email) socialLinks.push(`<a href="mailto:${data.contact_email}" target="_blank"><i class="fas fa-envelope"></i></a>`);
           
            socialEl.innerHTML = socialLinks.join('');
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Call footer loader when DOM is ready
if (document.getElementById('footer-social') || document.getElementById('copyright-text')) {
    // Check if supabase is already loaded
    if (typeof supabase !== 'undefined') {
        loadFooter();
    } else {
        // Wait for supabase to load
        window.addEventListener('load', function() {
            if (typeof supabase !== 'undefined') {
                loadFooter();
            }
        });
    }
}
