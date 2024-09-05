import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => (databaseConfig)
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
