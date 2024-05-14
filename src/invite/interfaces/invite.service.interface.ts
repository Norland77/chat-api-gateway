import { IInvite } from './IInvite';
import { InviteDto } from '../dto/invite.dto';

export interface IInviteService {
  /**
   * Checks if an invitation record already exists for a specific room.
   *
   * @param roomId - The ID of the room to check for an invitation.
   * @throws {BadRequestException} - Thrown if an invitation already exists for the room.
   */
  findInviteByRoom(roomId: string): Promise<void>;

  /**
   * Creates a new invite record for a room.
   *
   * @param dto - A DTO containing invite creation information (room ID, initial accept state, invite token).
   * @throws {BadRequestException} - Thrown if invite creation fails (consider specific error messages for debugging).
   * @returns {Promise<IInvite>} A promise resolving to the newly created invite object.
   */
  createInvite(dto: InviteDto): Promise<IInvite>;

  /**
   * Finds a room associated with an invitation token.
   *
   * @param token - The invite token to use for finding the room.
   * @throws {BadRequestException} - Thrown if a room with the specified token is not found.
   * @returns {Promise<IInvite>} A promise resolving to the invite object with the included room information if found, otherwise null.
   */
  findRoomByToken(token: string): Promise<IInvite>;
}
