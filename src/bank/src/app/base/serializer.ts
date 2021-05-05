import { DomainEntityT } from './domain-entity';

export interface Serializer{
    fromJson(json: any):DomainEntityT;
    toJson(base:DomainEntityT):any
}

export interface SerializerT{
    fromJson(json: any):any;
    toJson(base:DomainEntityT):any
}