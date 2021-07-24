import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}

class ListAllEntities {
  limit: number;
}

class UpdateVideoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}

// https://docs.nestjs.com/techniques/validation#mapped-types
class PartialUpdateVideoDto extends PartialType(CreateVideoDto) { }

export {
  CreateVideoDto,
  ListAllEntities,
  UpdateVideoDto,
  PartialUpdateVideoDto,
};
