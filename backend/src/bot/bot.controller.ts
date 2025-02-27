import { Context, Markup, Telegraf } from 'telegraf';
import { InjectBot, Start, Update } from 'nestjs-telegraf';

import { BOT_MESSAGES } from './bot.messages';
import { ConfigService } from '@nestjs/config';

@Update()
export class BotController {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private configService: ConfigService,
  ) {
    void this.bot.telegram.setMyCommands([
      {
        command: '/start',
        description: 'Start',
      },
    ]);
  }

  @Start()
  async startCommand(ctx: Context): Promise<any> {
    const userTelegramName: string =
      ctx.from?.first_name || ctx.from?.username || '';
    const inlineKeyboard = Markup.keyboard([
      [
        {
          text: BOT_MESSAGES.START_BROWSING,
          web_app: { url: this.configService.get<string>('WEB_APP_URL')! },
        },
      ],
    ]);
    await ctx.reply(`${BOT_MESSAGES.HELLO}${userTelegramName}`, inlineKeyboard);

    const chatID: number | undefined = ctx?.chat?.id;
    console.log(chatID);
  }
}
