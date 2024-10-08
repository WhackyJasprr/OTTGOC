// Import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server);

// Store rooms data (passwords and players)
let rooms = {}; // roomCode: { password: string, players: [] }
let playerRooms = {}; // socket.id: roomCode

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
          io.to(roomCode).emit('startGame');
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

      // Remove the player from the playerRooms dictionary
      delete playerRooms[socket.id];
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});