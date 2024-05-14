import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { LoginDto, RegisterDto } from './dto';
import { Request, Response } from 'express';
import { IUser } from './interfaces/IUser';
import { ConfirmCodeDto } from './dto/confirm-code.dto';
import { ITokens } from './interfaces';
import { Cookie } from './decorators';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, Observable } from 'rxjs';
const REFRESH_TOKEN = 'refreshtoken111';
@Controller('auth')
export class AuthController {
  private readonly auth_client: ClientProxy;

  constructor(private readonly configService: ConfigService) {
    this.auth_client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 5002,
      },
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<Observable<IUser>> {
    return this.auth_client.send('post.register', dto);
  }

  @Post('send-email')
  async sendCodeToEmail(@Body() emailDto: { email: string }) {
    return this.auth_client.send('post.send-email', emailDto);
  }

  @Post('confirm-code')
  async confirmCode(@Body() dto: ConfirmCodeDto) {
    return this.auth_client.send('post.confirm-code', dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    const userAgent = req.headers['user-agent'];

    const token: Observable<ITokens> = this.auth_client.send('post.login', {
      dto,
      userAgent,
    });

    const currentToken = await firstValueFrom(token);

    res.cookie(
      this.configService.get('REFRESH_TOKEN'),
      currentToken.refreshToken.token,
      {
        httpOnly: true,
        expires: new Date(currentToken.refreshToken.exp),
        secure:
          this.configService.get('NODE_ENV', 'development') === 'production',
        path: '/',
      },
    );
    res
      .status(HttpStatus.CREATED)
      .json({ accessToken: currentToken.accessToken });
  }

  @Get('logout')
  async logout(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!refreshToken) {
      res.sendStatus(HttpStatus.OK);
      return;
    }
    res.cookie(this.configService.get('REFRESH_TOKEN'), '', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
    });
    res.sendStatus(HttpStatus.OK);
  }

  @Get('refresh-tokens')
  async refreshToken(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ): Promise<void> {
    const token: Observable<ITokens> = this.auth_client.send(
      'get.refresh-tokens',
      { refreshToken },
    );
    const currentToken = await firstValueFrom(token);
    if (!currentToken) {
      throw new UnauthorizedException();
    }
    res.cookie(
      this.configService.get('REFRESH_TOKEN'),
      currentToken.refreshToken.token,
      {
        httpOnly: true,
        sameSite: 'lax',
        expires: new Date(currentToken.refreshToken.exp),
        secure:
          this.configService.get('NODE_ENV', 'development') === 'production',
        path: '/',
      },
    );
    res
      .status(HttpStatus.CREATED)
      .json({ accessToken: currentToken.accessToken });
  }

  @Get('all-account')
  async getAllAccountByAgent(@Req() req: Request) {
    const userAgent = req.headers['user-agent'];

    return this.auth_client.send('get.all-account', userAgent);
  }

  @Post('login-userAgent/:Id')
  async loginUserAgent(
    @Res() res: Response,
    @Req() req: Request,
    @Param('Id') userId: string,
  ) {
    const userAgent = req.headers['user-agent'];

    const token: Observable<ITokens> = this.auth_client.send(
      'post.login-userAgent',
      { userAgent, userId },
    );

    const currentToken = await firstValueFrom(token);

    if (!currentToken) {
      throw new UnauthorizedException();
    }
    res.cookie(
      this.configService.get('REFRESH_TOKEN'),
      currentToken.refreshToken.token,
      {
        httpOnly: true,
        sameSite: 'lax',
        expires: new Date(currentToken.refreshToken.exp),
        secure:
          this.configService.get('NODE_ENV', 'development') === 'production',
        path: '/',
      },
    );
    res
      .status(HttpStatus.CREATED)
      .json({ accessToken: currentToken.accessToken });
  }

  @Post('delete-saved-account/:Id')
  async deleteSavedAccount(@Req() req: Request, @Param('Id') userId: string) {
    const userAgent = req.headers['user-agent'];

    return this.auth_client.send('post.delete-saved-account', {
      userAgent,
      userId,
    });
  }
}
