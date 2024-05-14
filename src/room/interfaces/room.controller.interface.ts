import { RoomCreateDto } from '../dto/room-create.dto';
import { IRoom } from './IRoom';
import { IAllRooms } from './IAllRooms';

export interface IRoomController {
  /**
   * Creates a new room.
   *
   * @param dto - A DTO containing room creation information (name, owner ID, privacy settings).
   * @throws {BadRequestException} - Thrown by the underlying service if a room with the same name already exists.
   * @returns {Promise<IRoom>} A promise resolving to the newly created room object.
   */
  createRoom(dto: RoomCreateDto): Promise<IRoom>;

  /**
   * Deletes a room by its ID.
   *
   * @param id - The ID of the room to delete.
   * @throws {BadRequestException} - Thrown by the underlying service if the room is not found.
   * @returns {Promise<IRoom>} A promise resolving to the deleted room object.
   */
  deleteRoom(id: string): Promise<IRoom>;

  /**
   * Retrieves all rooms from the system.
   *
   * @throws {BadRequestException} - Thrown by the underlying service if no rooms are found.
   * @returns {Promise<IAllRooms[]>} A promise resolving to an array of room objects with users and messages.
   */
  getAllRooms(): Promise<IAllRooms[]>;

  /**
   * Finds a room by its ID.
   *
   * @param id - The ID of the room to find.
   * @throws {BadRequestException} - Thrown by the underlying service if the room is not found.
   * @returns {Promise<IRoom>} A promise resolving to the room object with users and messages included.
   */
  getRoomById(id: string): Promise<IRoom>;

  /**
   * Allows a user to leave a room.
   *
   * @param roomId - The ID of the room to leave.
   * @param userId - The ID of the user leaving (provided in the request body).
   * @throws {BadRequestException} - Thrown by the underlying service if the room is not found.
   * @returns {Promise<IRoom>} A promise resolving to the updated room object.
   */
  leaveRoom(roomId: string, userId: { userId: string }): Promise<IRoom>;

  /**
   * Creates a personal room for two users.
   *
   * @param dto - A DTO containing room creation information and user IDs.
   * @returns {Promise<IRoom>} A promise resolving to the newly created personal room object.
   */
  createPersonal(dto: RoomCreateDto): Promise<IRoom>;
}
