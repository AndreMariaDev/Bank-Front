import { DomainEntity, DomainEntityT } from '../base/domain-entity';
import { Serializer } from '../base/serializer';
export interface Traded extends DomainEntity {
    addedStockMarket: string;
    value: number;
}

export class TradedSerializer implements Serializer{
    fromJson(json: any): DomainEntityT {
        throw new Error('Method not implemented.');
    }
    toJson(base: DomainEntityT) {
        throw new Error('Method not implemented.');
    }

}