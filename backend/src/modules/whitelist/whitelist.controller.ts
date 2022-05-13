import { Body, Controller, Post, Res, Req } from '@nestjs/common';
import { Whitelist } from 'src/models/WhiteList';
import { WhitelistService } from './whitelist.service';

@Controller('whitelist')
export class WhitelistController {
  constructor(private readonly whiteListsService: WhitelistService) {}

  @Post('/joinWhitelist')
  async joinWhitlist(@Req() req, @Body() whitelist: Whitelist): Promise<any> {
    return this.whiteListsService.joinWhitelist(whitelist);
  }
}
