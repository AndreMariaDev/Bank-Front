
export interface Parameters{
    key: string;
    values:any;
}

export class QueryOptions{
    private params: Array<Parameters>;
    constructor(params: Array<Parameters>){
        this.params = params;
    }
    public toQueryString():string {
        
        let result = Object 
        .keys(this.params)
        .map(keyFill=> {
            console.log(keyFill);
            console.log(`${keyFill} => ${encodeURIComponent(this.params[Number(keyFill)].key)} : ${encodeURIComponent(String(this.params[Number(keyFill)].values))}`);
            return `${encodeURIComponent(this.params[Number(keyFill)].key)}=${encodeURIComponent(String(this.params[Number(keyFill)].values))}`
        } )
        .join('&');
        console.log(result);
        return result;
    }
}