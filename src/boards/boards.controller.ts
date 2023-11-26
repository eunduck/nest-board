import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';

//private 과 같은 접근 제어자를 생성자 안에 선언해주면 인수자가 암묵저으로 클래스 프로퍼티로 선언이 된다. 

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    //@Body('title') // 파일만 받을 수 있다.
    @Post()
    createBoard(
        // @Body('title') title: string,
        // @Body('description') description: string
        @Body() createBoardDto: CreateBoardDto
    ): Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id);
    }
}
