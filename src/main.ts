import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

/*
nest: using nestcli
--no-spec 테스트 코그 생성 x

nest g module boards
nest g controller boards --no-spec (파일 생성 후 module 파일을 찾아서 controller를 넣어준다)

service 데이터ㅔㅂ이스 관련 로직을 처리
nest g service boards --no-spec
*/