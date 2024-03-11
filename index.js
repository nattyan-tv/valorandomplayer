const VLRNDPL = 'VLRNDPL';

const clearAttacker = () => {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`attacker${i}`).innerHTML = '';
    }
}

const clearDefender = () => {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`defender${i}`).innerHTML = '';
    }
}

const clearAll = () => {
    clearAttacker();
    clearDefender();
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`viewer${i}`).value = '';
    }
}

const getPlayers = () => {
    let players = [];
    for (let i = 1; i <= 10; i++) {
        const inputElement = document.getElementById(`viewer${i}`).value;
        if (inputElement === '' || inputElement === null) {
            continue;
        }
        players.push(inputElement);
    }
    return players;
};

const shuffle = () => {
    const players = getPlayers();
    let attackers = [];
    let defenders = [];
    const maxAttackers = Math.floor( players.length / 2 );
    const maxDefenders = players.length - maxAttackers;
    for (let i = 0; i < players.length; i++) {
        if (attackers.length === maxAttackers) {
            defenders.push(players[i]);
            continue;
        }
        if (defenders.length === maxDefenders) {
            attackers.push(players[i]);
            continue;
        }
        const rnd = Math.floor( Math.random() * 2 );
        if (rnd === 0) {
            attackers.push(players[i]);
        } else {
            defenders.push(players[i]);
        }
    }
    clearAttacker();
    for (let i = 1; i <= attackers.length; i++) {
        document.getElementById(`attacker${i}`).innerHTML = attackers[i - 1];
    }
    clearDefender();
    for (let i = 1; i <= defenders.length; i++) {
        document.getElementById(`defender${i}`).innerHTML = defenders[i - 1];
    }
};

const save = () => {
    const players = getPlayers();
    const profileName = document.getElementById('profile-name').value;
    if (profileName === '' || profileName === null) {
        alert('プロファイル名を入力してください～');
        return;
    }
    localStorage.setItem(`${VLRNDPL}-${profileName}`, JSON.stringify(players));
    reloadProfileList();
}

const load = () => {
    const profileName = document.getElementById("profile-list").value;
    if (profileName === '' || profileName === null) {
        alert('プロファイル名を選択してください～');
        return;
    }
    const players = JSON.parse(localStorage.getItem(`${VLRNDPL}-${profileName}`));
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`viewer${i}`).value = '';
    }
    for (let i = 1; i <= players.length; i++) {
        document.getElementById(`viewer${i}`).value = players[i - 1];
    }
}

const deleteProfile = () => {
    const profileName = document.getElementById("profile-list").value;
    if (profileName === '' || profileName === null) {
        alert('プロファイル名を選択してください～');
        return;
    }
    localStorage.removeItem(`${VLRNDPL}-${profileName}`);
    reloadProfileList();
}

const reloadProfileList = () => {
    const profileList = document.getElementById("profile-list");
    profileList.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.indexOf(VLRNDPL) === -1) {
            continue;
        }
        const option = document.createElement('option');
        option.value = key.split('-')[1];
        option.innerHTML = key.split('-')[1];
        profileList.appendChild(option);
    }
}

window.onload = () => {
    reloadProfileList();
}
