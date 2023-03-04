const { Server } = require("socket.io");
const rooms = []

const suits = ['hearts', 'diamonds', 'spades', 'clubs']
const values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']
const card_points = {
    'ace' : -4,
    '2': 2,
    '3' : 3,
    '4' : 4,
    '5' : 5,
    '6' : 6,
    '7' : 7,
    '8' : 8,
    '9' : 9,
    '10' : 10,
    'jack' : 10,
    'queen' : 10,
    'king' : 0
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const generateDeck = (numberOfDecks = 1) => {
    const deck = []

    for (let i = 0; i < numberOfDecks; i++) {
        suits.forEach((suit) => {
            values.forEach((value) => {
                deck.push({
                    suit,
                    value
                })
            })
        })
    }

    shuffleArray(deck)
    shuffleArray(deck)
    return deck
}

const getRoom = (room_id) => {
    const index = rooms.findIndex((room) => room.id === room_id)
    return rooms[index]
}

const getUser = (room, user_id) => {
    const index = room.users.findIndex((user) => user.id === user_id)
    return room.users[index]
}

const leaveRoom = (room_id, user_id) => {
    const room = getRoom(room_id)
    if (!room) return 
    const userIndex = room.users.findIndex((user) => user.id === user_id)
    room.users = room.users.filter((user) => user.id !== user_id)
    room.spectators = room.spectators.filter((spectator) => spectator.id !== user_id)
    const index = rooms.findIndex((item) => item.id === room.id)
    if (room.users.length === 0) rooms.splice(index, 1)
    if (room.admin === user_id && room.users.length) room.admin = room.users[0].id
    if (room.turn === user_id && room.users.length && userIndex === room.users.length) room.turn = room.users[0].id
    return room
}

const joinRoom = (room_id, user_id, username, profilePicture) => {
    const room = getRoom(room_id)
    if (!room) return
    if (room.users.find((user) => user.id === user_id) || room.spectators.find((user) => user.id === user_id)) return room
    if (!room.active || room.complete === room.turn) room.users.push({
        id: user_id,
        name: username,
        profile_picture: profilePicture,
        points: 0,
        history: [],
        hand: []
    })
    else room.spectators.push({
        id: user_id,
        name: username
    })
    return room
}

const createRoom = (room_id, user_id, username, profilePicture) => {
    rooms.push({
        id: room_id,
        admin: user_id,
        round: 0,
        start: user_id,
        turn: user_id,
        complete: null,
        deck: generateDeck(2),
        discard: [],
        active: false,
        card_count: 8,
        spectators: [],
        users: [
            {
                id: user_id,
                name: username,
                profile_picture: profilePicture,
                points: 0,
                hand: [],
                history: [],
                draw: null
            }
        ]
    })

    return getRoom(room_id)
}

/* Gameplay loop functions */

const startGame = (room_id) => {
    const room = getRoom(room_id)
    room.spectators.forEach((spectator) => {
        room.users.push({
            id: spectator.id,
            name: spectator.name,
            points: 0,
            hand: [],
            history: [],
            draw: null
        })
    })
    room.spectators = []

    for (let i = 0; i < room.card_count; i++) {
        for (let j = 0; j < room.users.length; j++) {
            room.users[j].hand.push({
                card: room.deck[room.deck.length - 1],
                flipped: false
            })

            room.deck.pop()
        }
    }

    room.round += 1
    room.discard.push(room.deck.pop())
    room.active = true
    return room
}

const calculateScore = (hand) => {
    const pairs = []; const pairCount = hand.length / 2; let points = 0
    for (let i = 0; i < pairCount; i++) pairs.push([hand[i].card, hand[i + pairCount].card])
    pairs.forEach((pair) => {
        const [firstCard, secondCard] = pair
        if (firstCard.value === secondCard.value && firstCard.value === 'ace') points += -8
        else if (firstCard.value === secondCard.value) points += 0
        else points += card_points[firstCard.value] + card_points[secondCard.value]
    })
    return points
}

const nextRound = (room_id) => {
    const room = getRoom(room_id)
    room.deck = generateDeck(2)
    let index = room.users.findIndex((user) => user.id === room.start)
    index += 1
    if (index === room.users.length) index = 0
    room.start = room.users[index].id
    room.turn = room.users[index].id
    room.users.forEach((user) => user.hand = [])
    room.discard = []
    room.complete = null
    return startGame(room_id)
}

const nextTurn = (room_id) => {
    const room = getRoom(room_id)
    let index = room.users.findIndex((user) => room.turn === user.id)
    index = index + 1
    if (index === room.users.length) index = 0
    if (room.users[index].id === room.complete) room.users.forEach((user) => {
        const round = calculateScore(user.hand)
        user.hand.forEach((card) => card.flipped = true)
        user.points += round
        user.history.push(round)
    })
    room.turn = room.users[index].id
    return room
}

const flipCard = (room_id, user_id, card_id) => {
    const room = getRoom(room_id)
    const user = getUser(room, user_id)
    user.hand[card_id].flipped = true
    return room
}

const drawCard = (room_id, user_id, discard) => {
    const room = getRoom(room_id)
    const user = getUser(room, user_id)
    if (discard) user.draw = room.discard.pop()
    else user.draw = room.deck.pop()
    return room
}

const discardCard = (room_id, user_id) => {
    const room = getRoom(room_id)
    const user = getUser(room, user_id)
    room.discard.push(user.draw)
    user.draw = null
    return nextTurn(room_id)
}

const replaceCard = (room_id, user_id, card_id) => {
    const room = getRoom(room_id)
    const user = getUser(room, user_id)
    room.discard.push(user.hand[card_id].card)
    user.hand[card_id] = {
        flipped: true,
        card: user.draw
    }
    user.draw = null
    if (!user.hand.find((item) => item.flipped === false) && !room.complete) room.complete = user.id
    return nextTurn(room_id)
}

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.NODE_ENV === 'production' ? process.env.ORIGIN || '*' : 'http://localhost:3000' || '*',
            methods: ["GET", "POST"]
        }
    })

    io.use((socket, next) => {
        console.log(`User ${socket.handshake.auth.user_id}`)
        socket.user_id = socket.handshake.auth.user_id
        socket.username = socket.handshake.auth.username
        next()
    })

    io.on('connection', (socket) => {
        console.log('User has connected')

        // Check for username changes
        socket.on('username', (body) => {
            console.log(`Username assigned to ${body.user_id}`)
            socket.user_id = body.user_id
        })

        // Check for user disconnects
        socket.on('disconnect', (body) => {
            console.log('User has disconnected')
        })

        // Get all golf rooms
        socket.on('get_rooms', (body) => {
            console.log('Getting current rooms')
            socket.emit('rooms', rooms)
        })

        // Create a golf room
        socket.on('create_room', (body) => {
            socket.join(body.room_id)
            const room = createRoom(body.room_id, socket.user_id, socket.username, body.profile_picture)
            io.sockets.emit('rooms', rooms)
            socket.emit('join', room)
        })

        // Join a golf room
        socket.on('join_room', (body) => {
            socket.join(body.room_id)
            const room = joinRoom(body.room_id, socket.user_id, socket.username, body.profile_picture)
            socket.emit('join', room)
            io.sockets.emit('rooms', rooms)
            socket.broadcast.to(body.room_id).emit('user_joined', room)
        })

        // Leave a golf room
        socket.on('leave_room', (body) => {
            socket.leave(body.room_id)
            const room = leaveRoom(body.room_id, socket.user_id)
            socket.emit('leave')
            io.sockets.emit('rooms', rooms)
            socket.broadcast.to(body.room_id).emit('user_left', room)
        })

        /* Gameplay loop emits */

        socket.on('start', (body) => {
            const room = startGame(body.room_id)
            io.to(body.room_id).emit('start', room)
        })

        socket.on('next_round', (body) => {
            const room = nextRound(body.room_id)
            io.to(body.room_id).emit('next_round', room)
        })

        socket.on('mouse_move', (body) => {
            const room = getRoom(body.room_id)
            if (!room || socket.user_id !== room.turn) return
            socket.broadcast.to(body.room_id).emit('mouse_move', body)
        })

        socket.on('flip_card', (body) => {
            const room = flipCard(body.room_id, socket.user_id, body.card_id)
            io.to(body.room_id).emit('flip', room)
        })

        socket.on('draw_card', (body) => {
            const room = drawCard(body.room_id, body.user_id, body.discard)
            io.to(body.room_id).emit('draw', room)
        })

        socket.on('replace', (body) => {
            const room = replaceCard(body.room_id, socket.user_id, body.card_id)
            io.to(body.room_id).emit('replace', room)
        })

        socket.on('discard', (body) => {
            const room = discardCard(body.room_id, socket.user_id)
            io.to(body.room_id).emit('discard', room)
        })
    })
}