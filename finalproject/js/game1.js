    let currentAnswer = 0;
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let timeInterval;

    function startGame() {
      score = 0;
      timeLeft = 30;
      document.getElementById('score').textContent = score;
      document.getElementById('time').textContent = timeLeft;

      const input = document.getElementById('answerInput');
      input.disabled = false;
      input.value = '';
      input.focus();

      generateProblem();

      clearInterval(timeInterval);
      timeInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timeInterval);
          input.disabled = true;
          document.getElementById('problem').textContent = "Time's up!";
          alert(`🎉 Final Score: ${score}`);
        }
      }, 1000);

      input.addEventListener('keydown', handleEnter);
    }

    function generateProblem() {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];

      let problemText = `${num1} ${operator} ${num2}`;
      currentAnswer = eval(problemText);
      document.getElementById('problem').textContent = problemText;
    }

    function handleEnter(event) {
      if (event.key === 'Enter') {
        const input = document.getElementById('answerInput');
        const answer = parseInt(input.value);

        if (answer === currentAnswer) {
          score++;
          document.getElementById('score').textContent = score;
        }

        input.value = '';
        generateProblem();
      }
    }
