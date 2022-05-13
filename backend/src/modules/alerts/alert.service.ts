import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const axios = require('axios');
var Twit = require('twit');

import { GenericResponse } from '../../models/generic-response';
import { Alert } from './../../models/alert';
import { Transaction } from './../../models/transaction';
import { Notification } from './../../models/notification';
import { Token } from './../../models/token';
import { TokenService } from '../token/token.service';
import { CreateAlertDto } from './dto/alert.dto';
import { TradingBotEvent } from './../../models/trading-bot-event';
const logger = require('../../logger');

@Injectable()
export class AlertService {
  NOTIFICATION_TYPE = { DISCORD: 'discord', SMS: 'sms', WHATSAPP: 'whatsApp' };
  tweetClient = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });
  smsClient: any;
  whatsAppClient: any;
  zionKey: { NAME: 'ZK'; EVENT_TYPE: 'LIST' };

  constructor(
    @InjectModel('Alert') private readonly alertModel: Model<Alert>,
    @InjectModel('bot_events')
    private readonly botModel: Model<TradingBotEvent>,
    @InjectModel('tokens') private readonly tokenModel: Model<Token>,
    @InjectModel('transactions_mev2')
    private readonly transactionModel: Model<Transaction>,
    private tokenService: TokenService,
  ) {
    // NOTE: to start the bot to listen changes on collections
    // db must be running in replica mode.. follow the link for info
    // https://stackoverflow.com/questions/70132872/mongodb-listen-changes-on-collection-change-nodejs
    // this.startAlertBot();
  }

  addAlert(createAlertDto: CreateAlertDto): Promise<Alert> {
    const alertInfo = new this.alertModel(createAlertDto);
    return alertInfo.save();
  }

  getAlerts(userId?: string, isDisabled?: boolean): Promise<Alert[]> {
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }

    if (isDisabled != undefined && isDisabled != null) {
      query.isDisabled = isDisabled;
    }

    return this.alertModel
      .find(query)
      .sort({ _id: 1 })
      .select({ status: 1, name: 1, collection_name: 1, alertType: 1 })
      .exec();
  }

  updateAlert(alert: Alert): Promise<GenericResponse> {
    const query = { _id: alert._id };
    return this.alertModel
      .updateOne(query, alert)
      .exec()
      .then(() => new GenericResponse({ message: 'Updated successfully.' }));
  }

  deleteAlert(id: string): Promise<GenericResponse> {
    const query = { _id: id };
    return this.alertModel
      .deleteOne(query)
      .exec()
      .then(() => new GenericResponse({ message: 'Deleted successfully.' }));
  }

  startAlertBot(): void {
    console.log('Starting Bot...');

    // configure sms and WhatsApp client
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.smsClient = require('twilio')(accountSid, authToken);
    this.whatsAppClient = require('twilio')(accountSid, authToken);

    const pipeline_filter = [
      {
        $match: {
          $and: [
            { 'fullDocument.parsed.collection_id': { $exists: true } },
            { operationType: 'insert' },
          ],
        },
      },
    ];

    // listen transaction changes
    // const transactionChangeStream =
    //   this.transactionModel.watch(pipeline_filter);
    // transactionChangeStream.on('change', async (transactionInfoEvent) => {
    //   const transaction = transactionInfoEvent.fullDocument;
    //   // if (!transaction.parsed?.mint) return;
    //   // if (!transaction.parsed?.collection_id) return;
    //   console.log('transaction info: ', transaction);
    //   // TODO: check that transaction blockTime is
    //   // within recent datetime, ~past 1hr

    //   if (
    //     transaction.parsed?.collection_name === 'ZK' &&
    //     transaction.parsed?.event_type === 'LIST'
    //   ) {
    //     const specialNotification: Notification = {
    //       token_mint_address: transaction.parsed?.mint,
    //       marketPlace: transaction.parsed?.marketplace,
    //       collectionName: transaction.parsed?.collection_name,
    //       eventType: transaction.parsed?.event_type,
    //       amount: transaction.parsed?.amount,
    //     };
    //     this._sendDiscordNotification(
    //       process.env.DISCORD_WEBHOOK_URL,
    //       specialNotification,
    //     );
    //   }

    //   logger.log(
    //     'debug',
    //     `transaction for mint:`,
    //     transaction.parsed?.mint,
    //     `collection:`,
    //     transaction.parsed?.collection_id,
    //   );

    //   // get the active alerts
    //   const alerts = await this.getAlerts(null, false);
    //   const alertsResponse = alerts.map(async (alert: Alert): Promise<any> => {
    //     // check the alert if match with the info
    //     if (
    //       (alert.alertType || '').toLowerCase() ===
    //         (transaction.parsed?.event_type || '').toLowerCase() &&
    //       (alert.collectionName || '').toLowerCase() ===
    //         (transaction.parsed?.collection_name || '').toLowerCase()
    //     ) {
    //       const notification: Notification = {
    //         token_mint_address: transaction.parsed?.mint,
    //         marketPlace: transaction.parsed?.marketplace,
    //         collectionName: transaction.parsed?.collection_name,
    //         eventType: transaction.parsed?.event_type,
    //         amount: transaction.parsed?.amount,
    //       };
    //       logger.log(
    //         'info',
    //         `alert notifications for transaction_mev2 with token_name and mint address: ${
    //           (notification.tokenName, ', ', notification.token_mint_address)
    //         }`,
    //       );

    //       // To get the image URL, use token mint address as token mint Id
    //       const tokenId = transaction.parsed?.mint;
    //       logger.log(
    //         'info',
    //         `mint address to get the image token_id: ${tokenId}`,
    //       );

    //       const token = await this.tokenModel
    //         .findById(transaction.parsed?.mint)
    //         .select({ image: 1 })
    //         .lean()
    //         .exec();

    //       if (token?.image?.length) {
    //         notification.imageUrl = token.image;
    //       }

    //       if (alert.notificationInfo.via === this.NOTIFICATION_TYPE.DISCORD) {
    //         // send notifiation to discord url
    //         return this._sendDiscordNotification(
    //           alert.notificationInfo.url,
    //           notification,
    //         );
    //       } else if (
    //         alert.notificationInfo.via === this.NOTIFICATION_TYPE.SMS
    //       ) {
    //         // send notifiation to sms
    //         return this._sendSmsNotification(
    //           alert.notificationInfo.phone,
    //           notification,
    //         );
    //       } else if (
    //         // send notifiation to whatsapp
    //         alert.notificationInfo.via === this.NOTIFICATION_TYPE.WHATSAPP
    //       ) {
    //         return this._sendWhatsAppNotification(
    //           alert.notificationInfo.whatsapp,
    //           notification,
    //         );
    //       }
    //     }
    //     //  else {
    //     //   return Promise.reject(`alert has unknown send via`);
    //     // }
    //   });

    //   await Promise.allSettled(alertsResponse)
    //     .then((results) => {
    //       console.log('Alerts executed', results);
    //     })
    //     .catch((err) => {
    //       console.log('error sending alerts', err);
    //     });
    // });

    // // listen bot transaction changes
    // this.botModel.watch().on('change', async (botTransactionInfoEvent) => {
    //   const botTransaction: TradingBotEvent =
    //     botTransactionInfoEvent.fullDocument;
    //   const notification: Notification = {
    //     marketPlace: botTransaction.marketplace,
    //     tokenName: botTransaction.token_name,
    //     collectionName: botTransaction.collection_name,
    //     eventType: botTransaction.event_type,
    //     amount: botTransaction.amount == null ? null : botTransaction.amount,
    //   };

    //   console.log('bot transaction info: ', notification);

    //   // To get the image URL, use token mint address as token mint Id
    //   const tokenId = botTransaction.mint;
    //   const tokenInfoList = await this.tokenService.getTokens({
    //     _ids: [tokenId],
    //   });
    //   if (tokenInfoList.length) {
    //     notification.imageUrl = tokenInfoList[0].image;
    //   }

    //   if (botTransaction.result.status === 'SUCCESS') {
    //     this._autoTweet(notification);
    //   }
    // });
  }

  private async _sendDiscordNotification(
    url: string,
    notification: Notification,
  ): Promise<void> {
    let discordMessage;
    // add the info in fields to send more info
    if (notification.eventType === 'DELIST' || notification.amount == null) {
      discordMessage = {
        embeds: [
          {
            fields: [
              {
                name: 'Alerts by Zion Labs\n\nNFT',
                value: `https://zionlabs.xyz/token/${notification.token_mint_address}`,
              },
              {
                name: 'Collection Name',
                value: notification.collectionName,
              },
              {
                name: 'Market',
                value: notification.marketPlace,
              },
              {
                name: 'Event Type',
                value: notification.eventType,
              },
              {
                name: 'Collection Name',
                value: notification.collectionName,
              },
            ],
            image: { url: notification.imageUrl },
          },
        ],
      };
    } else {
      discordMessage = {
        embeds: [
          {
            fields: [
              {
                name: 'Alerts by Zion Labs\n\nNFT',
                value: `https://zionlabs.xyz/token/${notification.token_mint_address}`,
              },
              {
                name: 'Collection Name',
                value: notification.collectionName,
              },
              {
                name: 'Market',
                value: notification.marketPlace,
              },
              {
                name: 'Event Type',
                value: notification.eventType,
              },
              {
                name: 'Collection Name',
                value: notification.collectionName,
              },
              { name: 'Price', value: notification.amount + ' SOL' },
            ],
            image: { url: notification.imageUrl },
          },
        ],
      };
    }
    try {
      return await axios.post(url, discordMessage);
    } catch (err) {
      console.error('Error while sending notification to discord', err);
      return Promise.reject(err);
    }
  }

  private async _sendSmsNotification(
    phone: string,
    notification: Notification,
  ): Promise<any> {
    const smsBody = `Alerts by Zion Labs\nNFT = ${`https://zionlabs.xyz/token/${notification.token_mint_address}`}\nMarket = ${
      notification.marketPlace
    }\nEvent Type = ${notification.eventType}\nCollection Name = ${
      notification.collectionName
    }\n${
      notification.eventType === 'DELIST' || notification.amount == null
        ? ''
        : `Price = ${notification.amount} SOL`
    }`;
    return await this.smsClient.messages
      .create({
        body: smsBody,
        messagingServiceSid: process.env.MESSAGING_SID,
        from: process.env.TWILIO_SMS_FROM,
        to: phone,
      })
      .then((message) => {
        console.log('twillio sms response', message.sid);
        return Promise.resolve(message);
      })
      .catch((err) => {
        console.log('Unable to send message to: ', phone, err);
        return Promise.resolve(err);
      });
  }

  private async _sendWhatsAppNotification(
    phone: string,
    notification: Notification,
  ): Promise<void> {
    const whatsappBody = `Alerts by Zion Labs\nNFT =${`https://zionlabs.xyz/token/${notification.token_mint_address}`}\nMarket = ${
      notification.marketPlace
    }\nEvent Type = ${notification.eventType}\nCollection Name = ${
      notification.collectionName
    }\n${
      notification.eventType === 'DELIST' || notification.amount == null
        ? ''
        : `Price = ${notification.amount} SOL`
    }\n`;
    return await this.whatsAppClient.messages
      .create({
        body: whatsappBody,
        mediaUrl: notification.imageUrl,
        messagingServiceSid: process.env.MESSAGING_SID,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
        to: `whatsapp:${phone}`,
      })
      .then((message) => {
        console.log('twillio whatsapp response', message.sid);
        return Promise.resolve(message);
      })
      .catch((err) => {
        console.log('Unable to send WhatsApp message to: ', phone, err);
        return Promise.reject(err);
      });
  }

  private async _autoTweet(notification: Notification): Promise<void> {
    const tweetBody = `Market = ${notification.marketPlace}\nToken Name = ${
      notification.tokenName
    }\nEvent Type = ${notification.eventType}\nCollection Name = ${
      notification.collectionName
    }\n${
      notification.eventType === 'DELIST' || notification.amount == null
        ? ''
        : `Price = ${notification.amount} SOL`
    }`;
    try {
      var encoded = await this.getBase64FromImgUrl(notification.imageUrl);
      await this.tweetClient.post(
        'media/upload',
        { media_data: encoded },
        async (err, data, response) => {
          // now we can assign alt text to the media, for use by screen readers and
          // other text-based presentations and interpreters
          var mediaIdStr = data.media_id_string;
          var meta_params = {
            media_id: mediaIdStr,
            alt_text: { text: tweetBody },
          };
          console.log('twitter auto tweet bot info: ', data);
          console.log('twitter auto tweet bot error info: ', err);
          await this.tweetClient.post(
            'media/metadata/create',
            meta_params,
            async (err, data, response) => {
              if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)
                var params = {
                  status: tweetBody,
                  media_ids: [mediaIdStr],
                };

                await this.tweetClient.post(
                  'statuses/update',
                  params,
                  (err, data, response) => {
                    // console.log(data);
                  },
                );
              }
            },
          );
        },
      );
    } catch (error) {
      console.error('Twitter triying to reconnect...');
    }
  }

  async getBase64FromImgUrl(url: any): Promise<any> {
    try {
      if (url.includes('https')) {
        let image = await axios.get(url, {
          responseType: 'arraybuffer',
        });
        let returnedB64 = Buffer.from(image.data).toString('base64');
        return returnedB64;
      } else {
        let image = await axios.get(
          'https://firstlease.in/storage/media/no-image-available.png',
          {
            responseType: 'arraybuffer',
          },
        );
        let returnedB64 = Buffer.from(image.data).toString('base64');
        return returnedB64;
      }
    } catch (error) {
      console.log('failed to encode required image');
    }
  }
}