// see https://docs.nestjs.com/techniques/cookies#creating-a-custom-decorator-cross-platform
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

export const NONCE_COOKIE_ID = 'auth-nonce'
export const JWT_COOKIE_ID = 'auth-jwt'
export const JWT_KEY = process.env.JWT_KEY || '0e85cbcd-a609-4517-8592-fa5f82cfb90a'

export class JWT {
  // @IsString()
  // @IsNotEmpty()
  pubkey: string
  // @IsString()
  // @IsNotEmpty()
  nonce?: string
  // @IsString()
  // @IsNotEmpty()
  signature: string
}

/**
 * eg. usage:
 *  @Get()
 *  findAll(@CookieJWT() jwt: JWT) {}
 */
export const CookieJWT = createParamDecorator(
  (ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const value = request.cookies?.[`${JWT_COOKIE_ID}`];
    return JSON.parse(value);
  },
);
