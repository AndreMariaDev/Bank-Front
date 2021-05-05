import { Serializer } from '../base/serializer';
import { DomainEntity } from '../base/domain-entity';
import { Patrimony } from './patrimony';
import { BankAccount } from './bank-account';
import { UserCredentials } from './user-credentials';
import { Guid } from '../base/create-guid'

export interface User extends DomainEntity {
    name: string;
    email: string;
    phone: string;
    userCredentialsItens: UserCredentials[] | null;
    bankAccount: BankAccount | null;
    code: string ;
    isActive: boolean;
    create: string | null;
    userCreate: string;
    update: string | null;
    userUpdate: string | null;
    listAssets: any |null;
}

export class UserSerializer implements Serializer{
    fromJson(json: any): User{
        debugger;
        let userCredentialsItensList: Array<UserCredentials> = new Array<UserCredentials>();
        
        json.userCredentialsItens?.map((item:any)=>{
            let user : UserCredentials = {
                login: item.login,
                password: item.password,
                credentialsType: item.credentialsType,
                userCode: item.userCode,
                user: null,
                code: item.code,
                isActive: item.isActive,
                create: item.create,
                userCreate: item.userCreate,
                update: item.update ,
                userUpdate: item.userUpdate 
            }
            userCredentialsItensList.push(user);
        });
        let user :User = {
            name: json.name,
            email: json.email,
            phone: json.phone,
            userCredentialsItens: userCredentialsItensList,
            bankAccount: null,
            code: json.code,
            isActive: json.isActive,
            create: json.create,
            userCreate: json.userCreate,
            update: json.update ,
            userUpdate: json.userUpdate, 
            listAssets: null
        }
        return user;
    }
    toJson(json:any):any{
        let userCredentialsItensList: Array<UserCredentials> = new Array<UserCredentials>();
        
        let id = new Guid();
        var item = json.userCredentialsItens;
        let user : UserCredentials = {
            login: item.login,
            password: item.password,
            credentialsType: item.credentialsType,
            userCode: item.userCode,
            user: null,
            code: id.uuid() ,
            isActive: item.isActive,
            create: (new Date()).toString(),
            userCreate: item.userCreate,
            update: item.update ,
            userUpdate: item.userUpdate 
        }
        userCredentialsItensList.push(user);
        debugger;
        let result = {
            name: json.name,
            email: json.email,
            phone: json.phone,
            userCredentialsItens: userCredentialsItensList,
            bankAccount: null,
            code: json.code,
            isActive: json.isActive,
            create: json.create,
            userCreate: json.userCreate,
            update: json.update ,
            userUpdate: json.userUpdate,
            listAssets: null
        }
        console.log(result);
        return result;
    }
}