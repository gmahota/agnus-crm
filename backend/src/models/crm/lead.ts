import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn,OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import Customer from '../base/customer';
import AccountExecutive from './accountExecutive';
import Channel from './channel';
import LeadLine from './leadLine';

@Entity('lead')
export default class Lead {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string

  @Column()
  description?: string

  @Column()
  street1?: string

  @Column()
  street2?: string

  @Column()
  city?: string
  @Column()
  province?: string

  @Column()
  country?: string

  @Column()
  isQualified?: boolean

  @Column()
  isConverted?: boolean

  @ManyToOne(() => Channel, (item) => item.leads)
  @JoinColumn({ name: "channelID" })
  channel?: Channel;

  @ManyToOne(() => Customer, (item) => item.leads)
  @JoinColumn({ name: "customerID" })
  customer?: Customer;

  @ManyToOne(() => AccountExecutive, (item) => item.leads)
  @JoinColumn({ name: "accountExecutiveID" })
  accountExecutive:AccountExecutive

  @OneToMany(()=> LeadLine, item => item.lead,{
    cascade:['insert','update']
  })
  leadlines?: LeadLine[]

  @Column()
  createdAt?: Date;
}
