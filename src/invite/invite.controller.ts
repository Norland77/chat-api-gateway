import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { InviteDto } from './dto/invite.dto';
import { IInvite } from './interfaces/IInvite';
import { IRoom } from './interfaces/IRoom';
import { Observable } from 'rxjs';

@Controller('invite')
export class InviteController {
  private readonly invite_client: ClientProxy;

  constructor(private readonly configService: ConfigService) {
    this.invite_client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 5005,
      },
    });
  }

  @Post('create')
  async createInvite(@Body() dto: InviteDto): Promise<Observable<IInvite>> {
    return this.invite_client.send('post.create', dto);
  }

  @Put('accept/:RoomId')
  async acceptInvite(
    @Param('RoomId') roomId: string,
    @Body() userId: { userId: string },
  ): Promise<Observable<IRoom>> {
    return this.invite_client.send('put.accept', { roomId, userId });
  }

  @Get('token/:Token')
  async getRoomByToken(
    @Param('Token') token: string,
  ): Promise<Observable<IInvite>> {
    return this.invite_client.send('get.roomByToken', token);
  }
}
