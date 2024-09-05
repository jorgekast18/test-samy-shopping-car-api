import { DynamicModule } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DatabaseProvider: DynamicModule = MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {

    const dbConfig: MongooseModuleOptions = {
        uri: config.get<string>('MONGODB_URI'),
        user: config.get<string>('MONGO_USER'),
        pass: config.get<string>('MONGO_PASSWORD'),   
        dbName: config.get<string>('MONGO_DATABASE'),
        connectTimeoutMS: 30000,
    };

    return dbConfig;
  },
});
