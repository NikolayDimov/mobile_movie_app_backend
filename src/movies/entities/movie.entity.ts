import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.entity';

@Entity('movie')
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    movie_id: string;

    @Column()
    @ApiProperty()
    title: string;

    @Column('text')
    @ApiProperty()
    description: string;

    @Column({ type: 'date' })
    @ApiProperty()
    release_date: string;

    @Column()
    @ApiProperty()
    genre: string;

    @Column({ nullable: true })
    @ApiProperty()
    image: string;

    @Column()
    @ApiProperty()
    length: string;

    @ManyToOne(() => User, (user) => user.movies)
    @JoinColumn({ name: 'user_id' })
    @ApiProperty()
    user: User;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn()
    @ApiProperty()
    updated_at: Date;
}

