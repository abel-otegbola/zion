import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BotCollection } from 'src/models/collection';
import { GenericResponse } from 'src/models/generic-response';
import { TradingBot } from 'src/models/trading-bot';
import { TradingBotArchive } from 'src/models/trading-bot-archive';
import { TradingBotEvent } from 'src/models/trading-bot-event';
import { WithdrawRequest } from 'src/models/withdraw-request';
import { User } from 'src/models/user';
const { uniqueNamesGenerator, names } = require('unique-names-generator');

@Injectable()
export class BotsService {
  constructor(
    @InjectModel('trading_bots')
    private readonly tradingBotModel: Model<TradingBot>,
    @InjectModel('trading_bots_archive')
    private readonly tradingBotArchiveModel: Model<TradingBot>,
    @InjectModel('bot_withdraw_requests')
    private readonly withdrawRequestModel: Model<WithdrawRequest>,
    @InjectModel('users') private readonly userModel: Model<User>,
    @InjectModel('bot_events')
    private readonly tradingBotEventModel: Model<TradingBotEvent>,
    @InjectModel('nft_collections')
    private collectionModel: Model<BotCollection>,
  ) {}

  async sameNameBots(name: string): Promise<any> {
    // sanitize user input from injection attacks..
    // see https://owasp.org/www-pdf-archive/GOD16-NOSQL.pdf
    name = name.replace(/[$\[\]\{\}]/gi, '');

    const query = { name: name };
    const count = await this.tradingBotModel.countDocuments(query).exec();

    if (count > 0) {
      throw new ConflictException('Sorry, a bot with same name already exists');
    } else {
      return 'success';
    }
  }

  /**
   * fetch trading-bots for the current user.
   */
  getBotsByUserWallet(
    pubkey: string,
    projection?,
    options?,
  ): Promise<TradingBot[]> {
    const filter = {
      'user_wallet.pubkey': pubkey,
      isDeleted: { $exists: 0 },
    }

    const query = this.tradingBotModel
    .find(filter)
    .lean()

    if (options) query.setOptions(options)
    if (projection) query.select(projection)

    return query.exec()
  }
  
  async deleteBot(user_pubkey: string, id: string): Promise<GenericResponse> {
    const bot = await this.tradingBotModel
    .findOne({ _id: id, 'user_wallet.pubkey': user_pubkey })
    .lean()
    .exec()
    if (!bot) throw new Error()
    console.debug(`archiving trading-bot`, user_pubkey, { bot })
    
    await this.tradingBotModel.updateOne(
      { _id: id, 'user_wallet.pubkey': user_pubkey },
      { $set: { isDeleted: true } },
    )
    await this.tradingBotArchiveModel.create(
      bot
    )

    return new GenericResponse({ message: 'success' })
  }

  getBotCollections(
    user_wallet_pubkey: string,
    searchText: string,
    pageNo: number,
    count: number,
  ): Promise<any> {
    pageNo = pageNo - 1;

    // disallow large page sizes
    if (count > 20) count = 20;

    const query: any = { itemsTracked: true };
    query.attributes_indexed = true;

    if (searchText) {
      query.name = { $regex: new RegExp(searchText.toLowerCase(), 'i') };
    }
    query.available_traits = { $gt: [] };

    return (
      this.collectionModel
        .find(query)
        .limit(count * 1)
        // TODO: since we are sorting by _id, we should take a last_id
        // and add {_id:{$gt:last_id}} to the query filter, which would
        // allow us to remove this skip (which is really slow)
        .skip(pageNo * count)
        .sort({ _id: 1 })
        .exec()
    )
  }

  async updateBot(
    user_wallet_pubkey: string,
    bot: TradingBot,
  ): Promise<GenericResponse> {
    // TODO: add validations-
    // current user_id matches the bot's user_id
    // update does not contain the bot_wallet or user_wallet fields,
    const filter = { 'user_wallet.pubkey': user_wallet_pubkey, _id: bot._id };
    const $set: any = {};

    if (bot.config) $set.config = bot.config;
    // if (bot.config.price_range)
    //   $set.config.price_range = bot.config.price_range;

    await this.tradingBotModel.updateOne(filter, $set)
    .exec()

    return new GenericResponse({ message: 'success' })
  }

  async toggleBot(
    user_wallet_pubkey: string,
    botId: string,
  ): Promise<GenericResponse> {
    // TODO: add validations-
    // current user_id matches the bot's user_id
    // update does not contain the bot_wallet or user_wallet fields,
    const filter = { 'user_wallet.pubkey': user_wallet_pubkey, _id: new Types.ObjectId(botId) };
    const bot = await this.tradingBotModel
    .findOne(filter)
    .select({active:1})
    .lean()
    .exec()
    if (!bot) throw new Error()

    const $set: any = { active: !bot.active }
    await this.tradingBotModel.updateOne(filter, $set)
    .exec()

    return new GenericResponse({ message: 'success' })
  }

  async createBot(
    user_wallet_pubkey: string,
    create_dto: TradingBot,
  ): Promise<GenericResponse> {
    const user = await this.userModel
    .findOne({ walletId: user_wallet_pubkey })
    .select({ bot_wallet: 1 })
    .lean()
    .exec()
    if (!user) throw new Error()
    if (!user.bot_wallet || !user.bot_wallet.length) throw new Error()

    const doc: TradingBot = {
      user_id: user._id,
      user_wallet: { pubkey: user_wallet_pubkey },
      bot_wallet: { pubkey: user.bot_wallet },
      active: false,
      config: create_dto.config,
    }

    const callsign: string = uniqueNamesGenerator({
      dictionaries: [names],
    })
    doc.name = `${create_dto.config.collectionName} ${callsign}`
    doc.callsign = `${create_dto.config.collectionName} ${callsign}`

    const bot = new this.tradingBotModel(doc)
    console.debug(`trading-bot created`, bot)
    await bot.save()

    return new GenericResponse({ message: 'success' })
  }

  async getBotWallet(user_wallet_pubkey: string): Promise<any> {
    const filter = { walletId: user_wallet_pubkey }
    return this.userModel
    .findOne(filter)
    .select({ bot_wallet: 1 })
    .lean()
    .exec()
  }

  getBotEventsByUser(user_wallet_pubkey: string): Promise<TradingBotEvent[]> {
    const filter = {
      'user_wallet.pubkey': user_wallet_pubkey,
    }
    return this.tradingBotEventModel
    .find(filter)
    .sort({ createdAt: -1 })
    .lean()
    .exec()
  }

  getBotTransaction(user_wallet_pubkey: string, _id: string): Promise<TradingBotEvent> {
    const filter = {
      'user_wallet.pubkey': user_wallet_pubkey,
      bot_id: _id,
    }
    return this.tradingBotEventModel
    .findOne(filter)
    .select({ signature: 1, privacy: 1, token_name: 1, amount: 1 })
    .lean()
    .exec()
  }

  async createWithdrawRequest(
    user_wallet_pubkey: string,
    withdraw_request: WithdrawRequest,
  ): Promise<GenericResponse> {
    console.debug(`bots.service.createWithdrawRequest() user_wallet_pubkey`, user_wallet_pubkey)
    
    const user = await this.userModel
    .findOne({walletId: user_wallet_pubkey})
    .lean()
    .select({ _id:1, walletId:1, bot_wallet:1 })
    .exec()
    if (!user) throw new Error()
    console.debug(`bots.service.createWithdrawRequest() user`, user)

    if (user.walletId !== user_wallet_pubkey) {
      throw new Error(``)
    }

    const doc = new this.withdrawRequestModel({
      user_id: user._id,
      user_wallet: { pubkey: user.walletId },
      bot_wallet: { pubkey: user.bot_wallet },
      withdraw_amount: withdraw_request.withdraw_amount,
    })
    await doc.save()
    console.debug(`bots.service.createWithdrawRequest() doc`, doc)

    return new GenericResponse({ message: 'success' })
  }
}