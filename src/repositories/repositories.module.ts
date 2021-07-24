import { Module } from '@nestjs/common';
import { VideosRepository } from './VideosRepository';

@Module({
  imports: [VideosRepository],
  exports: [VideosRepository],
})
export class RepositoriesModule { }
