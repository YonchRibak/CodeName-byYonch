import { appConfig } from "@/Utils/appConfig";
import { Session } from "@/components/game-provider";
import { Dispatch, SetStateAction } from "react";
import { Socket, io } from "socket.io-client";

class SocketService {
  private socket: Socket;

  public connect(): void {
    // Client connects to server:
    this.socket = io(appConfig.baseUrl);
  }

  public isConnected(): boolean {
    return this.socket ? this.socket.connected : false;
  }

  public initRoom(
    room: string,
    callback: Dispatch<SetStateAction<Session>>,
    session: Session
  ) {
    this.socket.emit("initRoom", room);

    // Client listens to room users count
    this.socket.on("getRoomUsersCount", (count) => {
      // Update numberOfUsersInRoom in session
      callback((prevSession: Session) => ({
        ...prevSession,
        numberOfUsersInRoom: count,
      }));
    });

    // Client listens to other users requesting session data
    this.socket.on("requestSessionData", (requestingUserId: string) => {
      this.provideSessionData(requestingUserId, session);
    });
  }

  public joinRoom(
    room: string,
    setSession: Dispatch<SetStateAction<Session>>
  ): void {
    this.socket.emit("joinRoom", room);

    // Client listens to sessionData shared by server:
    this.socket.on("serverSharedSessionData", (sessionData: Session) => {
      setSession(sessionData);
    });
  }

  public closeRoom(room: string) {
    this.socket.emit("closeRoom", room);
  }

  public updateSessionData(updatedSessionData: Session) {
    this.socket.emit("userProvidesUpdatedSessionData", updatedSessionData);
  }

  public provideSessionData(requestingUserId: string, sessionData: Session) {
    this.socket.emit("userProvidesSessionData", {
      sessionData,
      targetUser: requestingUserId,
    });
  }

  public disconnect(): void {
    // Client disconnects from server:
    this.socket.disconnect();
  }
}

export const socketService = new SocketService();
