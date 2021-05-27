import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import Opportunity from './opportunity';

@Entity('stage')
export default class Stage {
  @PrimaryColumn()
  id: string;

  @Column()
  name?: string;

  @Column()
  description?: string;

  @Column()
  colorHex?: string;

  @Column()
  createdAt?: Date;

  @OneToMany(()=> Opportunity, item => item.stage,{
    cascade:['insert','update']
  })
  opportunities?: Opportunity[]
}
