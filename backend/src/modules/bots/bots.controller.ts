import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { GenericResponse } from 'src/models/generic-response';
import {
  TradingBot,
} from 'src/models/trading-bot';
import {
  TradingBotArchive,
} from 'src/models/trading-bot-archive';
import {
  TradingBotEvent,
} from 'src/models/trading-bot-event';
import {
  WithdrawRequest,
} from 'src/models/withdraw-request';
import { BotsService } from './bots.service';

@Controller('bots')
export class BotsController {
  constructor(
    private readonly botsService: BotsService
  ) {}

  @Get('getBotWallet')
  getBotWallet(
    @Req() req
  ): Promise<any> {
    return this.botsService.getBotWallet(req.jwt.pubkey)
  }

  @Get('getBots')
  /**
   * get tradingbots for the current user
   */
  getBots(
    @Req() req
  ): Promise<TradingBot[]> {
    return this.botsService.getBotsByUserWallet(
      req.jwt.pubkey,
      { active:1, name:1, config:1 },
      { sort: { _id: -1 } }
    );
  }

  @Post('createBot')
  createBot(
    @Req() req,
    @Body() payload: any
  ): Promise<GenericResponse> {
    console.debug(`bots.controller.createBot`, payload)
    return this.botsService.createBot(req.jwt.pubkey, payload)
  }

  @Post('updateBot')
  updateBot(
    @Req() req,
    @Body() payload: any
  ): Promise<GenericResponse> {
    // validate payload
    return this.botsService.updateBot(req.jwt.pubkey, payload)
  }

  @Get('toggleBot')
  toggleBot(
    @Req() req,
    @Query('id') botId: string
  ): Promise<GenericResponse> {
    // validate payload
    return this.botsService.toggleBot(req.jwt.pubkey, botId)
  }

  @Get('deleteBot')
  deleteBot(
    @Req() req,
    @Query('id') botId: string
  ): Promise<GenericResponse> {
    return this.botsService.deleteBot(req.jwt.pubkey, botId);
  }

  @Post('getBotCollections')
  getBotCollections(
    @Req() req, 
    @Body('searchText') searchText: string,
    @Body('pageNo') pageNo: number,
    @Body('count') count: number,
  ): Promise<any> {
    // TODO: what dis?
    return this.botsService.getBotCollections(req.jwt.pubkey, searchText, pageNo, count)
  }

  @Post('createWithdrawRequest')
  createWithdrawRequest(
    @Req() req, 
    @Body() payload: WithdrawRequest,
  ): Promise<GenericResponse> {
    // console.debug(`createWithdrawRequest() req.jwt`, req.jwt)
    console.debug(`createWithdrawRequest() payload`, payload)
    return this.botsService.createWithdrawRequest(req.jwt.pubkey, payload);
  }

  @Get('getBotEvent')
  getBotEvents(
    @Req() req
  ): Promise<TradingBotEvent[]> {
    return this.botsService.getBotEventsByUser(req.jwt.pubkey);
  }
}
