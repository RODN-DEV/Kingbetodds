const View = {
    // Render the list of games into the container
    renderGames: function(categoryKey, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear previous content

        // Check if data is loaded
        if (typeof gamesData === 'undefined') {
            container.innerHTML = '<div class="loader" style="color:red">Error: data.js not loaded.</div>';
            return;
        }

        const data = gamesData[categoryKey] || [];

        if (data.length === 0) {
            container.innerHTML = '<div class="loader">No games available currently.</div>';
            return;
        }

        // Build HTML string
        const gamesHTML = data.map(game => {
            // Determine confidence color
            const confVal = parseInt(game.confidence);
            let confColor = '#f59e0b'; // Default orange
            if (confVal > 85) confColor = '#10b981'; // Green
            else if (confVal > 75) confColor = '#3b82f6'; // Blue

            return `
            <div class="game-card">
                <div class="league-info">
                    <span><i data-lucide="trophy" style="width:12px; height:12px; display:inline;"></i> ${game.league}</span>
                    <span>${game.time} • ${game.date}</span>
                </div>
                
                <div class="match-row">
                    <div class="team">${game.teamA}</div>
                    <span class="vs">VS</span>
                    <div class="team away">${game.teamB}</div>
                </div>

                <div class="prediction-box">
                    <div class="pred-text">
                        <span class="pred-label">Prediction</span>
                        <span class="pred-value">${game.prediction}</span>
                    </div>
                    <div class="odds-badge">${game.odds}</div>
                </div>

                <div class="confidence-meter">
                    <div class="confidence-fill" style="width: ${game.confidence}; background: ${confColor}"></div>
                </div>
                <div style="text-align: right; font-size: 0.7rem; margin-top: 4px; color: ${confColor}; font-weight: bold;">
                    ${game.confidence} Confidence
                </div>
            </div>
            `;
        }).join('');

        container.innerHTML = gamesHTML;
        
        // Re-initialize icons since we added new DOM elements
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    },

    // Update the Section Title
    updateTitle: function(categoryKey) {
        const titleElement = document.getElementById('currentCategoryTitle');
        const titles = {
            topSecret: "Top Secret VIP",
            ultimate: "Ultimate VIP",
            free: "Daily Free Tips",
            overUnder: "Over/Under VIP",
            btts: "Both Teams To Score"
        };
        titleElement.innerText = titles[categoryKey] || "Games";
    },

    // Update active state of tabs
    updateTabs: function(element) {
        if (!element) return;
        const cards = document.querySelectorAll('.cat-card');
        cards.forEach(card => card.classList.remove('active'));
        element.classList.add('active');
    }
};
