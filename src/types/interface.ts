import { HttpStatus } from '@nestjs/common';

export interface IAddress {
    detail: string;
    city: string;
}

export interface IUser {
    fullName: string;
    email: string;
    password: string;
    role: string;
    address: IAddress[];
}

export interface ISendResponseToClient<T> {
    statusCode: HttpStatus;
    message: string;
    data: T;
    pagination?: IPagination | null;
}

export interface IPagination {
    totalPage: number;
    currentPage: number;
    urlPrev: string;
    urlNext: string;
    pageSize: number;
    path: string;
    firstUrl: string;
    lastUrl: string;
    links: {
        url: string;
        page: number;
    }[];
}

export interface IJwtPayLoad {
    email: string;
    role: string;
}
