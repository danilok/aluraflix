import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosService } from './videos.service';
import { Video } from '../entities/video.entity';
import { RepositoriesModule } from '../repositories/repositories.module';
import { VideosRepository } from '../repositories/VideosRepository';
import { VideosController } from './videos.controller';

// https://docs.nestjs.com/techniques/database#custom-repository
@Module({
  imports: [
    RepositoriesModule,
    TypeOrmModule.forFeature([VideosRepository, Video]),
  ],
  controllers: [VideosController],
  providers: [VideosRepository, VideosService],
})
export class VideosModule { }
