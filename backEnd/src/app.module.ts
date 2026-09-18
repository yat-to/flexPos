import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [RegisterModule], // 👈 Modul Register dihubungkan ke sini!
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
