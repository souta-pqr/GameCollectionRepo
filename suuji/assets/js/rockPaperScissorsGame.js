function startRockPaperScissors() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("rockPaperScissorsScreen").style.display = "block";
    document.getElementById("rockButton").style.display = "block";
    document.getElementById("paperButton").style.display = "block";
    document.getElementById("scissorsButton").style.display = "block";
    document.getElementById("rpsDemo").innerHTML = "あなたの手を選んでください。";
}

function playRockPaperScissors(userChoice) {
    var computerChoice = choices[Math.floor(Math.random() * 3)];
    document.getElementById("rpsImage").src = images[computerChoice];
    if(userChoice === computerChoice) {
        document.getElementById("rpsDemo").innerHTML = "引き分け！あなたは " + userChoice + "、コンピュータの手は " + computerChoice + " でした。";
    } else if((userChoice === 'rock' && computerChoice === 'scissors') || (userChoice === 'scissors' && computerChoice === 'paper') || (userChoice === 'paper' && computerChoice === 'rock')) {
        document.getElementById("rpsDemo").innerHTML = "おめでとうございます！あなたの勝ちです！あなたは " + userChoice + "、コンピュータの手は " + computerChoice + " でした。";
    } else {
        document.getElementById("rpsDemo").innerHTML = "残念、あなたの負けです。あなたは " + userChoice + "、コンピュータの手は " + computerChoice + " でした。";
    }
    document.getElementById("rpsResult").innerHTML = document.getElementById("rpsDemo").innerHTML;
    document.getElementById("rockPaperScissorsScreen").style.display = "none";
    document.getElementById("rockPaperScissorsEndScreen").style.display = "block";
}

function restartRockPaperScissors() {
    document.getElementById("rockPaperScissorsEndScreen").style.display = "none";
    document.getElementById("rockPaperScissorsScreen").style.display = "block";
    document.getElementById("rpsDemo").innerHTML = "あなたの手を選んでください。";
}