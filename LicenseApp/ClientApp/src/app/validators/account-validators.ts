import { WebApiService } from './../web-api.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';



export class SignInValidators {

    

    UserNameUniqness(control: AbstractControl): Promise<ValidationErrors | null> {
        // return this.WebApi.UserNameExist((control.value as string))
        // .then(result => {
        //     if (result) {
        //         return { exist: true }
        //     }
        //     else {
        //         return null
        //     }
        // })
        // .catch(error => {
        //     return { exist: error }
        // })
        

        return new Promise ((reject, resolve) => {
            setTimeout(() => {
              if((control.value as string) == "Administrator")
               {reject( { exist: true })} 
               else 
               {reject( null)}
            }, 2000);
        });
 
    }


}