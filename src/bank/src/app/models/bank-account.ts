import { Serializer } from '../base/serializer';
import { DomainEntity } from '../base/domain-entity';
import { User } from './user';

export enum enumTypeAccount
{
    Umdefined = 0,
    LegalPerson = 1,
    PhysicalPerson = 2
}

export interface BankAccount extends DomainEntity {
    accountNumber: string;
    branch: string;
    document: string;
    typeAccount: enumTypeAccount;
    amount: number;
    limit: number;
    hasLimit: boolean;
    userCode: string;
    user: User | null;
}

export class BankAccountSerializer implements Serializer{
    fromJson(json: any):BankAccount{
        let assets: BankAccount = {
            accountNumber: json.accountNumber,
            branch: json.branch,
            document: json.document,
            typeAccount: json.typeAccount,
            amount: json.amount,
            limit: json.limit,
            hasLimit: Boolean(json.hasLimit),
            userCode: json.userCode,
            user: null,
            code: json.code,
            isActive: json.isActive,
            create: json.create,
            userCreate: json.userCreate,
            update: json.update ,
            userUpdate: json.userUpdate
        }
        return assets;
    }
    toJson(json:BankAccount):any{
        return {
            accountNumber: json.accountNumber,
            branch: json.branch,
            document: json.document,
            typeAccount: json.typeAccount,
            amount: json.amount,
            limit: json.limit,
            hasLimit: Boolean(json.hasLimit),
            userCode: json.userCode,
            user: null,
            code: json.code,
            isActive: json.isActive,
            create: json.create,
            userCreate: json.userCreate,
            update: json.update ,
            userUpdate: json.userUpdate
        }
    }
}