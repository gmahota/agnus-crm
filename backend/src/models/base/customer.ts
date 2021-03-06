import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Lead from './../crm/lead';
import Opportunity from './../crm/opportunity';

@Entity('customers')
export default class Customer {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 50, nullable: false })
    name?: string;

    @Column({ length: 50, nullable: true })
    address?: string;

    @Column({ length: 20, nullable: true })
    vat?: string;

    @Column({ length: 50, nullable: true })
    province?: string;

    @Column({ length: 20, nullable: false })
    phoneNumber: string;

    @Column()
    status?: string;

    @OneToMany(() => Lead, item => item.customer, {
        cascade: ['insert', 'update']
    })
    leads?: Lead[]

    @OneToMany(() => Opportunity, item => item.customer, {
        cascade: ['insert', 'update']
    })
    opportunities?: Opportunity[]
}
