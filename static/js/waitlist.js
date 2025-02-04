
document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlistForm');
    const modal = new bootstrap.Modal(document.getElementById('waitlistModal'));

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        // Allows formats: (123) 456-7890, 123-456-7890, 1234567890
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(phone);
    };

    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim()
        };

        // Field validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        if (!validateEmail(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation
        if (!validatePhone(formData.phone)) {
            alert('Please enter a valid phone number (e.g., (123) 456-7890 or 1234567890)');
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
