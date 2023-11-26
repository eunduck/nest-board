import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

//private 과 같은 접근 제어자를 생성자 안에 선언해주면 인수자가 암묵저으로 클래스 프로퍼티로 선언이 된다. 

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    // @Get()
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard( @Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    // //@Body('title') // 파일만 받을 수 있다.
    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     // @Body('title') title: string,
    //     // @Body('description') description: string
    //     @Body() createBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }
    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardsService.getBoardById(id);
    // }

    // @Delete("/:id")
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string, 
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ): Board {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}
