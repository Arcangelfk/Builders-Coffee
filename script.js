document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DEL MENÚ HAMBURGUESA ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        // Animación del ícono
        hamburger.classList.toggle('active');
        // Mostrar/ocultar menú
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace (para móviles)
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // --- ANIMACIÓN DE APARICIÓN EN SCROLL ---
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // usa el viewport
        rootMargin: '0px',
        threshold: 0.15 // El 15% del elemento debe ser visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: deja de observar el elemento una vez que es visible
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // --- VALIDACIÓN DEL FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        const formSuccessMessage = document.getElementById('form-success');
    
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            clearErrors();
            formSuccessMessage.textContent = '';
    
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
    
            if (name.value.trim() === '') {
                showError(name);
                isValid = false;
            }
    
            if (email.value.trim() === '' || !isValidEmail(email.value)) {
                showError(email);
                isValid = false;
            }
    
            if (message.value.trim() === '') {
                showError(message);
                isValid = false;
            }
    
            if (isValid) {
                formSuccessMessage.textContent = '¡Mensaje enviado con éxito! Gracias por contactarnos.';
                contactForm.reset();
            }
        });
    
        function showError(input) {
            input.style.borderColor = '#d9534f';
        }
    
        function clearErrors() {
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => input.style.borderColor = '#ddd');
        }
    
        function isValidEmail(email) {
            const regex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(email).toLowerCase());
        }
    }

    // --- LÓGICA DEL MODAL DE IMÁGENES ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const galleryImages = document.querySelectorAll('.image-gallery .gallery-item img');
    const closeModal = document.querySelector('.close-modal');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

});
