import { ISendResponseToClient } from 'src/types/interface';

export const sendResponse = <T>(args: ISendResponseToClient<T>): ISendResponseToClient<T> => {
    return {
        statusCode: args.statusCode,
        data: args.data,
        message: args.message,
        pagination: args.pagination,
    };
};
