import { Serializer } from '../base/serializer';
import { DomainEntity } from '../base/domain-entity';
import { User } from './user';



export enum enumStockMarket
{
    Umdefined = 0,
    PETR4 = 1,
    PETR5 =2,
    CDB =3,
    TS =4,
    CDI =5
}

export interface Assets extends DomainEntity {
    addedStockMarket: string;
    amount: number;
    value: number;
    userCode: string;
    user: User | null;
    code: string;
    isActive: boolean;
    create: string | null;
    userCreate: string;
    update: string | null;
    userUpdate: string | null;
}

export class AssetsSerializer implements Serializer{
    fromJson(json: any):Assets{
        
        let assets: Assets = {
            addedStockMarket: json.addedStockMarket,
            amount: Number(json.amount),
            value: Number(json.value),
            user: null,
            userCode: json.userCode,
            code: json.code,
            isActive: json.isActive,
            create: json.create,
            userCreate: json.userCreate,
            update: json.update ,
            userUpdate: json.userUpdate
        }
        return assets;
    }
    toJson(base:Assets):any{
        
        return {
            addedStockMarket: base.addedStockMarket,
            amount: Number(base.amount),
            value: Number(base.value),
            user: null,
            userCode: base.userCode,
            code: base.code,
            isActive: base.isActive,
            create: base.create,
            userCreate: base.userCreate,
            update: base.update ,
            userUpdate: base.userUpdate
        }
    }
}