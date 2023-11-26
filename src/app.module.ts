import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [BoardsModule],
})
export class AppModule {}


/*
사용자 요청에 따라 알맞은 module을 찾아준다.
시작점.

*/