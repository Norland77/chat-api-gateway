import { IRoom } from './IRoom';
import { RoomCreateDto } from '../dto/room-create.dto';
import { IAllRooms } from './IAllRooms';

export interface IRoomRepository {
  /**
   * Finds a room by its name.
   *
   * @param name - The name of the room to find.
   * @returns {Promise<IRoom | null>} A promise resolving to the room object if found, otherwise null.
   */
  findRoomByName(name: string): Promise<IRoom | null>;

  /**
   * Creates a new room.
   *
   * @param dto - A DTO containing room creation information (name, owner ID, privacy settings).
   * @returns {Promise<IRoom>} A promise resolving to the newly created room object.
   */
  createRoom(dto: RoomCreateDto): Promise<IRoom>;

  /**
   * Finds a room by its ID.
   *
   * @param id - The ID of the room to find.
   * @returns {Promise<IRoom | null>} A promise resolving to the room object with users and messages included, or null if not found.
   */
  findRoomById(id: string): Promise<IRoom | null>;

  /**
   * Deletes a room by its ID.
   *
   * @param id - The ID of the room to delete.
   * @returns {Promise<IRoom>} A promise resolving to the deleted room object.
   */
  deleteRoom(id: string): Promise<IRoom>;

  /**
   * Retrieves all rooms from the system, including users and messages (with ascending order by creation time).
   *
   * @returns {Promise<IAllRooms[] | []>} A promise resolving to an array of room objects with users and messages.
   */
  getAllRooms(): Promise<IAllRooms[] | []>;

  /**
   * Adds a user to a room.
   *
   * @param roomId - The ID of the room.
   * @param userId - The ID of the user to add.
   * @returns {Promise<IRoom>} A promise resolving to the updated room object.
   */
  addUserToRoom(roomId: string, userId: string): Promise<IRoom>;

  /**
   * Adds an invitation link to a room.
   *
   * @param inviteLink - The invite link to be added to the room.
   * @param roomId - The ID of the room.
   * @returns {Promise<IRoom>} A promise resolving to the updated room object.
   */
  addInviteLink(inviteLink: string, roomId: string): Promise<IRoom>;

  /**
   * Allows a user to leave a room.
   *
   * @param roomId - The ID of the room to leave.
   * @param userId - The ID of the user leaving.
   * @returns {Promise<IRoom>} A promise resolving to the updated room object.
   */
  leaveRoom(roomId: string, userId: string): Promise<IRoom>;

  /**
   * Creates a personal room for two users.
   *
   * @param dto - A DTO containing room creation information and user IDs.
   * @returns {Promise<IRoom>} A promise resolving to the newly created personal room object.
   */
  createPersonal(dto: RoomCreateDto): Promise<IRoom>;
}
