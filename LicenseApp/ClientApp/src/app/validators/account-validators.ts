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

export function PasswordValid (control : AbstractControl) : ValidationErrors | null {

    let pass : string = control.value;

    let HasUpperCase : boolean = false;
    let HasLowerCase : boolean = false;
    let HasSpec : boolean = true;
    let HasNumber : boolean = false;
    let Haslength : boolean = false;
    let Hasletter : boolean = false;
    
    Haslength = pass.length >= 6
    HasNumber = pass.search(/\d/) > 0; // цифры
    Hasletter   = pass.search(/\D/) > 0; // не цифры
    HasSpec     = pass.search(/\S\W/) > 0; // не цифры  не латинница  не пробел( \s - пробел \w = a-zA-Z0-9_  большие W S - отрицание ) 
    

 
    for (let index = 0; index < pass.length-1; index++) {
        let element = pass.charAt(index);
        let initial = pass.charAt(index);
        HasUpperCase =  (element.toUpperCase() == initial) || HasUpperCase;
        HasLowerCase =  (element.toLowerCase() == initial) || HasLowerCase;
        
        
    }

    if(!HasUpperCase || !HasLowerCase ||  !HasSpec || !HasNumber || !Haslength || !Hasletter) {
        return {passwoderros : true}
    } else {
        return null
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
