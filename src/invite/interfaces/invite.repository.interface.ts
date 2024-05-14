import { IInvite } from './IInvite';
import { InviteDto } from '../dto/invite.dto';

export interface IInviteRepository {
  /**
   * Finds an invitation record associated with a specific room.
   *
   * @param roomId - The ID of the room to find the invite for.
   * @returns {Promise<IInvite | null>} A promise resolving to the invite object if found, otherwise null.
   */
  findInviteByRoom(roomId: string): Promise<IInvite | null>;

  /**
   * Creates a new invite record for a room.
   *
   * @param dto - A DTO containing invite creation information (room ID, initial accept state, invite token).
   * @returns {Promise<IInvite>} A promise resolving to the newly created invite object.
   */
  createInvite(dto: InviteDto): Promise<IInvite>;

  /**
   * Finds a room associated with an invitation token.
   *
   * @param token - The invite token to use for finding the room.
   * @returns {Promise<IInvite | null>} A promise resolving to the invite object with the included room information if found, otherwise null.
   */
  findRoomByToken(token: string): Promise<IInvite | null>;
}
