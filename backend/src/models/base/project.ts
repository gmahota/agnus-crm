import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,OneToOne, JoinColumn,OneToMany } from "typeorm";

@Entity('project')
export default class Project {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({length: 50, nullable:true})
  code?: string
  
  @Column({length: 50, nullable:false })
  description: string

  @Column({length: 20, nullable:false })
  status?: string
}

export type { Project }
