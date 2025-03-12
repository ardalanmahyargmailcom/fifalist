function saveData() {
    const rows = document.querySelectorAll('#matchTable tr');
    const matchData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td input');
        const matchInfo = {
            match: row.cells[0].innerText,
            team1Points: parseInt(cells[0].value) || 0,
            team1GoalsScored: parseInt(cells[1].value) || 0,
            team1GoalsConceded: parseInt(cells[2].value) || 0,
            team2Points: parseInt(cells[3].value) || 0,
            team2GoalsScored: parseInt(cells[4].value) || 0,
            team2GoalsConceded: parseInt(cells[5].value) || 0
        };
        matchData.push(matchInfo);
    });

    // ذخیره داده‌ها در Local Storage
    localStorage.setItem('matchData', JSON.stringify(matchData));
    alert('اطلاعات بازی‌ها ذخیره شد!');
    updateRanking();
}

function loadData() {
    const storedData = localStorage.getItem('matchData');
    if (storedData) {
        const matchData = JSON.parse(storedData);
        const rows = document.querySelectorAll('#matchTable tr');

        matchData.forEach((matchInfo, index) => {
            const cells = rows[index].querySelectorAll('td input');
            cells[0].value = matchInfo.team1Points;
            cells[1].value = matchInfo.team1GoalsScored;
            cells[2].value = matchInfo.team1GoalsConceded;
            cells[3].value = matchInfo.team2Points;
            cells[4].value = matchInfo.team2GoalsScored;
            cells[5].value = matchInfo.team2GoalsConceded;
        });
    }
    updateRanking(); // به‌روزرسانی رتبه‌بندی هنگام بارگذاری داده‌ها
}

function updateRanking() {
    const rows = document.querySelectorAll('#matchTable tr');
    const players = {
        "نوید": { points: 0, goalsScored: 0, goalsConceded: 0 },
        "مهیار": { points: 0, goalsScored: 0, goalsConceded: 0 },
        "رامیار": { points: 0, goalsScored: 0, goalsConceded: 0 },
        "فرشید": { points: 0, goalsScored: 0, goalsConceded: 0 }
    };

    // محاسبه امتیازات و گل‌ها
    rows.forEach(row => {
        const cells = row.querySelectorAll('td input');
        const teams = row.cells[0].innerText.split(' vs ');
        const team1 = teams[0];
        const team2 = teams[1];

        const team1Points = parseInt(cells[0].value) || 0;
        const team1GoalsScored = parseInt(cells[1].value) || 0;
        const team1GoalsConceded = parseInt(cells[2].value) || 0;

        const team2Points = parseInt(cells[3].value) || 0;
        const team2GoalsScored = parseInt(cells[4].value) || 0;
        const team2GoalsConceded = parseInt(cells[5].value) || 0;

        // به‌روزرسانی اطلاعات هر تیم
        players[team1].points += team1Points;
        players[team1].goalsScored += team1GoalsScored;
        players[team1].goalsConceded += team1GoalsConceded;

        players[team2].points += team2Points;
        players[team2].goalsScored += team2GoalsScored;
        players[team2].goalsConceded += team2GoalsConceded;
    });

    // محاسبه اختلاف گل
    for (const player in players) {
        players[player].goalDifference = players[player].goalsScored - players[player].goalsConceded;
    }

    // به‌روزرسانی جدول رتبه‌بندی
    // به‌روزرسانی جدول رتبه‌بندی
    for (const player in players) {
        document.getElementById(`points-${player.toLowerCase()}`).innerText = players[player].points;
        document.getElementById(`goals-scored-${player.toLowerCase()}`).innerText = players[player].goalsScored;
        document.getElementById(`goals-conceded-${player.toLowerCase()}`).innerText = players[player].goalsConceded;
        document.getElementById(`goal-difference-${player.toLowerCase()}`).innerText = players[player].goalDifference;
    }
}

// بارگذاری داده‌ها هنگام بارگذاری صفحه
window.onload = loadData;
