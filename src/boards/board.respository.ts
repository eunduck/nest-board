import { Repository, DataSource } from "typeorm";
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";

@Injectable()
export class BoardRepository {
    private boardRepository: Repository<Board>;

    constructor(private readonly dataSource: DataSource) {
        this.boardRepository = this.dataSource.getRepository(Board);
    }

    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = ({
            title,
            description,
            status: BoardStatus.PUBLIC
        })
        return this.boardRepository.save(board);
    }

    getBoard(id: number) {
        return this.boardRepository.findOneBy({ id });
    }

}

// export const BoardRepository = Repository.extend(Board);
