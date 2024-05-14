import { IToken } from './IToken';

export interface IAuthRepository {
  /**
   * Logs out a user by deleting the provided refresh token.
   *
   * @param refreshToken - The refresh token to be deleted.
   * @returns {Promise<IToken>} A promise resolving to the deleted token object (likely empty).
   */
  logout(refreshToken: string): Promise<IToken>;

  /**
   * Finds a token record associated with the provided refresh token.
   *
   * @param refreshToken - The refresh token to search for.
   * @returns {Promise<IToken | null>} A promise resolving to the token object if found, otherwise null.
   */
  findToken(refreshToken: string): Promise<IToken | null>;

  /**
   * Deletes a token record associated with the provided refresh token (may be redundant with `logout`).
   *
   * @param refreshToken - The refresh token to be deleted.
   * @returns {Promise<IToken>} A promise resolving to the deleted token object (likely empty).
   */
  deleteToken(refreshToken: string): Promise<IToken>;

  /**
   * Retrieves or creates a refresh token for a user.
   *
   * @param userId - The ID of the user for whom the refresh token is needed.
   * @returns {Promise<IToken>} A promise resolving to the updated or newly created token object.
   */
  getRefreshToken(userId: string, userAgent: string): Promise<IToken>;
}
