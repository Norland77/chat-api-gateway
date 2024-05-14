import { IToken } from './IToken';
import { ITokens } from './ITokens';
import { IUser } from './IUser';
import { Response } from 'express';
export interface IAuthService {
  /**
   * Validates and renews an access token using a refresh token.
   *
   * @param refreshToken - The refresh token to validate and use for renewal.
   * @throws {UnauthorizedException} - Thrown if the refresh token is invalid, expired, or not found.
   * @returns {Promise<IToken>} A promise resolving to the renewed token object (likely the refresh token itself).
   */
  refreshToken(refreshToken: string): Promise<IToken>;

  /**
   * Logs out a user by deleting the provided refresh token.
   *
   * @param refreshToken - The refresh token to be deleted.
   * @returns {Promise<IToken>} A promise resolving to the deleted token object (likely empty).
   */
  logout(refreshToken: string): Promise<IToken>;

  /**
   * Sets the refresh token as a cookie in the response object.
   *
   * @param tokens - An object containing the access token and refresh token.
   * @param res - The Express response object used for setting cookies.
   * @throws {UnauthorizedException} - Thrown if the tokens object is not provided.
   */
  setRefreshTokenToCookies(tokens: ITokens, res: Response): Promise<void>;

  /**
   * Logs in a user and generates access and refresh tokens.
   *
   * @param user - The user object representing the user to be logged in.
   * @throws {BadRequestException} - Thrown if token generation fails.
   * @returns {Promise<ITokens>} A promise resolving to an object containing both access and refresh tokens.
   */
  login(user: IUser, userAgent: string): Promise<ITokens>;

  /**
   * Refreshes an access token using a refresh token (potentially for a specific user, implementation detail).
   *
   * @param user - The user object (might be used for validation or other purposes).
   * @param refreshToken - The refresh token to use for refreshing the access token.
   * @throws {UnauthorizedException} - Potential exception for invalid or expired refresh tokens (implementation detail).
   * @returns {Promise<ITokens>} A promise resolving to an object containing both the renewed access token and the refresh token.
   */
  refresh(user: IUser, refreshToken: IToken): Promise<ITokens>;
}
