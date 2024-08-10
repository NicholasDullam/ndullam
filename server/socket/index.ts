import { Server, Socket } from "socket.io";
import {
  createRoom,
  discardCard,
  drawCard,
  flipCard,
  getRoom,
  joinRoom,
  leaveRoom,
  nextRound,
  replaceCard,
  rooms,
  startGame,
} from "./util";

type ExtendedSocket = Socket & { user_id?: string; username?: string };

export type Event =
  | "username"
  | "disconnect"
  | "get_rooms"
  | "create_room"
  | "join_room"
  | "leave_room"
  | "start"
  | "next_round"
  | "mouse_move"
  | "flip_card"
  | "draw_card"
  | "replace"
  | "discard";

export default (server: ConstructorParameters<typeof Server>[0]) => {
  const io = new Server(server, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? process.env.ORIGIN
          : "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket: ExtendedSocket, next) => {
    console.log(`User ${socket.handshake.auth.user_id}`);
    socket.user_id = socket.handshake.auth.user_id;
    socket.username = socket.handshake.auth.username;
    next();
  });

  io.on("connection", (socket: ExtendedSocket) => {
    console.log("User has connected");

    // Check for username changes
    socket.on("username", (body) => {
      console.log(`Username assigned to ${body.user_id}`);
      socket.user_id = body.user_id;
    });

    // Check for user disconnects
    socket.on("disconnect", (body) => {
      console.log("User has disconnected");
    });

    // Get all golf rooms
    socket.on("get_rooms", (body) => {
      console.log("Getting current rooms");
      socket.emit("rooms", rooms);
    });

    // Create a golf room
    socket.on("create_room", (body) => {
      socket.join(body.room_id);
      const room = createRoom(
        body.room_id,
        socket.user_id!,
        socket.username!,
        body.profile_picture
      );
      io.sockets.emit("rooms", rooms);
      socket.emit("join", room);
    });

    // Join a golf room
    socket.on("join_room", (body) => {
      socket.join(body.room_id);
      const room = joinRoom(
        body.room_id,
        socket.user_id!,
        socket.username!,
        body.profile_picture
      );
      socket.emit("join", room);
      io.sockets.emit("rooms", rooms);
      socket.broadcast.to(body.room_id).emit("user_joined", room);
    });

    // Leave a golf room
    socket.on("leave_room", (body) => {
      socket.leave(body.room_id);
      const room = leaveRoom(body.room_id, socket.user_id!);
      socket.emit("leave");
      io.sockets.emit("rooms", rooms);
      socket.broadcast.to(body.room_id).emit("user_left", room);
    });

    /* Gameplay loop emits */

    socket.on("start", (body) => {
      const room = startGame(body.room_id);
      io.to(body.room_id).emit("start", room);
    });

    socket.on("next_round", (body) => {
      const room = nextRound(body.room_id);
      io.to(body.room_id).emit("next_round", room);
    });

    socket.on("mouse_move", (body) => {
      const room = getRoom(body.room_id);
      if (!room || socket.user_id !== room.turn) return;
      socket.broadcast.to(body.room_id).emit("mouse_move", body);
    });

    socket.on("flip_card", (body) => {
      const room = flipCard(body.room_id, socket.user_id!, body.card_id);
      io.to(body.room_id).emit("flip", room);
    });

    socket.on("draw_card", (body) => {
      const room = drawCard(body.room_id, body.user_id, body.discard);
      io.to(body.room_id).emit("draw", room);
    });

    socket.on("replace", (body) => {
      const room = replaceCard(body.room_id, socket.user_id!, body.card_id);
      io.to(body.room_id).emit("replace", room);
    });

    socket.on("discard", (body) => {
      const room = discardCard(body.room_id, socket.user_id!);
      io.to(body.room_id).emit("discard", room);
    });
  });
};
