document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    const singleOptionButton = document.getElementById('single-option');
    const againOptionButton = document.getElementById('again-option');

    const aOption1Button = document.getElementById('a-option-1');
    const aOption2Button = document.getElementById('a-option-2');

    const bOption1Button = document.getElementById('b-option-1');
    const bOption2Button = document.getElementById('b-option-2');

    const cOption1Button = document.getElementById('c-option-1');
    const cOption2Button = document.getElementById('c-option-2');
    const cOption3Button = document.getElementById('c-option-3');
  
    const timerContainer = document.getElementById('timer-container');
    let timerInterval; // Variable to store the timer interval
  
    againOptionButton.addEventListener('click', () => {
      startAgain('again-option');
    });

    singleOptionButton.addEventListener('click', () => {
      startAdventure();
    });
  
  
    aOption1Button.addEventListener('click', () => {
      pathChoice('a-option-1');
    });
  
    aOption2Button.addEventListener('click', () => {
      pathChoice('a-option-2');
    });
  
    bOption1Button.addEventListener('click', () => {
      attackChoice('b-option-1');
    });
  
    bOption2Button.addEventListener('click', () => {
      attackChoice('b-option-2');
    });

    cOption1Button.addEventListener('click', () => {
      codeChoice('c-option-1');
    });
    
    cOption2Button.addEventListener('click', () => {
      codeChoice('c-option-2');
    });
  
    cOption3Button.addEventListener('click', () => {
      codeChoice('c-option-3');
    });
  
    function startAdventure() {
      document.getElementById('game-play1').style.display = 'none';
      socket.emit('startAdventure');
      setTimeout(() => {
        afterTakeoff(); 
      }, 46000);      
    }

    function afterTakeoff(){
      document.getElementById('game-play2').style.display = 'block';
      socket.emit('afterTakeoff');
      //resetTimer();
    }
  
    function pathChoice(choice) {        
      document.getElementById('game-play2').style.display = 'none';
      socket.emit('pathChoice', choice);
      setTimeout(() => {
        afterPath(); 
      }, 23000);   
    }

    function afterPath(){
      document.getElementById('game-play3').style.display = 'block';
      socket.emit('afterPath');
      //resetTimer();
    }

      
    function attackChoice(choice) {        
      document.getElementById('game-play3').style.display = 'none';
      socket.emit('attackChoice', choice);
      setTimeout(() => {
        afterAttack(); 
      }, 15000);
        
    }

    function afterAttack(){
      document.getElementById('game-play4').style.display = 'block';
      socket.emit('afterAttack');
      //resetTimer();
    }

    
    function codeChoice(choice) {        
      document.getElementById('game-play4').style.display = 'none';
      //resetTimer(); // Reset the timer when making a choice
      socket.emit('codeChoice', choice);
      setTimeout(() => {
        afterCode(); 
      }, 11000);    

    }
    
    function afterCode(){
      document.getElementById('game-play5').style.display = 'block';
      socket.emit('afterCode');
      //resetTimer();
    }    
  
  
    function startAgain() {
      document.getElementById('game-play2').style.display = 'none';
      document.getElementById('game-play3').style.display = 'none';
      document.getElementById('game-play4').style.display = 'none';
      document.getElementById('game-play5').style.display = 'none';
      socket.emit('startAgain');
    }
  
    // Function to start the timer
    function startTimer() {
      socket.emit('startTimer'); // Notify the server to start the timer
/*       const startTime = Date.now();
      const duration = 300000; // 5 minutes in milliseconds

      function updateTimer() {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = duration - elapsedTime;

          if (remainingTime > 0) {
              const minutes = Math.floor(remainingTime / 60000);
              const seconds = Math.floor((remainingTime % 60000) / 1000);

              timerContainer.textContent = `${minutes}:${seconds}`;
          } else {
              // Time is up, trigger game over
              socket.emit('timerExpired');
              clearInterval(timerInterval); // Clear the interval when the timer expires
          }
      }

      // Initial update
      updateTimer();

      // Update the timer every second
      timerInterval = setInterval(updateTimer, 1000);
 */  }

  
    // Function to reset the timer
/*     function resetTimer() {
      clearInterval(timerInterval);
      timerContainer.textContent = ''; // Clear the timer display
  } */

    // Listen for 'updateState' event to start the timer
    socket.on('updateState', (gameState) => {
      if (gameState.scene >= 2) {
        startTimer();
      }
    });
  
    // Listen for 'timerExpired' event to handle game over state
    socket.on('timerExpired', () => {
      // Perform actions when the timer expires (e.g., restart the game)
      startAgain();
    });


    socket.on('resetGame', () => {
      document.getElementById('game-play1').style.display = 'block'; // Display the initial screen
      resetTimer(); // Reset the timer
    });

    socket.on('aftergameover', () => {
      startAgain();
    });

    socket.on('doyouwanna', (gameState) => {
      afterCode();

    });



  });
  