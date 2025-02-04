
document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlistForm');
    const modal = new bootstrap.Modal(document.getElementById('waitlistModal'));

    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim()
        };

        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Here you would typically send the data to your backend
        console.log('Waitlist submission:', formData);
        
        // Clear form and show success message
        waitlistForm.reset();
        modal.hide();
        
        // Show success message
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success fixed-top m-3';
        successAlert.role = 'alert';
        successAlert.innerHTML = 'Thanks for joining our waitlist! We\'ll be in touch soon.';
        document.body.appendChild(successAlert);

        // Remove the alert after 5 seconds
        setTimeout(() => {
            successAlert.remove();
        }, 5000);
    });
});
