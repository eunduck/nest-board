import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid'; // npm install uuid --save
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { stat } from 'fs';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(private readonly boardRepository: BoardRepository) {}


    async getAll(): Promise <Board[]> {
        return this.boardRepository.getAll();
    }
    
    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const board = await this.boardRepository.createBoard(createBoardDto, user)
        return this.getBoardById(board.id);

    }
    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.getBoard(id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        console.log('result', result);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        //getBoardById 를 async 처리 해줬기 때문에 await 붙여줘야 한다.
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.update(board)

        return board;
    }
}
