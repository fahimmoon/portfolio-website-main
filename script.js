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
