import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any) {
        //들어온 인자 값
        console.log('value', value);
        //인자에 대한 메타 데이터를 포함한 객체
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status option`)
        }
        //라우터 핸들러로 전달될 값
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}