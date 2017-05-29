import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
export class CustomValidators{
    static invalidProjectName(control : FormControl):{[s: string] : boolean}{
      if (control.value === 'Test'){
        return {'invalidProjectName' : true};
      }
      return null;
    }
    static asyncInvalidProcjectName(control:FormControl):Promise<any>|Observable<any>{
      const promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{
          if(control.value==='testProject'){
            resolve({'invalidProjectName':true});
          }else{
            resolve(null);
          }
        }, 1500);
      })
      return promise;
    }
}
