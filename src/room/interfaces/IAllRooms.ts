import { IUser } from './IUser';
import { IMessage } from './IMessage';

export interface IAllRooms {
  messages: IMessage[];
  users: IUser[];
}
