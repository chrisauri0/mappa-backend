import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoService } from './mongo.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        console.log('MONGO_URI:', uri); // 🔍 Esto imprimirá la URI en la consola
        return { uri };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MongoService],
})
export class MongoModule {}
