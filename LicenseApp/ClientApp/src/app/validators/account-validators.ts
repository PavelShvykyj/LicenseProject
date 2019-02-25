import { WebApiService } from './../web-api.service';
import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

/// функция которая как результат возвращает ФУНКЦИЮ валидатор для контрола формы
/// при построения формы внутри валидатора this компонента недоступен
/// посему переменные компонента недоступны а нам нужен WebApi поэтому мы возвращаем нашу функцию из окружения где 
/// WebApi доступен (из входящего параметра)  

export function UniqnessUserName(WebApi : WebApiService) : AsyncValidatorFn {
    return (control : AbstractControl) : Promise<ValidationErrors | null> => {
        return WebApi.UserNameExist((control.value as string))
        .then(result => {
            let UserID : Array<string> = JSON.parse(result);
            let CurrentID : string = control.parent.value.Id;
            
            if(UserID.length == 0  ) {
                return null
            }

            if(UserID[0] == CurrentID) {
                return null 
            }

            return { exist: true }  

            
            // if (result) {
            //     return { exist: true }
            // }
            // else {
            //     return null
            // }
        })
        .catch(error => {
            return { exist: error }
        })
    }
}


export function UniqnessEmail(WebApi : WebApiService) : AsyncValidatorFn {
    
    return (control : AbstractControl) : Promise<ValidationErrors | null> => {
        return WebApi.EmailExist((control.value as string))
        .then(result => {
            
            let UserID : Array<string> = JSON.parse(result);
            let CurrentID : string = control.parent.value.Id;

            if(UserID.length == 0  ) {
                return null
            }

            if(UserID[0] == CurrentID) {
                return null 
            }
            return { exist: true }  
            // if (result) {
            //     return { exist: true }
            // }
            // else {
            //     return null
            // }
        })
        .catch(error => {
            return { exist: error }
        })
    }
}

export function UniqnessPhone(WebApi : WebApiService) : AsyncValidatorFn {
    return (control : AbstractControl) : Promise<ValidationErrors | null> => {
        
        
        return WebApi.PhoneExist((control.value as string))
        .then(result => {
            let UserID : Array<string> = JSON.parse(result);
            let CurrentID : string = control.parent.value.Id;

            if(UserID.length == 0  ) {
                return null
            }

            if(UserID[0] == CurrentID) {
                return null 
            }

            return { exist: true }  

            // if (result) {
            //     return { exist: true }                  
            // }
            // else {
            //     return null
            // }
        })
        .catch(error => {
            return { exist: error }
        })

        
    }
}
