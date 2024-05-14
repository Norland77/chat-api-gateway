import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { IUser } from './interfaces/IUser';
import { UserEditDto } from './dto/user-edit.dto';
import { Observable } from 'rxjs';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller('user')
export class UsersController {
  private readonly user_client: ClientProxy;

  constructor() {
    this.user_client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 5001,
      },
    });
  }

  @Get('all')
  async getAllUsers(): Promise<Observable<IUser[]>> {
    return this.user_client.send('get.users.all', '');
  }

  @Get(':Id')
  async findUserById(@Param('Id') Id: string): Promise<Observable<IUser>> {
    return this.user_client.send('get.users.byId', Id);
  }

  @Delete(':Id')
  async deleteUserById(@Param('Id') Id: string): Promise<Observable<IUser>> {
    return this.user_client.send('delete.users.deleteById', Id);
  }

  @Put(':Id')
  async editUserById(@Param('Id') id: string, @Body() dto: UserEditDto) {
    return this.user_client.send('put.users.editById', { id, dto });
  }
}
