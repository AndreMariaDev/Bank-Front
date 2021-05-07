export interface UserView {
    name: string;
    email: string;
    phone: string;
    typeUser: enumTypeUser 
    login: string;
    password: string;
    credentialsType: enumCredentialsType;
}

export enum enumCredentialsType
{
    Umdefined = 0,
    CheckingAccount = 1,
    InvestmentAccount = 2
}
export enum enumTypeUser
{
    Umdefined = 0,
    Accountant = 1,
    Admin = 2
}