const View = {
    updateTitle: function(category) {
        const titles = {
            topSecret: "Top Secret VIP",
            ultimate: "Ultimate VIP",
            free: "Free Daily Tips",
            overUnder: "Over/Under Picks",
            btts: "BTTS / GG"
        };
        document.getElementById('page-title').innerText = titles[category] || "Games";
    },

    renderGames: function(category) {
        const container = document.getElementById('games-container');
        container.innerHTML = ''; // Clear

        if (!gamesData || !gamesData[category]) {
            container.innerHTML = '<div class="text-center text-slate-400 mt-10">No games available</div>';
            return;
        }

        const games = gamesData[category];

        const html = games.map(game => {
            // Logic for styling based on confidence
            const conf = parseInt(game.confidence);
            let barColor = 'bg-amber-500';
            let textColor = 'text-amber-600';
            
            if(conf > 85) {
                barColor = 'bg-emerald-500';
                textColor = 'text-emerald-600';
            } else if (conf > 75) {
                barColor = 'bg-blue-500';
                textColor = 'text-blue-600';
            }

            return `
            <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative">
                <!-- Header: League & Time -->
                <div class="flex justify-between items-center mb-4 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-50 pb-2">
                    <div class="flex items-center gap-1">
                        <i data-lucide="trophy" class="w-3 h-3"></i> ${game.league}
                    </div>
                    <div>${game.time}</div>
                </div>

                <!-- Teams -->
                <div class="flex justify-between items-center mb-4">
                    <div class="text-sm font-bold text-slate-800 w-1/3 break-words">${game.teamA}</div>
                    <div class="px-3 py-1 bg-slate-100 rounded text-xs font-bold text-slate-500">VS</div>
                    <div class="text-sm font-bold text-slate-800 w-1/3 text-right break-words">${game.teamB}</div>
                </div>

                <!-- Prediction Block -->
                <div class="bg-slate-50 rounded-xl p-3 flex justify-between items-center mb-3">
                    <div class="flex flex-col">
                        <span class="text-[10px] text-slate-400 font-bold uppercase">Prediction</span>
                        <span class="font-bold text-slate-900 text-sm">${game.prediction}</span>
                    </div>
                    <div class="bg-slate-900 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg shadow-slate-300">
                        ${game.odds}
                    </div>
                </div>

                <!-- Footer: Confidence -->
                <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div class="${barColor} h-full" style="width: ${game.confidence}"></div>
                </div>
                <div class="text-right text-[10px] font-bold ${textColor} mt-1">
                    ${game.confidence} Probability
                </div>
            </div>
            `;
        }).join('');

        container.innerHTML = html;
        lucide.createIcons(); // Refresh icons
    }
};
