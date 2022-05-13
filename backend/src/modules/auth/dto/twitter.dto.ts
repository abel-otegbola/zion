import { IsNotEmpty, IsString } from 'class-validator';

export class TwitterAccessTokenDto {
  @IsString()
  @IsNotEmpty()
  oauth_token: string
  @IsString()
  @IsNotEmpty()
  oauth_verifier: string
}
