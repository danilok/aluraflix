import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

// https://docs.nestjs.com/techniques/serialization
@Entity('videos')
class Video {
  @PrimaryColumn()
  id: string;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column()
  url: string;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Video };
