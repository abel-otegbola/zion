import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './../../models/user';
import { UserService } from './../users/user.service';
import { ApiTags } from '@nestjs/swagger';
import { VerifyDTO, VerifyResponse } from './dto/verify.dto';
import { NonceDTO, Nonce } from './dto/nonce.dto';
import { JWT_COOKIE_ID, NONCE_COOKIE_ID, JWT } from './jwt';
import * as crypto from 'crypto';
import { serialize } from 'cookie';
const nacl = require('tweetnacl');
const bs58 = require('bs58');

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // COOKIE_NAME = 'c278be86e1af'
  // tokens = {}

  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('verify')
  async verify(@Req() req, @Res() res, @Body() payload: VerifyDTO): Promise<VerifyResponse> {
    // console.debug(`verify message signature`, payload)

    const nonce = req.cookies[NONCE_COOKIE_ID] || req.headers.nonce
    if (!nonce || !nonce.length) return res.status(403)
    if (!payload.pubkey || !payload.pubkey.length) return res.status(403)
    if (!payload.signature || !payload.signature.length) return res.status(403)

    const message = `Sign this message for authenticating with your wallet. Nonce: ${nonce}`
    const messageBytes = new TextEncoder().encode(message)
    const publicKeyBytes = bs58.decode(payload.pubkey)
    const signatureBytes = bs58.decode(payload.signature)

    const result = nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      publicKeyBytes,
    )

    if (!result) {
      console.error(`wallet message-signature verification failed`, payload)
      throw new Error('verify error')
    }

    // initialize the user login session, and create the JWT token
    // check if user already exists,
    // if not, we will need to create the user
    // - check wallet pubkey holds a trusted-nft in a token-account
    // - TODO: if token-accounts is large number, eg. > 1000 ?
    // - if not trusted-nft holder, then do not set JWT token cookie
    let trusted_nft_owner = false
    const user = await this.userService.getUserByWalletId(payload.pubkey)
    // const token_accounts = await this.authService.fetchTokenAccounts(payload.pubkey)
    
    // check trusted_nft owner..

    /** Signup, create user account.. */
    if (!user) {
      // TODO
      // userInfo = await this.authService.signup(user);
      res.status(403).json({ success: false })
    }
    /** Login, existing user account.. */
    else {
      // TODO
    }
    
    // if (!trusted_nft_owner) throw new Error();

    // send the JWT back to the client via cookie
    const jwt: JWT = {
      pubkey: payload.pubkey,
      nonce: nonce,
      signature: payload.signature,
    }
    const token = this.authService.signToken(jwt)

    res.setHeader(
      'Set-Cookie',
      serialize(JWT_COOKIE_ID, token, {
        sameSite: 'strict',
        secure: true,
      }),
    )

    return res.status(200).json({ success: true, token })
  }

  @Get('getNonce')
  async getNonce(@Res() res): Promise<any> {
    const nonce = crypto.randomBytes(32).toString('base64')

    res.setHeader(
      'Set-Cookie',
      serialize(NONCE_COOKIE_ID, nonce, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      }),
    )

    return res.status(200).json({ nonce })
  }
}