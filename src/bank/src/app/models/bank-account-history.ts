import { DomainEntity } from '../base/domain-entity';
import { BankAccount } from './bank-account';
import { Serializer } from '../base/serializer';

export interface BankAccountHistory extends DomainEntity {
    bankAccountCode: string;
    movingDate: string;
    typeMoving: enumTypeMoving;
    amountMoved: number;
    bankAccount: BankAccount | null;
}

export enum enumTypeMoving
{
    Umdefined = 0,
    BankDraft = 1,
    BankDeposit = 2
}

export class BankAccountSerializer implements Serializer{
    fromJson(json: any):BankAccountHistory{
        let assets: BankAccountHistory = {
            bankAccountCode: json.bankAccountCode,
            movingDate: json.movingDate,
            typeMoving: json.typeMoving,
            amountMoved: json.amountMoved,
            bankAccount: null,
            code: json.code,
            isActive: json.isActive,
            create: json.create,
            userCreate: json.userCreate,
            update: json.update ,
            userUpdate: json.userUpdate
        }
        return assets;
    }
    toJson(json:BankAccountHistory):any{
        return {
            bankAccountCode: json.bankAccountCode,
            movingDate: json.movingDate,
            typeMoving: json.typeMoving,
            amountMoved: json.amountMoved,
            bankAccount: null,
            code: json.code,
            isActive: json.isActive,
            create: json.create,
            userCreate: json.userCreate,
            update: json.update ,
            userUpdate: json.userUpdate
        }
    }
}