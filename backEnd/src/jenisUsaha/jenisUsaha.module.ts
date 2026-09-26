import { Module } from '@nestjs/common';
import { JenisUsahaController } from './jenisUsaha.controller';
import { JenisUsahaService } from './jenisUsaha.service';

@Module({
  controllers: [JenisUsahaController],
  providers: [JenisUsahaService],
  exports: [JenisUsahaService],
})
export class JenisUsahaModule {}
