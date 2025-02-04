
document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlistForm');
    const modal = new bootstrap.Modal(document.getElementById('waitlistModal'));

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(phone);
    };

    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim()
        };

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
            alert('Please fill in all fields');
            return;
        }

        if (!validateEmail(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (!validatePhone(formData.phone)) {
            alert('Please enter a valid phone number (e.g., (123) 456-7890 or 1234567890)');
            return;
        }

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit');
            }
            
            waitlistForm.reset();
            modal.hide();

            // Create success alert with animation
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success fixed-top m-3 success-animation';
            successAlert.role = 'alert';
            successAlert.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="success-checkmark me-3">
                        <div class="check-icon">
                            <span class="icon-line line-tip"></span>
                            <span class="icon-line line-long"></span>
                        </div>
                    </div>
                    <div>
                        <h4 class="alert-heading mb-1">Success!</h4>
                        <p class="mb-0">Thanks for joining our waitlist! We'll be in touch soon.</p>
                    </div>
                </div>
            `;
            document.body.appendChild(successAlert);

            // Animate alert entrance
            gsap.from(successAlert, {
                y: -100,
                opacity: 0,
                duration: 0.5,
                ease: "back.out"
            });

            // Remove alert after delay
            setTimeout(() => {
                gsap.to(successAlert, {
                    y: -100,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => successAlert.remove()
                });
            }, 5000);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit: ' + error.message);
        }
    });
});
