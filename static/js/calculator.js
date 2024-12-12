class EarningsCalculator {
    constructor() {
        this.hoursSlider = document.getElementById('hoursSlider');
        this.rateDisplay = document.getElementById('rateDisplay');
        this.totalEarnings = document.getElementById('totalEarnings');
        this.userTypeSelect = document.getElementById('userType');
        this.ratePerHour = {
            free: 5,     // $5 per hour for free users
            premium: 15   // $15 per hour for premium users
        };
        this.initialize();
    }

    initialize() {
        if (!this.hoursSlider || !this.userTypeSelect) return;
        
        this.hoursSlider.addEventListener('input', () => this.calculateEarnings());
        this.userTypeSelect.addEventListener('change', () => this.calculateEarnings());
        this.calculateEarnings();
    }

    calculateEarnings() {
        const hours = parseInt(this.hoursSlider.value);
        const userType = this.userTypeSelect.value;
        const rate = this.ratePerHour[userType];
        const earnings = hours * rate;
        
        // Animate the numbers with GSAP
        gsap.to(this.rateDisplay, {
            textContent: hours,
            duration: 0.3,
            snap: { textContent: 1 }
        });
        
        gsap.to(this.totalEarnings, {
            textContent: earnings,
            duration: 0.3,
            snap: { textContent: 1 },
            onComplete: () => {
                // Add currency formatting
                this.totalEarnings.textContent = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(earnings);
            }
        });
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EarningsCalculator();
});
