import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from '../entities/video.entity';
import { VideosRepository } from '../repositories/VideosRepository';
import {
  CreateVideoDto,
  ListAllEntities,
  PartialUpdateVideoDto,
  UpdateVideoDto,
} from './dto/video.dto';

// https://medium.com/the-crowdlinker-chronicle/best-way-to-inject-repositories-using-typeorm-nestjs-e134c3dbf53c
@Injectable()
export class VideosService {
  // https://docs.nestjs.com/techniques/logger
  private readonly logger = new Logger(VideosService.name);

  constructor(
    @InjectRepository(Video)
    private videosRepository: VideosRepository,
  ) { }

  async findAll(query: ListAllEntities) {
    this.logger.log(`Query: ${JSON.stringify(query)}`);
    const videos = await this.videosRepository.find();
    return videos;
  }

  async get(id: string): Promise<Video | null> {
    return await this.videosRepository.findOneOrFail(id);
  }

  async create(inputs: CreateVideoDto): Promise<Video> {
    const video = this.videosRepository.create(inputs);

    return await this.videosRepository.save(video);
  }

  async update(id: string, inputs: UpdateVideoDto) {
    this.logger.log(`Update: ${JSON.stringify(inputs)}`);
    await this.get(id);

    await this.videosRepository.update(id, inputs);
    return await this.get(id);
  }

  async partialUpdate(id: string, inputs: PartialUpdateVideoDto) {
    this.logger.log(`Partial Update: ${JSON.stringify(inputs)}`);

    await this.get(id);

    await this.videosRepository.update(id, inputs);
    return await this.get(id);
  }

  async remove(id: string) {
    const video = await this.videosRepository.findOne(id);
    if (video) {
      await this.videosRepository.delete(id);
      return true;
    } else {
      return false;
    }
  }
}
