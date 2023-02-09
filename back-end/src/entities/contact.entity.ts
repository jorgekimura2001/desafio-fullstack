import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, } from "typeorm";
import { User } from "./user.entity";

@Entity('contacts')

export class Contact {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, {cascade: true})
    user: User

}