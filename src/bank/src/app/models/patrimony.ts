import { Serializer } from '../base/serializer';
import { DomainEntity } from '../base/domain-entity';
import { Assets } from './asset';

export interface Patrimony extends DomainEntity {
    accountNumber: string;
    branch: string;
    balance: number;
    listAssets: Assets[] | null;
    summarizedEquity: number;
    userCode: string;
    name: string;
}

export class PatrimonySerializer implements Serializer{

    fromJson(json: any):Patrimony{
        let assetsList: Array<Assets> = new Array<Assets>();

        json.listAssets?.map((item:any)=>{
            let assets: Assets = {
                addedStockMarket: item.addedStockMarket,
                amount: item.amount,
                value: item.value,
                code: item.code,
                userCode: item.userCode,
                user: null,
                isActive: item.isActive,
                create: item.create,
                userCreate: item.userCreate,
                update: item.update ,
                userUpdate: item.userUpdate
            }
            assetsList.push(assets);
        })

        let patrimony: Patrimony = {
            accountNumber: json.accountNumber,
            branch: json.branch,
            balance: Number(json.balance),
            listAssets: assetsList,
            summarizedEquity: Number(json.summarizedEquity),
            userCode: json.userCode,
            name: json.name,
            code: json.code,
            isActive: json.isActive,
            create: json.create,
            userCreate: json.userCreate,
            update: json.update ,
            userUpdate: json.userUpdate
        }
        return patrimony;
    }
    toJson(json:Patrimony):any{

        let assetsList: Array<Assets> = new Array<Assets>();

        json.listAssets?.map((item:any)=>{
            let assets: Assets = {
                addedStockMarket: item.addedStockMarket,
                amount: item.amount,
                value: item.value,
                code: item.code,
                userCode: item.userCode,
                user: null,
                isActive: item.isActive,
                create: item.create,
                userCreate: item.userCreate,
                update: item.update ,
                userUpdate: item.userUpdate
            }
            assetsList.push(assets);
        })

        return {
            accountNumber: json.accountNumber,
            branch: json.branch,
            balance: Number(json.balance),
            listAssets: assetsList,
            summarizedEquity: Number(json.summarizedEquity),
            userCode: json.userCode,
            name: json.name,
            code: json.code,
            isActive: json.isActive,
            create: json.create,
            userCreate: json.userCreate,
            update: json.update ,
            userUpdate: json.userUpdate
        }
    }
}

