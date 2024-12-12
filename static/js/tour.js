// Interactive Platform Tour
class PlatformTour {
    constructor() {
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.videoContainer = document.querySelector('.demo-video-container');
        this.verificationPopup = document.querySelector('.verification-popup');
        this.interactionButtons = document.querySelectorAll('.interaction-button');
    }

    bindEvents() {
        if (!this.videoContainer) return;

        this.interactionButtons.forEach(button => {
            button.addEventListener('click', () => this.handleInteraction(button.dataset.action));
        });
    }

    handleInteraction(action) {
        // Show engagement verification popup
        if (this.verificationPopup) {
            this.verificationPopup.classList.add('show');
            
            // Auto-hide after 3 seconds
            setTimeout(() => {
                this.verificationPopup.classList.remove('show');
            }, 3000);
        }

        // Animate the clicked button
        const button = document.querySelector(`[data-action="${action}"]`);
        if (button) {
            button.classList.add('clicked');
            setTimeout(() => button.classList.remove('clicked'), 500);
        }
    }
}

// Initialize tour when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PlatformTour();
});
