import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Lead from './lead';
import Activity from './activity';

@Entity('leadline')
export default class LeadLine {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string

  @Column()
  description?: string;

  @Column()
  startDate?: Date;

  @Column()
  endDate?: Date;

  @Column()
  createdAt?: Date;

  @ManyToOne(() => Lead, (item) => item.leadlines)
  @JoinColumn({ name: "leadID" })
  lead?: Lead;

  @ManyToOne(() => Activity, (item) => item.leadlines)
  @JoinColumn({ name: "activityID" })
  activity?: Activity;
}
