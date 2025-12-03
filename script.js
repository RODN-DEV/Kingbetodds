// Initialize Icons
lucide.createIcons();

// --- ROUTER SYSTEM ---
const router = {
    // Navigate to Game Page
    goPage: function(category) {
        // 1. Populate Data
        View.renderGames(category);
        View.updateTitle(category);

        // 2. Slide In Animation
        document.getElementById('view-games').classList.remove('translate-x-full');
        document.getElementById('view-games').classList.add('translate-x-0');
        
        // 3. Helper: Close other views
        document.getElementById('view-support').classList.add('translate-x-full');
    },

    // Navigate Home
    goHome: function() {
        // Slide Out All Overlays
        document.getElementById('view-games').classList.add('translate-x-full');
        document.getElementById('view-games').classList.remove('translate-x-0');
        
        document.getElementById('view-support').classList.add('translate-x-full');
        document.getElementById('view-support').classList.remove('translate-x-0');
    },

    // Navigate Support
    goSupport: function() {
        document.getElementById('view-support').classList.remove('translate-x-full');
        document.getElementById('view-support').classList.add('translate-x-0');
        
        // Close others
        document.getElementById('view-games').classList.add('translate-x-full');
    }
};

// --- MENU SYSTEM ---
const hamburger = document.getElementById('hamburger');
const navOverlay = document.getElementById('navOverlay');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    
    // Toggle Slide
    if (navOverlay.classList.contains('-translate-x-full')) {
        navOverlay.classList.remove('-translate-x-full');
    } else {
        navOverlay.classList.add('-translate-x-full');
    }
});

function closeMenu() {
    hamburger.classList.remove('active');
    navOverlay.classList.add('-translate-x-full');
}

// Initial Load
window.addEventListener('DOMContentLoaded', () => {
    // Ensure all views are reset
    router.goHome();
});
