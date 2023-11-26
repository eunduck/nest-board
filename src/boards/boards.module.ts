import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './board.respository';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository]
})
export class BoardsModule {}
