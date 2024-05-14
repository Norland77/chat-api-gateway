import { InviteDto } from '../dto/invite.dto';
import { IInvite } from './IInvite';
import { IRoom } from '../../room/interfaces/IRoom';

export interface IInviteController {
  /**
   * Creates a new invite record for a room.
   *
   * @param dto - A DTO containing invite creation information (room ID, initial accept state, invite token).
   * @throws {BadRequestException} - Thrown if an invitation already exists for the room or invite creation fails.
   * @returns {Promise<IInvite>} A promise resolving to the newly created invite object.
   */
  createInvite(dto: InviteDto): Promise<IInvite>;

  /**
   * Accepts an invitation for a user to join a room.
   *
   * @param roomId - The ID of the room to join.
   * @param userId - The ID of the user accepting the invite (provided in the request body).
   * @throws {BadRequestException} - Thrown if the room or user is not found.
   * @returns {Promise<IRoom>} A promise resolving to the updated room object with the user added.
   */
  acceptInvite(roomId: string, userId: { userId: string }): Promise<IRoom>;

  /**
   * Retrieves room information associated with an invitation token.
   *
   * @param token - The invite token to use for finding the room.
   * @throws {BadRequestException} - Thrown if a room with the specified token is not found.
   * @returns {Promise<IInvite>} A promise resolving to the invite object with the included room information if found, otherwise null.
   */
  getRoomByToken(token: string): Promise<IInvite>;
}
