import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import { SessionModel } from "../3-models/session-model";

class SocketService {
  private firstUserInRoom: Map<string, string>; // Map<roomName, userId>
  constructor() {
    this.firstUserInRoom = new Map();
  }
  public handleSocketConnection(httpServer: HttpServer): void {
    // Socket.io options - any client can connect:
    const options = { cors: { origin: "*" } };
    // Create socket server:
    const socketServer = new SocketServer(httpServer, options);

    // Server listens to user connections:
    socketServer.on("connection", (socket: Socket) => {
      console.log("A user has been connected.");

      // Server listens to user providing sessionData, and then shares it in the room:
      socket.on("userProvidesSessionData", ({ sessionData, targetUser }) => {
        console.log(
          `user ${socket.id} has provided sessionData to user ${targetUser}.`
        );
        socket.to(targetUser).emit("serverSharedSessionData", sessionData);
      });
      // Server listens to first user updating session data:
      socket.on(
        "userProvidesUpdatedSessionData",
        (updatedSessionData: SessionModel) => {
          socket
            .to(updatedSessionData.sessionId) // sessionId is the room name.
            .emit("serverSharedSessionData", updatedSessionData);
        }
      );

      // Server listens to user initiating a room:
      socket.on("initRoom", (roomName: string) => {
        socket.join(roomName);
        console.log(`Room ${roomName} was created`);

        if (!this.firstUserInRoom.has(roomName)) {
          // if there is not yet a user in the room:
          this.firstUserInRoom.set(roomName, socket.id); // set first user to firstUserInRoom Map
        }
      });

      socket.on("requestRoomUsersCount", (roomName) => {
        socket
          .to(roomName)
          .emit(
            "getRoomUsersCount",
            socketServer.sockets.adapter.rooms.get(roomName).size
          );
      });
      // Server listens to user closing a room:
      socket.on("closeRoom", (roomName: string) => {
        socketServer.socketsLeave(roomName);
        console.log(`Room ${roomName} has been closed`);
      });

      // Server listens to user attempting to join room:
      socket.on("joinRoom", (roomName: string) => {
        if (socketServer.sockets.adapter.rooms.has(roomName)) {
          console.log(
            "users is room: ",
            socketServer.sockets.adapter.rooms.get(roomName).size
          );
          // a user can only join a room if he submits an existing room name.
          if (socketServer.sockets.adapter.rooms.get(roomName).size < 4) {
            // only 3 users are allowed in a room.
            socket.join(roomName);

            // Server sends first user in the room number of users in room:
            socket
              .to(this.firstUserInRoom.get(roomName))
              .emit(
                "getRoomUsersCount",
                socketServer.sockets.adapter.rooms.get(roomName).size
              );
            // server sends first user in the room a request for session data:
            socket
              .to(this.firstUserInRoom.get(roomName))
              .emit("requestSessionData", socket.id);

            console.log(`user ${socket.id} has joined room ${roomName}`);
          } else {
            console.log(
              `user ${socket.id} has tried to join room ${roomName}, but it was full`
            );
            socket.disconnect();
          }
        } else {
          console.log(
            `user ${socket.id} has attempted to join a non-existent room`
          );
          socket.disconnect();
        }
      });
      // Server listens to client disconnection:
      socket.on("disconnect", () => {
        console.log(`${socket.id} has been disconnected`);
      });
    });
  }
}

export const socketService = new SocketService();
