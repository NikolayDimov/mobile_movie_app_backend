import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn("uuid")
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    title: string;

    @Column()
    @ApiProperty()
    year: number;

    @Column()
    @ApiProperty()
    length: number; // in minutes

    @Column("text")
    @ApiProperty()
    description: string;

    @Column()
    @ApiProperty()
    image: string; // URL from Amazon bucket

    @Column()
    @ApiProperty()
    genre: string;

    @CreateDateColumn()
    @ApiProperty()
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty()
    updatedAt: Date;
}
