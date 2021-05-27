import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Customer from './../base/customer';
import AccountExecutive from './accountExecutive';
import Stage from './stage';

@Entity('opportunity')
export default class Opportunity {
    @PrimaryColumn()
    id: string;

    @Column()
    name?: string;

    @Column()
    description?: string;

    @ManyToOne(() => Stage, (item) => item.opportunities)
    @JoinColumn({ name: "stageID" })
    stage: Stage

    @ManyToOne(() => AccountExecutive, (item) => item.opportunities)
    @JoinColumn({ name: "accountExecutiveID" })
    accountExecutive: AccountExecutive

    @ManyToOne(() => Customer, (item) => item.opportunities)
    @JoinColumn({ name: "customerID" })
    customer?: Customer;

    @Column()
    estimatedRevenue?: number;

    @Column()
    estimatedClosingDate?: Date;

    @Column()
    probability?: number;

    @Column()
    ratingID?: string;

    @Column()
    createdAt?: Date;
}
