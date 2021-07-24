import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  Patch,
  Query,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import {
  CreateVideoDto,
  ListAllEntities,
  PartialUpdateVideoDto,
  UpdateVideoDto,
} from './dto/video.dto';
import { VideosService } from './videos.service';

// https://typeorm.io/#/repository-api
@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) { }

  // https://docs.nestjs.com/techniques/serialization
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query() query: ListAllEntities) {
    const videos = await this.videosService.findAll(query);
    return videos;
  }

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    const video = await this.videosService.create(createVideoDto);
    return video;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.videosService.get(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    try {
      return await this.videosService.update(id, updateVideoDto);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async partialUpdate(
    @Param('id') id: string,
    @Body() partialUpdateVideoDto: PartialUpdateVideoDto,
  ) {
    try {
      return await this.videosService.partialUpdate(id, partialUpdateVideoDto);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
    }
  }

  // https://docs.nestjs.com/controllers#status-code
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.videosService.remove(id);
    if (!deleted) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
