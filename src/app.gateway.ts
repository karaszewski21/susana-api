import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    console.log('message', payload);
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('join')
  join(socket: Socket, roomId: string): void {
    const roomClients = this.server.sockets.adapter.rooms;
    const client = this.server.sockets.adapter.rooms.has(roomId);

    if (roomId === '123') {
      [...this.server.sockets.adapter.rooms.keys()].forEach((el) => {
        this.server.socketsLeave(el);
      });
    }
    console.log(roomClients);

    if (!client && roomId === '21') {
      console.log(
        `Creating room ${roomId} and emitting room_created socket event`,
      );
      socket.join(roomId);
      socket.emit('room_created', roomId);
    } else if (client && roomId === '21') {
      console.log(
        `Joining room ${roomId} and emitting room_joined socket event`,
      );
      socket.join(roomId);
      socket.emit('room_joined', roomId);
    } else {
      console.log(`Can't join room ${roomId}, emitting full_room socket event`);
      socket.emit('full_room', roomId);
    }
  }

  @SubscribeMessage('start_call')
  start_call(socket: Socket, roomId: string): void {
    console.log(`Broadcasting start_call event to peers in room ${roomId}`);
    socket.broadcast.to(roomId).emit('start_call');
  }

  @SubscribeMessage('webrtc_offer')
  webrtc_offer(socket: Socket, event: any): void {
    console.log(
      `Broadcasting webrtc_offer event to peers in room ${event.roomId}`,
    );
    socket.broadcast.to(event.roomId).emit('webrtc_offer', event.sdp);
  }

  @SubscribeMessage('webrtc_answer')
  webrtc_answer(socket: Socket, event: any): void {
    console.log(
      `Broadcasting webrtc_answer event to peers in room ${event.roomId}`,
    );
    socket.broadcast.to(event.roomId).emit('webrtc_answer', event.sdp);
  }

  @SubscribeMessage('webrtc_ice_candidate')
  webrtc_ice_candidate(socket: Socket, event: any): void {
    console.log(
      `Broadcasting webrtc_ice_candidate event to peers in room ${event.roomId}`,
    );
    socket.broadcast.to(event.roomId).emit('webrtc_ice_candidate', event);
  }
}
