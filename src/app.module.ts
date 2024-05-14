import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './room/room.module';
import { MessagesModule } from './messages/messages.module';
import { InviteModule } from './invite/invite.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RoomModule,
    MessagesModule,
    InviteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
