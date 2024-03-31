import { appConfig } from "@/Utils/appConfig";
import { Socket, io } from "socket.io-client";

class SocketService {
  private socket: Socket;

  public connect(callback: Function): void {
    // Client connects to server:
    this.socket = io(appConfig.baseUrl);

    // Client listens to server:
    this.socket.on("message", (msg: string) => {
      callback(msg);
    });
  }

  public initRoom(room: string) {
    this.socket.emit("initRoom", room);
  }

  public joinRoom(room: string) {
    this.socket.emit("joinRoom", room);
  }

  public closeRoom(room: string) {
    this.socket.emit("closeRoom", room);
  }

  public disconnect(): void {
    // Client disconnects from server:
    this.socket.disconnect();
  }
}

export const socketService = new SocketService();
