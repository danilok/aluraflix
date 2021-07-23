class CreateVideoDto {
  titulo: string;
  descricao: string;
  url: string;
}

class ListAllEntities {
  limit: number;
}

class UpdateVideoDto {
  titulo: string;
  descricao: string;
  url: string;
}

export { CreateVideoDto, ListAllEntities, UpdateVideoDto };
