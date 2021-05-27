import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Lead from './lead';

@Entity('channel')
export default class Channel {
  @PrimaryColumn()
  id: string;

  @Column()
  name?: string;

  @Column()
  createdAt?: Date;

  @Column()
  description?: string;

  @Column()
  colorHex?: string;

  @OneToMany(()=> Lead, item => item.channel,{
    cascade:['insert','update']
  })
  leads?: Lead[]
}
