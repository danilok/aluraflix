import { EntityRepository, Repository } from 'typeorm';
import { Video } from '../entities/video.entity';

// https://docs.nestjs.com/techniques/database#custom-repository

@EntityRepository(Video)
class VideosRepository extends Repository<Video> { }

export { VideosRepository };
