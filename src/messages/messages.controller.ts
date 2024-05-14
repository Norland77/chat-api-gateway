import { Controller, Delete, Get, Param } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { IFile } from '../room/interfaces/IFile';
import { IMessage } from '../room/interfaces/IMessage';
import { Observable } from 'rxjs';

@Controller('message')
export class MessagesController {
  private readonly messages_client: ClientProxy;

  constructor(private readonly configService: ConfigService) {
    this.messages_client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 5004,
      },
    });
  }

  @Get('images/:Id')
  async getAllImagesByRoom(
    @Param('Id') id: string,
  ): Promise<Observable<IFile[]>> {
    return this.messages_client.send('get.allImages', id);
  }

  @Get('all/:Id')
  async getAllMessage(
    @Param('Id') id: string,
  ): Promise<Observable<IMessage[]>> {
    return this.messages_client.send('get.all', id);
  }

  @Delete('delete/:Id')
  async deleteMessage(@Param('Id') id: string): Promise<Observable<IMessage>> {
    return this.messages_client.send('delete.byId', id);
  }
}
