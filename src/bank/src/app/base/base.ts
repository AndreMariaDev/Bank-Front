
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class Base{
    protected extractData(response:any){
        return response || {};
    }
  
    protected serviceError(response:Response | any){
        let customError: string[] = [];
        let customResponse = { error:{ errors: Array<string>() }};
  
        if(response instanceof HttpErrorResponse){
            if(response.statusText === "Unknown Error"){
              customError.push("Ocooreu um erro desconhecido");
              response.error.errors = customError;
            }
            if(response.status === 500){
              customError.push("Ocooreu um erro desconhecido");
              customResponse.error.errors = customError;
              return throwError(customResponse);
            }
        }
        return throwError(response);
    }
}