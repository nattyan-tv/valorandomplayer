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

const main = () => {
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
