import { SerializerT } from "../base/serializer";
import { DomainEntityT } from '../base/domain-entity';

export class TransactionHistoryResponse extends DomainEntityT {
    event: string;
    targetBank: string;
    targetBranch: string;
    targetAccount: string;
    originBank: string;
    originBranch: string;
    originDocument: string;
    amount: number;
    codeUser: string;
}

export class TransactionHistorySerializer implements SerializerT{
    fromJson(entity: any):TransactionHistoryResponse{
        let assets: TransactionHistoryResponse = {
            event : 			entity.event,
            targetBank : 		entity.targetBank,
            targetBranch : 		entity.targetBranch,
            targetAccount : 	entity.targetAccount,
            originBank : 		entity.originBank,
            originBranch : 		entity.originBranch,
            originDocument : 	entity.originDocument,
            amount : 			Number(entity.amount),
            codeUser:           entity.codeUser
        }
        return assets;
    }
    toJson(entity:TransactionHistoryResponse):any{
        return {
            event : 			entity.event,
            targetBank : 		entity.targetBank,
            targetBranch : 		entity.targetBranch,
            targetAccount : 	entity.targetAccount,
            originBank : 		entity.originBank,
            originBranch : 		entity.originBranch,
            originDocument : 	entity.originDocument,
            amount : 			Number(entity.amount),
            codeUser:           entity.codeUser
        }
    }
}