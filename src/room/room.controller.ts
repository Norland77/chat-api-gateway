import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { IRoom } from './interfaces/IRoom';
import { RoomCreateDto } from './dto/room-create.dto';
import { IAllRooms } from './interfaces/IAllRooms';
import { Observable } from 'rxjs';

@Controller('room')
export class RoomController {
  private readonly room_client: ClientProxy;

  constructor(private readonly configService: ConfigService) {
    this.room_client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 5003,
      },
    });
  }

  @Post('create')
  async createRoom(@Body() dto: RoomCreateDto): Promise<Observable<IRoom>> {
    return this.room_client.send('post.create', dto);
  }

  @Delete('delete/:Id')
  async deleteRoom(@Param('Id') id: string): Promise<Observable<IRoom>> {
    return this.room_client.send('delete.byId', id);
  }

  @Get('all')
  async getAllRooms(): Promise<Observable<IAllRooms[]>> {
    return this.room_client.send('get.all', '');
  }

  @Get('/:Id')
  async getRoomById(@Param('Id') id: string): Promise<Observable<IRoom>> {
    return this.room_client.send('get.byId', id);
  }

  @Put('leave/:RoomId')
  async leaveRoom(
    @Param('RoomId') roomId: string,
    @Body() userId: { userId: string },
  ): Promise<Observable<IRoom>> {
    return this.room_client.send('put.leaveRoom', {
      roomId: roomId,
      userId: userId.userId,
    });
  }

  @Post('create/personal')
  async createPersonal(@Body() dto: RoomCreateDto): Promise<Observable<IRoom>> {
    return this.room_client.send('post.createPersonal', dto);
  }
}
