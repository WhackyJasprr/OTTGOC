let cards = [
/*0*/ [' _____    _____   _____   _____   _____   _____   _____   _____   _____   _____   _____   _____   _____ '] 
/*1*/ ['|A .  |  |2    | |3    | |4    | |5    | |6    | |7    | |8    | |9    | |10 ^ | |J  ww| |Q  ww| |K  WW|']
/*2*/ ['| /.\\ | |  ^  | | ^ ^ | | ^ ^ | | ^ ^ | | ^ ^ | | ^ ^ | |^ ^ ^| |^ ^ ^| |^ ^ ^| | ^ {)| | ^ {(| | ^ {)|']
/*3*/ ['|(_._)|  |     | |     | |     | |  ^  | | ^ ^ | |^ ^ ^| | ^ ^ | |^ ^ ^| |^ ^ ^| |(.)% | |(.)%%| |(.)%%|']
/*4*/ ['|  |  |  |  ^  | |  ^  | | ^ ^ | | ^ ^ | | ^ ^ | | ^ ^ | |^ ^ ^| |^ ^ ^| |^ ^ ^| | | % | | |%%%| | |%%%|']
/*5*/ ['|____V|  |____Z| |____E| |____h| |____S| |____9| |____L| |____8| |____6| |___0I| |__%%[| |_%%%O| |_%%%>|']
/*6*/ [' _____    _____   _____   _____   _____   _____   _____   _____   _____   _____   _____   _____   _____ ']
/*7*/ ['|A _  |  |2    | |3    | |4    | |5    | |6    | |7    | |8    | |9    | |10 & | |J  ww| |Q  ww| |K  WW|']
/*8*/ ['| ( ) |  |  &  | | & & | | & & | | & & | | & & | | & & | |& & &| |& & &| |& & &| | o {)| | o {(| | o {)|']
/*9*/ ['|(_\'_)| |     | |     | |     | |  &  | | & & | |& & &| | & & | |& & &| |& & &| |o o% | |o o%%| |o o%%|']
/*10*/['|  |  |  |  &  | |  &  | | & & | | & & | | & & | | & & | |& & &| |& & &| |& & &| | | % | | |%%%| | |%%%|']
/*11*/['|____V|  |____Z| |____E| |____h| |____S| |____9| |____L| |____8| |____6| |___0I| |__%%[| |_%%%O| |_%%%>|']
/*12*/[' _____    _____   _____   _____   _____   _____   _____   _____   _____   _____   _____   _____   _____ ']
/*13*/['|A_ _ |  |2    | |3    | |4    | |5    | |6    | |7    | |8    | |9    | |10 v | |J  ww| |Q  ww| |K  WW|']
/*14*/['|( v )|  |  v  | | v v | | v v | | v v | | v v | | v v | |v v v| |v v v| |v v v| |   {)| |   {(| |   {)|']
/*15*/['| \\ / | |     | |     | |     | |  v  | | v v | |v v v| | v v | |v v v| |v v v| |(v)% | |(v)%%| |(v)%%|']
/*16*/['|  .  |  |  v  | |  v  | | v v | | v v | | v v | | v v | |v v v| |v v v| |v v v| | v % | | v%%%| | v%%%|']
/*17*/['|____V|  |____Z| |____E| |____h| |____S| |____9| |____L| |____8| |____6| |___0I| |__%%[| |_%%%O| |_%%%>|']
/*18*/[' _____    _____   _____   _____   _____   _____   _____   _____   _____   _____   _____    _____    _____ ']
/*19*/['|A ^  |  |2    | |3    | |4    | |5    | |6    | |7    | |8    | |9    | |10 o | |J  ww|  |Q  ww|  |K  WW|']
/*21*/['| / \\ | |  o  | | o o | | o o | | o o | | o o | | o o | |o o o| |o o o| |o o o| | /\\{)| | /\\{(| | /\\{)|']
/*22*/['| \\ / | |     | |     | |     | |  o  | | o o | |o o o| | o o | |o o o| |o o o| | \\/% | | \\/%%| | \\/%%|']
/*23*/['|  .  |  |  o  | |  o  | | o o | | o o | | o o | | o o | |o o o| |o o o| |o o o| |   % |  |  %%%|  |  %%%|']
/*24*/['|____o|  |____Z| |____E| |____h| |____S| |____9| |____L| |____8| |____6| |___0I| |__%%[|  |_%%%O|  |_%%%>|']
/*25*/[' _____    _____ ']
/*26*/['|\ ~ /|  |Joker|']
/*27*/['|}}:{{|  |==%, |']
/*28*/['|}}:{{|  | \\/>\\|']
/*29*/['|}}:{{|  | _>^^|']
/*30*/['|/_~_\\| |/_\\/_|']
]

let pos = {
    'A of spades': [[0, 0], [5, 7]], '2 of spades': [[0, 9], [5, 15]], '3 of spades': [[0, 17], [5, 23]], '4 of spades': [[0, 25], [5, 31]], 
    '5 of spades': [[0, 33], [5, 39]], '6 of spades': [[0, 41], [5, 47]], '7 of spades': [[0, 49], [5, 55]], '8 of spades': [[0, 57], [5, 63]], 
    '9 of spades': [[0, 65], [5, 71]], '10 of spades': [[0, 73], [5, 79]], 'J of spades': [[0, 81], [5, 87]], 'Q of spades': [[0, 89], [5, 95]], 'K of spades': [[0, 97], [5, 103]],

    'A of clubs': [[6, 0], [11, 7]], '2 of clubs': [[6, 9], [11, 15]], '3 of clubs': [[6, 17], [11, 23]], '4 of clubs': [[6, 25], [11, 31]], 
    '5 of clubs': [[6, 33], [11, 39]], '6 of clubs': [[6, 41], [11, 47]], '7 of clubs': [[6, 49], [11, 55]], '8 of clubs': [[6, 57], [11, 63]], 
    '9 of clubs': [[6, 65], [11, 71]], '10 of clubs': [[6, 73], [11, 79]], 'J of clubs': [[6, 81], [11, 87]], 'Q of clubs': [[6, 89], [11, 95]], 'K of clubs': [[6, 97], [11, 103]],

    'A of hearts': [[12, 0], [17, 7]], '2 of hearts': [[12, 9], [17, 15]], '3 of hearts': [[12, 17], [17, 23]], '4 of hearts': [[12, 25], [17, 31]], 
    '5 of hearts': [[12, 33], [17, 39]], '6 of hearts': [[12, 41], [17, 47]], '7 of hearts': [[12, 49], [17, 55]], '8 of hearts': [[12, 57], [17, 63]], 
    '9 of hearts': [[12, 65], [17, 71]], '10 of hearts': [[12, 73], [17, 79]], 'J of hearts': [[12, 81], [17, 87]], 'Q of hearts': [[12, 89], [17, 95]], 'K of hearts': [[12, 97], [17, 103]],

    'A of diamonds': [[18, 0], [23, 7]], '2 of diamonds': [[18, 9], [23, 15]], '3 of diamonds': [[18, 17], [23, 23]], '4 of diamonds': [[18, 25], [23, 31]], 
    '5 of diamonds': [[18, 33], [23, 39]], '6 of diamonds': [[18, 41], [23, 47]], '7 of diamonds': [[18, 49], [23, 55]], '8 of diamonds': [[18, 57], [23, 63]], 
    '9 of diamonds': [[18, 65], [23, 71]], '10 of diamonds': [[18, 73], [23, 79]], 'J of diamonds': [[18, 81], [23, 88]], 'Q of diamonds': [[18, 90], [23, 97]], 'K of diamonds': [[18, 99], [23, 107]],
    
    'joker of red':[[24,9],[29,17]],
    'back':[[24,0],[39,7]]
};

function getCard(name) {
    let position = pos[name];
    let out = [];
    for (let x = position[0][0]; x <= position[1][0]; x++) {
        out.push('');
        for (let y = position[0][1]; y <= position[1][1]; y++) {
            out[out.length - 1] += cards[x][y];  // appending characters
        }
    }
    return out.join('\n');
}


const socket = io();
let formatedHand = []
let Hand = []

// Creating a room
document.getElementById('createRoomBtn').onclick = () => {
    const roomCode = document.getElementById('createRoomCode').value;
    const password = document.getElementById('createPassword').value;

    socket.emit('createRoom', { roomCode, password });
};

// Joining a room
document.getElementById('joinRoomBtn').onclick = () => {
    const roomCode = document.getElementById('joinRoomCode').value;
    const password = document.getElementById('joinPassword').value;

    socket.emit('joinRoom', { roomCode, password });
};

// Receive events from the server
socket.on('roomCreated', (roomCode) => {
    document.getElementById('status').textContent = `Room ${roomCode} created successfully!`;
});

socket.on('playerJoined', (players) => {
    document.getElementById('status').textContent = `Another player joined. Current players: ${players.length}`;
});

socket.on('startGame', () => {
    document.getElementById('joinMenu').style.display = 'none';
    document.getElementById('gameMenu').style.display = 'block';    
    document.getElementById('opHand').innerText = getCard('back')
});

socket.on('error', (message) => {
    document.getElementById('status').textContent = `Error: ${message}`;
});

socket.on('playerLeft', (players) => {
    document.getElementById('status').textContent = `A player left. Remaining players: ${players.length}`;
});

socket.on('getHand',(hand) => {
    Hand = hand
    hand.forEach((item) => {
        //item = ['heart','7']
        formatedHand.push(`${item[1]} of ${item[0]}`)
    });
    document.getElementById('gameHand').innerText = formatedHand.join(' ')
    document.getElementById('myHand').innerText = getCard(Hand[0])
})
