import { Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from "./auth/guards/auth.guard";
import { MoviesModule } from "./movies/movies.module";
import { AwsModule } from './aws/aws.module';

import {
  GlobalExceptionFilter,
  //HttpExceptionFilter,
} from "./filters/HttpExceptionFilter";
//import { dataSourceOptions } from "db/data-source";

import { User } from "./user/user.entity";
import { Movie } from "./movies/entities/movie.entity";
import * as dotenv from "dotenv";
dotenv.config();

@Module({
  imports: [
    // ConfigModule.forRoot(),
    // TypeOrmModule.forRoot(dataSourceOptions),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "postgres",
          host: "localhost",
          port: 5432,
          // username: config.get<string>("USERNAME"),
          username: config.get<string>("DB_USERNAME"),
          password: config.get<string>("PASSWORD"),
          database: config.get<string>("DB_NAME"),
          entities: [
            User,
            Movie
          ],
          synchronize: true,
        };
      },
    }),

    AuthModule,
    UserModule,
    MoviesModule,
    AwsModule
  ],
  controllers: [],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule { }
