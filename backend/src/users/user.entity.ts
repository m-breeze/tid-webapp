import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { IPassHash } from '../common/services/crypto.service';

// tslint:disable:variable-name
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 100 })
    @Length(2, 100)
    username: string;

    @Column({ length: 160 })
    name?: string;

    @Column({ length: 100 })
    @Length(5, 100)
    @IsEmail()
    email: string;

    @Exclude()
    @Column({ type: 'jsonb' })
    password: IPassHash;

    @Column()
    img?: string;

    @Exclude()
    @Column()
    token?: string;

    @Column()
    created_at?: Date;

    @Column()
    updated_at?: Date;
}
