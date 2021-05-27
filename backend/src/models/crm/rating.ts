import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('rating')
export default class Rating {
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
}
