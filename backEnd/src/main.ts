import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Mengizinkan komunikasi antar port (CORS) agar Frontend di port 3000 bisa kirim data
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const port = 8000;
  await app.listen(port);
  console.log("🚀 Backend NestJS Running");
}
bootstrap();
