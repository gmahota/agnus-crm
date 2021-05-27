import { Entity, Column, PrimaryColumn, OneToMany} from 'typeorm';
import Lead from './lead';
import Opportunity from './opportunity';

@Entity('accountExecutive')
export default class AccountExecutive {
  @PrimaryColumn()
  id: string;  

  @Column()
  name?: string;

  @Column()
  description?: string;

  @Column()
  phone?: string;

  @Column()
  email?: string;

  @Column()
  street1?: string;

  @Column()
  street2?: string;

  @Column()
  city?: string;

  @Column()
  province?: string;

  @Column()
  country?: string;

  @Column()
  systemUserID?: string;

  @Column()
  createdAt?: Date;

  @OneToMany(()=> Lead, item => item.accountExecutive,{
    cascade:['insert','update']
  })
  leads?: Lead[]

  @OneToMany(()=> Opportunity, item => item.accountExecutive,{
    cascade:['insert','update']
  })
  opportunities?: Opportunity[]
}
