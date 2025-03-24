import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.enableCors({
  //   origin: ["http://localhost:5173", "http://localhost:8081", "http://localhost:8082"],
  //   credentials: true,
  // });

  const corsOptions: CorsOptions = {
    origin: [
      'http://localhost:5173',
      'http://localhost:8081',
      'http://localhost:8082',
      'http://localhost:19006', // Expo web
      'http://localhost:19000', // Expo dev server
      'http://10.0.2.2:3000', // Android emulator IP
      'http://192.168.1.37:3000', // Use your machine's actual IP address
      'http://192.168.1.37:8081', // Use your machine's actual IP address
      'http://localhost', // Android device local
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();
