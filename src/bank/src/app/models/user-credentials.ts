import { Serializer } from '../base/serializer';
import { DomainEntity } from '../base/domain-entity';
import { User } from './user';

export enum enumCredentialsType 
{
    Umdefined = 0,
    CheckingAccount = 1,
    InvestmentAccount =2
}

export interface UserCredentials extends DomainEntity {
    login: string;
    password: string|null;
    credentialsType: enumCredentialsType;
    userCode: string;
    user: User | null;
}

export class UserCredentialsSerializer implements Serializer{
    fromJson(json: any):UserCredentials{
        let user :UserCredentials = {
            login: json.login,
            password: json.password,
            credentialsType: json.credentialsType,
            userCode: json.userCode,
            user: null,
            code: json.code,
            isActive: json.isActive,
            create: json.create,
            userCreate: json.userCreate,
            update: json.update ,
            userUpdate: json.userUpdate 
        }
        return user;
    }
    toJson(json:UserCredentials):any{
        return {
            login: json.login,
            password: json.password,
            credentialsType: json.credentialsType,
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