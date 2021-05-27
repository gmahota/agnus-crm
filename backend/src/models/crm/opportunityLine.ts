import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('opportunityLine')
export default class OpportunityLine {
    @PrimaryColumn()
    id: string;

    @Column()
    opportunityId: string;

    @Column()
    activityId: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    description: string;

    @Column()
    createdAt?: Date;
}
