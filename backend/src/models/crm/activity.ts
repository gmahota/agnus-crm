import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import LeadLine from './leadLine';

@Entity('activity')
export default class Activity {
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

  @OneToMany(()=> LeadLine, item => item.activity,{
    cascade:['insert','update']
  })
  leadlines?: LeadLine[]
}
