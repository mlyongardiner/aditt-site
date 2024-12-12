class EarningsCalculator {
    constructor() {
        this.hoursSlider = document.getElementById('hoursSlider');
        this.rateDisplay = document.getElementById('rateDisplay');
        this.freeEarnings = document.getElementById('freeEarnings');
        this.premiumEarnings = document.getElementById('premiumEarnings');
        this.ratePerHour = {
            free: 5,     // $5 per hour for free users
            premium: 15   // $15 per hour for premium users
        };
        this.initialize();
    }

    initialize() {
        if (!this.hoursSlider) return;
        
        this.hoursSlider.addEventListener('input', () => this.calculateEarnings());
        this.calculateEarnings();
    }

    calculateEarnings() {
        const hours = parseInt(this.hoursSlider.value);
        const freeEarnings = hours * this.ratePerHour.free;
        const premiumEarnings = hours * this.ratePerHour.premium;
        
        // Animate the numbers with GSAP
        gsap.to(this.rateDisplay, {
            textContent: hours,
            duration: 0.3,
            snap: { textContent: 1 }
        });
        
        gsap.to(this.freeEarnings, {
            textContent: freeEarnings,
            duration: 0.3,
            snap: { textContent: 1 },
            onComplete: () => {
                this.freeEarnings.textContent = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(freeEarnings);
            }
        });

        gsap.to(this.premiumEarnings, {
            textContent: premiumEarnings,
            duration: 0.3,
            snap: { textContent: 1 },
            onComplete: () => {
                this.premiumEarnings.textContent = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(premiumEarnings);
            }
        });
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EarningsCalculator();
});
