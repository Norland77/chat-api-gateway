import { IUser } from './IUser';
import { IFile } from './IFile';

export interface IMessage {
  id: string;
  text: string;
  username: string;
  userId: string;
  roomId: string;
  createdAt: Date;
  updatedAt: Date;
  files?: IFile[];
  User?: IUser;
}
