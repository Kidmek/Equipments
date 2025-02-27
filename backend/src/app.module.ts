import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EquipmentsModule } from './equipments/equipments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './equipments/entities/equipment.entity';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Equipment],
        synchronize: true, // Set to false in production
      }),
    }),
    EquipmentsModule,
    BotModule,
  ],
})
export class AppModule {}
