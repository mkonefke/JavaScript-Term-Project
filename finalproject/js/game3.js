    const resultsDiv = document.getElementById('results');
    const scoreDiv = document.getElementById('score');
    let playerScore = 0;
    let computerScore = 0;

    function play(playerChoice) {
      const choices = ['rock', 'paper', 'scissors'];
      const computerChoice = choices[Math.floor(Math.random() * 3)];

      let result = '';

      if (playerChoice === computerChoice) {
        result = "It's a draw!";
      } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
      ) {
        result = `You win! ${capitalize(playerChoice)} beats ${computerChoice}.`;
        playerScore++;
      } else {
        result = `You lose! ${capitalize(computerChoice)} beats ${playerChoice}.`;
        computerScore++;
      }

      resultsDiv.textContent = result;
      scoreDiv.textContent = `You: ${playerScore} | Computer: ${computerScore}`;
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }