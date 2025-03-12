function saveData() {
    const rows = document.querySelectorAll('#teamTable tr');
    const teamData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td input');
        const teamInfo = {
            name: row.cells[0].innerText,
            points: cells[0].value,
            goalsScored: cells[1].value,
            goalsConceded: cells[2].value,
            wins: cells[3].value,
            losses: cells[4].value
        };
        teamData.push(teamInfo);
    });

    // ذخیره داده‌ها در Local Storage
    localStorage.setItem('teamData', JSON.stringify(teamData));
    alert('اطلاعات ذخیره شد!');
}

function loadData() {
    const storedData = localStorage.getItem('teamData');
    if (storedData) {
        const teamData = JSON.parse(storedData);
        const rows = document.querySelectorAll('#teamTable tr');

        teamData.forEach((teamInfo, index) => {
            const cells = rows[index].querySelectorAll('td input');
            cells[0].value = teamInfo.points;
            cells[1].value = teamInfo.goalsScored;
            cells[2].value = teamInfo.goalsConceded;
            cells[3].value = teamInfo.wins;
            cells[4].value = teamInfo.losses;
        });
    }
}

// بارگذاری داده‌ها هنگام بارگذاری صفحه
window.onload = loadData;