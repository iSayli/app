
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);



app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'server.html'));
  });
  
  // Serve A.html when accessing /A
  app.get('/A', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'A.html'));
  });
  
  // Serve B.html when accessing /B
  app.get('/B', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'B.html'));
  });
  
  // ...

let gameState = {
  scene: 1,
  bChoice: null,
};
  

function startScene2() {
  gameState.scene = 2;
  io.emit('updateState', gameState);

}

function startScene25() {
  gameState.scene = 2.5;
  io.emit('updateState', gameState);
}


function startScene3() {
  gameState.scene = 3;
  io.emit('updateState', gameState);

}

function startScene35() {
  gameState.scene = 3.5;
  io.emit('updateState', gameState);

}


function startScene4() {
  gameState.scene = 4;
  io.emit('updateState', gameState);

}

function startScene45() {
  gameState.scene = 4.5;
  io.emit('updateState', gameState);
}

function startScene5() {
    gameState.scene = 5;
    io.emit('updateState', gameState);
  
}

function startScene55() {
  gameState.scene = 5.5;
  io.emit('updateState', gameState);
}

function startScene6() {
    gameState.scene = 6;
    io.emit('updateState', gameState);
    setTimeout(() => {
      io.emit('doyouwanna');
    }, 11000);    

}

  
function startAgain() {
  gameState.scene = 1;
  gameState.bChoice = null;
  io.emit('resetGame'); // Emit an event to reset both clients
}

let timerInterval; // Variable to store the timer interval
const timerDuration = 300000; // 5 minutes in milliseconds

function startTimer() {
    clearInterval(timerInterval); // Clear any existing timers

    const startTime = Date.now();

    // Notify clients to start the timer
    io.emit('startTimer');

    // Timer logic
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime >= timerDuration) {
            // Time is up, trigger game over
            io.emit('timerExpired');
            clearInterval(timerInterval); // Clear the interval when the timer expires
        }
    }, 1000);
}



io.on('connection', (socket) => {
  
    socket.on('startAdventure', startScene2);

    socket.on('afterTakeoff', () => {
      startScene25();
      startTimer();
    });
    
    
    socket.on('pathChoice', (choice) => {
      gameState.bChoice = choice;
      if (gameState.bChoice === 'a-option-1') {
          startScene3();
        } else if (gameState.bChoice === 'a-option-2') {
          startScene6();
        }
    });

    socket.on('afterPath', () => {
      startScene35();
      startTimer();
    });

    socket.on('afterAttack', () =>  {
      startScene45();
      startTimer();
    });


    socket.on('attackChoice', (choice) => {
      gameState.bChoice = choice;
    
      if (gameState.bChoice === 'b-option-1') {
        startScene4();
      } else if (gameState.bChoice === 'b-option-2') {
        startScene6();
      }
    });


    socket.on('codeChoice', (choice) => {
      gameState.bChoice = choice;    
      if (gameState.bChoice === 'c-option-1') {
          startScene5();
        } else if (gameState.bChoice === 'c-option-2') {
          startScene6();
        } else if (gameState.bChoice === 'c-option-3') {
          startScene6();
        }
        
      });

      socket.on('afterCode', () => {
        startScene55();
        startTimer();
      });

      socket.on('startAgain', startAgain);
  
  });

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on https://app-production-6364.up.railway.app/`);
});
