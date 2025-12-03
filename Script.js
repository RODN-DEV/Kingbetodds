// Initialize Lucide Icons on load
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Element References
const hamburger = document.getElementById('hamburger');
const navOverlay = document.getElementById('navOverlay');

// 1. Initial Load
window.addEventListener('DOMContentLoaded', () => {
    // Load default category
    switchCategory('topSecret');
});

// 2. Navigation Logic
function switchCategory(categoryKey, element) {
    // Call View methods to update UI
    View.updateTabs(element);
    View.updateTitle(categoryKey);
    View.renderGames(categoryKey, 'gamesContainer');
}

// 3. Hamburger Menu Spiral Logic
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navOverlay.classList.toggle('open');
    });
}

function closeMenu() {
    hamburger.classList.remove('active');
    navOverlay.classList.remove('open');
}

// 4. Modal Logic (Privacy Policy)
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}