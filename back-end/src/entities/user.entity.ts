import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Contact } from "./contact.entity";


@Entity('users')

export class User {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @Column()
    @Exclude()
    password: string;
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Contact, contact => contact.user, { eager: true })
    contacts: Contact[]

}