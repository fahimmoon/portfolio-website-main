document.addEventListener("DOMContentLoaded",()=>{AOS.init({duration:800,once:!0,offset:100,delay:0,disable:"mobile"});const e=document.querySelectorAll("img[data-src]"),t=new IntersectionObserver(((e,n)=>{e.forEach((e=>{e.isIntersecting&&(e.target.src=e.target.dataset.src,e.target.removeAttribute("data-src"),n.unobserve(e.target))}))}));e.forEach((e=>t.observe(e)))}); 

// Consolidated button initialization
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Single event handler for both touch and click
        const handleInteraction = (e) => {
            if (e.type === 'touchstart') e.preventDefault();
            button.style.transform = 'scale(0.98)';
            button.style.opacity = '0.8';
        };
        
        const handleInteractionEnd = () => {
            button.style.transform = 'scale(1)';
            button.style.opacity = '1';
        };
        
        button.addEventListener('touchstart', handleInteraction, { passive: false });
        button.addEventListener('touchend', handleInteractionEnd);
        button.addEventListener('mousedown', handleInteraction);
        button.addEventListener('mouseup', handleInteractionEnd);
    });
}

// Improved touch event handling for mobile buttons
function initializeMobileButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', (e) => {
            // Prevent ghost clicks
            e.preventDefault();
            // Add active state
            button.classList.add('active');
        }, { passive: false });

        button.addEventListener('touchend', () => {
            // Remove active state
            button.classList.remove('active');
            // Trigger click after short delay to ensure visual feedback
            setTimeout(() => {
                button.click();
            }, 100);
        });
    });
}

// Initialize button fixes on load
document.addEventListener('DOMContentLoaded', () => {
    initializeButtons();
    if (window.matchMedia('(max-width: 768px)').matches) {
        initializeMobileButtons();
    }
});

// Responsive navigation
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
        // Smooth height animation for mobile menu
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.style.height = navbarCollapse.scrollHeight + 'px';
            setTimeout(() => {
                navbarCollapse.style.height = '0px';
            }, 0);
        } else {
            navbarCollapse.style.height = navbarCollapse.scrollHeight + 'px';
        }
    });
}

// Optimized scroll handler with debounce
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
    
    scrollTimeout = window.requestAnimationFrame(() => {
        const nav = document.querySelector('.custom-nav');
        nav?.classList.toggle('nav-scrolled', window.scrollY > 50);
    });
}, { passive: true });

async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('#submitBtn');
    const formData = new FormData(form);
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
    
    try {
        // Get CSRF token
        const csrfResponse = await fetch('csrf.php');
        const csrfToken = await csrfResponse.text();
        formData.append('csrf_token', csrfToken);
        
        const response = await fetch('contact_handler.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        const toast = new bootstrap.Toast(document.getElementById('messageToast'));
        const toastBody = document.querySelector('.toast-body');
        
        if (data.status === 'success') {
            messageToast.classList.remove('bg-danger');
            messageToast.classList.add('bg-success');
            form.reset();
        } else {
            messageToast.classList.remove('bg-success');
            messageToast.classList.add('bg-danger');
        }
        
        toastBody.textContent = data.message;
        toast.show();
    } catch (error) {
        const toast = new bootstrap.Toast(document.getElementById('messageToast'));
        const toastBody = document.querySelector('.toast-body');
        messageToast.classList.add('bg-danger');
        toastBody.textContent = 'There was an error sending your message. Please try again.';
        toast.show();
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Send Message';
    }
    
    return false;
}
