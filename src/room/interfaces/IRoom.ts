import { IUser } from './IUser';

export interface IRoom {
  id: string;
  name: string;
  ownerId: string;
  isPrivate: boolean;
  isPersonal: boolean;
  inviteLink: string;
  firstUserId?: string;
  secondUserId?: string;
  avatar_url?: string;
  users?: IUser[];
}
