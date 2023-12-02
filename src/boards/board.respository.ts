import { Repository, DataSource } from "typeorm";
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";
import { User } from "src/auth/user.entity";

@Injectable()
export class BoardRepository {
    private boardRepository: Repository<Board>;

    constructor(private readonly dataSource: DataSource) {
        this.boardRepository = this.dataSource.getRepository(Board);
    }

    async getAll(): Promise <Board[]> {
        return this.boardRepository.find();
    }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = ({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        });
        console.log(board);
        return this.boardRepository.save(board);
    }

    getBoard(id: number) {
        return this.boardRepository.findOneBy({ id });
    }

    delete(id: number) {
        return this.boardRepository.delete({ id });
    }

    update(board: Board): Promise<Board> {
        return this.boardRepository.save(board);
    }

}

// export const BoardRepository = Repository.extend(Board);

