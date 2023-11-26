//interface 변수의 타입만을 체크한다.
//class 변수의 체크 + 인스턴스 생성이 가능하다.
export interface Board {
    id: string;
    title: string;
    description: string;
    status: BoardStatus;
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}