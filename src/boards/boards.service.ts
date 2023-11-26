import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid'; // npm install uuid --save
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(private readonly boardRepository: BoardRepository) {}

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // //param 과 필드명이 동일하면 생략 가능
    // createBoard(createBoardDto: CreateBoardDto) {
    //     // const title = createBoardDto.title;
    //     const {title, description } = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const board = await this.boardRepository.createBoard(createBoardDto)
        return this.getBoardById(board.id);

    }
    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.getBoard(id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }
    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);

    //     if (!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }

    //     return found;
    // }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);

    //     //filter 같지 않은걸 제외하고
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
