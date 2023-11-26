import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid'; // npm install uuid --save
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    //우선 로컬 메모리를 사용
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    //param 과 필드명이 동일하면 생략 가능
    createBoard(createBoardDto: CreateBoardDto) {
        // const title = createBoardDto.title;
        const {title, description } = createBoardDto;
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        return this.boards.find((board) => board.id === id);
    }

    deleteBoard(id: string): void {
        this.boards = this.boards.filter()
    }
}
