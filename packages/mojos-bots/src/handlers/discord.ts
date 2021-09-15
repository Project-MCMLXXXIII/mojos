import Discord from 'discord.js';
import { formatBidMessageText, getMojoPngBuffer } from '../utils';
import { Bid, IAuctionLifecycleHandler } from '../types';

export class DiscordAuctionLifecycleHandler implements IAuctionLifecycleHandler {
  constructor(public readonly discordClients: Discord.WebhookClient[]) {}

  /**
   * Send Discord message with an image of the current mojo alerting users
   * @param auctionId The current auction ID
   */
  async handleNewAuction(auctionId: number) {
    const png = await getMojoPngBuffer(auctionId.toString());
    if (png) {
      const attachmentName = `Auction-${auctionId}.png`;
      const attachment = new Discord.MessageAttachment(png, attachmentName);
      const message = new Discord.MessageEmbed()
        .setTitle(`New Auction Discovered`)
        .setDescription(`An auction has started for Mojo #${auctionId}`)
        .setURL('https://1980.network')
        .addField('Mojo ID', auctionId, true)
        .attachFiles([attachment])
        .setImage(`attachment://${attachmentName}`)
        .setTimestamp();
      await Promise.all(this.discordClients.map(c => c.send(message)));
    }
    console.log(`processed discord new auction ${auctionId}`);
  }

  /**
   * Send Discord message with new bid event data
   * @param auctionId Mojo auction number
   * @param bid Bid amount and ID
   */
  async handleNewBid(auctionId: number, bid: Bid) {
    const message = new Discord.MessageEmbed()
      .setTitle(`New Bid Placed`)
      .setURL('https://1980.network')
      .setDescription(await formatBidMessageText(auctionId, bid))
      .setTimestamp();
    await Promise.all(this.discordClients.map(c => c.send(message)));
    console.log(`processed discord new bid ${auctionId}:${bid.id}`);
  }

  async handleAuctionEndingSoon(_auctionId: number) {
    return;
  }
}
