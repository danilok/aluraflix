import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateVideoDto,
  ListAllEntities,
  UpdateVideoDto,
} from './dto/video.dts';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) { }
  @Get()
  findAll(@Query() query: ListAllEntities): string {
    console.log(query);
    return 'Videos';
  }

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    console.log(createVideoDto);
    this.videosService.create({ id: '', titulo: '', descricao: '', url: '' });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `this action get a #${id} video`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    console.log(updateVideoDto);
    return `this action updates a #${id} video`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `this action removes a #${id} video`;
  }
}
