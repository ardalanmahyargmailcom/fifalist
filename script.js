function saveData() {
    const rows = document.querySelectorAll('#matchTable tr');
    const matchData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td input');
        const matchInfo = {
            match: row.cells[0].innerText,
            team1Points: cells[0].value,
            team1GoalsScored: cells[1].value,
            team1GoalsConceded: cells[2].value,
            team2Points: cells[3].value,
            team2GoalsScored: cells[4].value,
            team2GoalsConceded: cells[5].value
        };
        matchData.push(matchInfo);
    });

    // ذخیره داده‌ها در Local Storage
    localStorage.setItem('matchData', JSON.stringify(matchData));
    alert('اطلاعات بازی‌ها ذخیره شد!');
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
}

// بارگذاری داده‌ها هنگام بارگذاری صفحه
window.onload = loadData;
