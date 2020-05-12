import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

// tslint:disable:variable-name
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 400 })
    title: string;

    @Column()
    description?: string;

    @Column()
    date?: Date;

    @Column()
    img?: string;

    @Column()
    created_at?: Date;

    @Exclude()
    @Column()
    user_id: number;

    @Exclude()
    @Column()
    updated_at?: Date;
}
