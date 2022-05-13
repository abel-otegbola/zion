import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyDTO {
  // @IsString()
  // @IsNotEmpty()
  pubkey: string;
  // @IsString()
  // @IsNotEmpty()
  signature: string;
}

export class VerifyResponse {
  success: boolean
  // @IsString()
  token?: string
}
