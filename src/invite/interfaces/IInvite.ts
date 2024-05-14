import { IRoom } from '../../room/interfaces/IRoom';

export interface IInvite {
  id: string;
  roomId: string;
  token: string;
  accept: boolean;
  room?: IRoom;
}
