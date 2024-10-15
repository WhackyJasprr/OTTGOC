// Import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server);
const deck = [
  ['hearts', 'A'], ['hearts', '2'], ['hearts', '3'], ['hearts', '4'], ['hearts', '5'], ['hearts', '6'], ['hearts', '7'], 
  ['hearts', '8'], ['hearts', '9'], ['hearts', '10'], ['hearts', 'J'], ['hearts', 'Q'], ['hearts', 'K'],
  
  ['diamonds', 'A'], ['diamonds', '2'], ['diamonds', '3'], ['diamonds', '4'], ['diamonds', '5'], ['diamonds', '6'], 
  ['diamonds', '7'], ['diamonds', '8'], ['diamonds', '9'], ['diamonds', '10'], ['diamonds', 'J'], ['diamonds', 'Q'], ['diamonds', 'K'],
  
  ['clubs', 'A'], ['clubs', '2'], ['clubs', '3'], ['clubs', '4'], ['clubs', '5'], ['clubs', '6'], ['clubs', '7'], 
  ['clubs', '8'], ['clubs', '9'], ['clubs', '10'], ['clubs', 'J'], ['clubs', 'Q'], ['clubs', 'K'],
  
  ['spades', 'A'], ['spades', '2'], ['spades', '3'], ['spades', '4'], ['spades', '5'], ['spades', '6'], ['spades', '7'], 
  ['spades', '8'], ['spades', '9'], ['spades', '10'], ['spades', 'J'], ['spades', 'Q'], ['spades', 'K'],

  ['joker','red']
];

// Store rooms data (passwords and players)
let rooms = {}; // roomCode: { password: string, players: [] }
let playerRooms = {}; // socket.id: roomCode
let cards = {}; //roomCode : [cards]

// Serve static files (if needed)
app.use(express.static('public')); // Your static files like index.html go here

// Handle client connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  // When a player creates a room
  socket.on('createRoom', ({ roomCode, password }) => {
    if (!rooms[roomCode]) {
      rooms[roomCode] = { password, players: [] };
      socket.join(roomCode);
      rooms[roomCode].players.push(socket.id);
      playerRooms[socket.id] = roomCode; // Map socket.id to roomCode
      console.log(`Room ${roomCode} created by ${socket.id}`);
      socket.emit('roomCreated', roomCode);
    } else {
      socket.emit('error', 'Room already exists');
    }
  });

  socket.on('log', (data) => {
    console.log(data);
  });

  // When a player tries to join a room
  socket.on('joinRoom', ({ roomCode, password }) => {
    const room = rooms[roomCode];
    
    // Check if the room exists and the password matches
    if (room && room.password === password) {
      // Limit the room to 2 players
      if (room.players.length < 2) {
        socket.join(roomCode);
        room.players.push(socket.id);
        playerRooms[socket.id] = roomCode; // Map socket.id to roomCode
        console.log(`${socket.id} joined room ${roomCode}`);

        // Notify the players in the room
        io.to(roomCode).emit('playerJoined', room.players);

        // If there are 2 players, start the game or handle game logic
        if (room.players.length === 2) {
          io.to(roomCode).emit('startGame');  // Broadcast to all players in the room
        
          // Generate the deck for the room
          
          cards[roomCode] = genDeck();
        
          // Loop over each player in the room and send them their hand
          //console.log('Connected players:', Object.keys(io.sockets.sockets));

          room.players.forEach(playerSocketId => {
            let hand = drawTo3(cards[roomCode], []);
            let playerSocket = io.sockets.sockets.get(playerSocketId);
            if (playerSocket) {
                playerSocket.emit('getHand', [hand, playerSocketId]);
            } else {
                console.error(`Socket ID ${playerSocketId} not found`);
            }
        });
              
        }
        
      } else {
        socket.emit('error', 'Room is full');
      }
    } else {
      socket.emit('error', 'Incorrect room code or password');
    }
  });

  // Handle player disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    // Find the room the player was in using the playerRooms dictionary
    const roomCode = playerRooms[socket.id];
    if (roomCode) {
      const room = rooms[roomCode];
      
      // Remove the player from the room
      room.players = room.players.filter((player) => player !== socket.id);
      
      // If the room is now empty, delete it
      if (room.players.length === 0) {
        delete rooms[roomCode];
        console.log(`Room ${roomCode} deleted because it is empty`);
      } else {
        io.to(roomCode).emit('playerLeft', room.players);
      }

      // Remove the player from the playeraRooms dictionary
      delete playerRooms[socket.id];
      delete cards[roomCode]
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function genDeck(){
  let instCards = [...deck]; // Copy the deck array to avoid modifying the original
  let outDeck = [];
  
  while (instCards.length > 0) {
    let randomIndex = Math.floor(Math.random() * instCards.length);
    outDeck.push(instCards[randomIndex]);

    // Remove the card from the temporary deck
    instCards.splice(randomIndex, 1);
  }

  return outDeck;
}


function drawTo3(deck, hand = []) {
  while (hand.length < 3 && deck.length > 0) {
    hand.push(getCard(deck));
  }
  return hand;
}


function getCard(deck){
  let randomIndex = Math.floor(Math.random() * deck.length);
  let card = deck[randomIndex] 
  deck.splice(randomIndex, 1)
  return card
}