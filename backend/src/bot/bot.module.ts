import { Module } from '@nestjs/common';
import { BotsService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotController } from './bot.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  // imports: [
  //   TelegrafModule.forRootAsync({
  //     imports: [ConfigModule],
  //     inject: [ConfigService],
  //     useFactory: (configService: ConfigService) => ({
  //       token: configService.get<string>('BOT_TOKEN')!,
  //     }),
  //   }),
  // ],
  // providers: [BotsService, BotController],
})
export class BotModule {}
