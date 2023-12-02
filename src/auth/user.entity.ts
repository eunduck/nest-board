import { type } from "os";
import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity('user')
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // board 에서 부를 떄: board => board.user
    @OneToMany(type => Board, board => board.user, { eager: true })
    boards: Board[];
}