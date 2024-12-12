class EarningsCalculator {
    constructor() {
        this.hoursSlider = document.getElementById('hoursSlider');
        this.rateDisplay = document.getElementById('rateDisplay');
        this.totalEarnings = document.getElementById('totalEarnings');
        this.initialize();
    }

    initialize() {
        if (!this.hoursSlider) return;
        
        this.hoursSlider.addEventListener('input', () => this.calculateEarnings());
        this.calculateEarnings();
    }

    calculateEarnings() {
        const hours = parseInt(this.hoursSlider.value);
        const ratePerHour = 15; // Base rate per hour
        const earnings = hours * ratePerHour;
        
        // Animate the numbers
        gsap.to(this.rateDisplay, {
            textContent: hours,
            duration: 0.3,
            snap: { textContent: 1 }
        });
        
        gsap.to(this.totalEarnings, {
            textContent: earnings,
            duration: 0.3,
            snap: { textContent: 1 }
        });
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EarningsCalculator();
});
