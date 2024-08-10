const SUITS = ["hearts", "diamonds", "spades", "clubs"] as const;
type Suit = (typeof SUITS)[number];

const VALUES = [
  "ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
] as const;
type Value = (typeof VALUES)[number];

const CARD_POINTS = {
  ace: -4,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  jack: 10,
  queen: 10,
  king: 0,
} as const satisfies Record<Value, number>;

type Card = { suit: Suit; value: Value };

type Hand = { card: Card; flipped: boolean }[];
export type Deck = Card[];

type User = {
  id: string;
  name: string;
  profile_picture: string;
  points: number;
  history: number[];
  hand: Hand;
  draw?: Card | null;
};

type Spectator = Pick<User, "id" | "name" | "profile_picture">;

type Room = {
  id: string;
  admin: string;
  round: number;
  start: string;
  turn: string;
  complete: string | null;
  deck: Deck;
  discard: Card[];
  active: boolean;
  card_count: number;
  spectators: Spectator[];
  users: User[];
};

export const rooms: Room[] = [];

export const shuffleArray = (deck: Deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
};

export const generateDeck = (numberOfDecks: number = 1) => {
  const deck: Deck = [];
  for (let i = 0; i < numberOfDecks; i++) {
    SUITS.forEach((suit) => {
      VALUES.forEach((value) => {
        deck.push({
          suit,
          value,
        });
      });
    });
  }
  shuffleArray(deck);
  shuffleArray(deck);
  return deck;
};

export const getRoom = (room_id: Room["id"]) => {
  const index = rooms.findIndex((room) => room.id === room_id);
  return rooms[index];
};

export const getUser = (room: Room, user_id: User["id"]) => {
  const index = room.users.findIndex((user) => user.id === user_id);
  return room.users[index];
};

export const leaveRoom = (room_id: Room["id"], user_id: User["id"]) => {
  const room = getRoom(room_id);
  if (!room) return;
  const userIndex = room.users.findIndex((user) => user.id === user_id);
  room.users = room.users.filter((user) => user.id !== user_id);
  room.spectators = room.spectators.filter(
    (spectator) => spectator.id !== user_id
  );
  const index = rooms.findIndex((item) => item.id === room.id);
  if (room.users.length === 0) rooms.splice(index, 1);
  if (room.admin === user_id && room.users.length)
    room.admin = room.users[0].id;
  if (
    room.turn === user_id &&
    room.users.length &&
    userIndex === room.users.length
  )
    room.turn = room.users[0].id;
  return room;
};

export const joinRoom = (
  room_id: Room["id"],
  user_id: User["id"],
  username: User["name"],
  profilePicture: User["profile_picture"]
) => {
  const room = getRoom(room_id);
  if (!room) return;
  if (
    room.users.find((user) => user.id === user_id) ||
    room.spectators.find((user) => user.id === user_id)
  )
    return room;
  if (!room.active || room.complete === room.turn)
    room.users.push({
      id: user_id,
      name: username,
      profile_picture: profilePicture,
      points: 0,
      history: [],
      hand: [],
    });
  else
    room.spectators.push({
      id: user_id,
      name: username,
      profile_picture: profilePicture,
    });
  return room;
};

export const createRoom = (
  room_id: Room["id"],
  user_id: User["id"],
  username: User["name"],
  profilePicture: User["profile_picture"]
) => {
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
        draw: null,
      },
    ],
  });
  return getRoom(room_id);
};

export const startGame = (room_id: Room["id"]) => {
  const room = getRoom(room_id);
  room.spectators.forEach((spectator) => {
    room.users.push({
      ...spectator,
      points: 0,
      hand: [],
      history: [],
      draw: null,
    });
  });

  room.spectators = [];
  for (let i = 0; i < room.card_count; i++) {
    for (let j = 0; j < room.users.length; j++) {
      room.users[j].hand.push({
        card: room.deck[room.deck.length - 1],
        flipped: false,
      });

      room.deck.pop();
    }
  }

  room.round += 1;
  room.discard.push(room.deck.pop()!);
  room.active = true;
  return room;
};

export const calculateScore = (hand: Hand) => {
  const pairs = [];
  const pairCount = hand.length / 2;
  let points = 0;
  for (let i = 0; i < pairCount; i++)
    pairs.push([hand[i].card, hand[i + pairCount].card]);
  pairs.forEach((pair) => {
    const [firstCard, secondCard] = pair;
    if (firstCard.value === secondCard.value && firstCard.value === "ace")
      points += -8;
    else if (firstCard.value === secondCard.value) points += 0;
    else points += CARD_POINTS[firstCard.value] + CARD_POINTS[secondCard.value];
  });
  return points;
};

export const nextRound = (room_id: Room["id"]) => {
  const room = getRoom(room_id);
  room.deck = generateDeck(2);
  let index = room.users.findIndex((user) => user.id === room.start);
  index += 1;
  if (index === room.users.length) index = 0;
  room.start = room.users[index].id;
  room.turn = room.users[index].id;
  room.users.forEach((user) => (user.hand = []));
  room.discard = [];
  room.complete = null;
  return startGame(room_id);
};

export const nextTurn = (room_id: Room["id"]) => {
  const room = getRoom(room_id);
  let index = room.users.findIndex((user) => room.turn === user.id);
  index = index + 1;
  if (index === room.users.length) index = 0;
  if (room.users[index].id === room.complete)
    room.users.forEach((user) => {
      const round = calculateScore(user.hand);
      user.hand.forEach((card) => (card.flipped = true));
      user.points += round;
      user.history.push(round);
    });
  room.turn = room.users[index].id;
  return room;
};

export const flipCard = (
  room_id: Room["id"],
  user_id: User["id"],
  card_index: number
) => {
  const room = getRoom(room_id);
  const user = getUser(room, user_id);
  user.hand[card_index].flipped = true;
  return room;
};

export const drawCard = (
  room_id: Room["id"],
  user_id: User["id"],
  discard: boolean
) => {
  const room = getRoom(room_id);
  const user = getUser(room, user_id);
  if (discard) user.draw = room.discard.pop();
  else user.draw = room.deck.pop();
  return room;
};

export const discardCard = (room_id: Room["id"], user_id: User["id"]) => {
  const room = getRoom(room_id);
  const user = getUser(room, user_id);
  room.discard.push(user.draw!);
  user.draw = null;
  return nextTurn(room_id);
};

export const replaceCard = (
  room_id: Room["id"],
  user_id: User["id"],
  card_index: number
) => {
  const room = getRoom(room_id);
  const user = getUser(room, user_id);
  room.discard.push(user.hand[card_index].card);
  user.hand[card_index] = {
    flipped: true,
    card: user.draw!,
  };
  user.draw = null;
  if (!user.hand.find((item) => item.flipped === false) && !room.complete)
    room.complete = user.id;
  return nextTurn(room_id);
};
