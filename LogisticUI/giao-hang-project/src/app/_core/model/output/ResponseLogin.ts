import { ResponseBase } from "../ResponseBase";

export class ResponseLogin extends ResponseBase {
    Token!: string;
    Info!: UserInfo;
    Roles: any
}

export class UserInfo {
    UserName!: string;
    UserID!: number;
    Email!: string;
    FullName!: string;
    DiaChi!: string;
}
