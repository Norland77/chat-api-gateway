import { LoginDto, RegisterDto } from '../dto';
import { Request, Response } from 'express';
import { IUser } from './IUser';
import { ITokens } from './ITokens';
import { IToken } from './IToken';

export interface IAuthController {
  /**
   * Registers a new user.
   *
   * @param dto - A DTO containing user registration information (username, password, etc.).
   * @throws {BadRequestException} - Thrown if the username or email is already in use.
   * @returns {Promise<IUser>} A promise resolving to the newly created user object.
   */
  register(dto: RegisterDto): Promise<IUser>;

  /**
   * Logs in a user and generates access and refresh tokens.
   *
   * @param dto - A DTO containing login credentials (username, password).
   * @param res - The Express response object used for setting cookies.
   * @param req
   * @throws {UnauthorizedException} - Thrown if the username or password is incorrect.
   * @returns {Promise<ITokens>} A promise resolving to an object containing both access and refresh tokens.
   */
  login(dto: LoginDto, res: Response, req: Request): Promise<ITokens>;

  /**
   * Logs out a user by deleting the refresh token stored in a cookie.
   *
   * @param refreshToken - The refresh token retrieved from the cookie (optional).
   * @param res - The Express response object used for clearing the cookie.
   * @returns {Promise<void>} A promise that resolves after handling logout logic.
   */
  logout(refreshToken: string, res: Response): Promise<void>;

  /**
   * Refreshes an access token using a refresh token stored in a cookie.
   *
   * @param refreshToken - The refresh token retrieved from the cookie (optional).
   * @param res - The Express response object potentially used for setting new cookies.
   * @throws {UnauthorizedException} - Potential exception for invalid or expired refresh tokens (implementation detail).
   * @returns {Promise<IToken>} A promise resolving to the renewed token object (likely the refresh token itself).
   */
  refreshToken(refreshToken: string, res: Response): Promise<IToken>;
}
