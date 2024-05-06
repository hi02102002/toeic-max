import { catchAsync } from '@/utils/catch-async';
import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Container, Service } from 'typedi';
import { AuthService } from './auth.service';
import { RequestWithUser, TTokenData } from './auth.type';

@Service()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public login = catchAsync(async (req, res) => {
    const { accessToken, refreshToken } = await this.authService.login(req.body);

    this.setTokensCookie(res, { accessToken, refreshToken });

    res.status(StatusCodes.OK).json({
      message: 'Login account successfully.',
      data: { accessToken, refreshToken },
    });
  });

  public loginWithIdToken = catchAsync(async (req, res) => {
    const { accessToken, refreshToken } = await this.authService.loginWithIdToken(req.body);

    this.setTokensCookie(res, { accessToken, refreshToken });

    res.status(StatusCodes.OK).json({
      message: 'Login account successfully.',
      data: { accessToken, refreshToken },
    });
  });

  public loginAdmin = catchAsync(async (req, res) => {
    const data = await this.authService.loginAdmin(req.body);

    this.setTokensCookie(res, data);

    res.status(StatusCodes.OK).json({
      message: 'Login account successfully.',
      data,
    });
  });

  public register = catchAsync(async (req, res) => {
    const clientUrl = req.header('Referer');
    const data = await this.authService.register(req.body, clientUrl);

    res.status(StatusCodes.CREATED).json({
      message: 'Create an account successfully.',
      data,
    });
  });

  public forgotPassword = catchAsync(async (req, res) => {
    const clientUrl = req.header('Referer');
    await this.authService.forgotPassword(req.body, clientUrl);

    res.status(StatusCodes.OK).json({
      message: 'Send email reset password successfully. Please check your email.',
      data: null,
    });
  });

  public resetPassword = catchAsync(async (req, res) => {
    await this.authService.resetPassword(req.body);

    res.status(StatusCodes.OK).json({
      message: 'Reset password successfully.',
      data: null,
    });
  });

  public refreshToken = catchAsync(async (req, res) => {
    const data = await this.authService.refreshToken(req.cookies.refresh_token);

    this.setTokensCookie(res, data);

    res.status(StatusCodes.OK).json({
      data,
    });
  });

  public getCurrentUser = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.authService.findCurrentUser(req.user?.id as string);

    console.log('data', data);

    res.status(StatusCodes.OK).json({
      data,
    });
  });

  public logout = catchAsync(async (req: RequestWithUser, res) => {
    await this.authService.logout(req.user?.id as string);

    this.clearTokensCookie(res);

    res.status(StatusCodes.OK).json({
      message: 'Logout successfully.',
      data: null,
    });
  });

  private setTokensCookie = (res: Response, tokens: TTokenData) => {
    const { accessToken, refreshToken } = tokens;
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax',
      domain: 'localhost', // TODO: THIS WILL BE CHANGED IN PRODUCTION
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: 'lax',
      domain: 'localhost', //TODO: THIS WILL BE CHANGED IN PRODUCTION
    });
  };

  private clearTokensCookie = (res: Response) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  };

  public verifyAccount = catchAsync(async (req, res) => {
    await this.authService.verifyAccount(req.body.token);

    res.status(StatusCodes.OK).json({
      message: 'Your account has been verified successfully.',
      data: null,
    });
  });

  public requestVerifyAccount = catchAsync(async (req, res) => {
    const clientUrl = req.header('Referer');
    await this.authService.requestVerifyAccount(req.body, clientUrl);

    res.status(StatusCodes.OK).json({
      message: 'Send email verify account successfully. Please check your email.',
      data: null,
    });
  });
}
