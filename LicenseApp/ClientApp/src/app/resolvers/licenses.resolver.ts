import { map } from 'rxjs/operators';
import { ILicenseUsers } from './../Interfaces/IUserData';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { WebApiService } from '../web-api.service';
import { Observable } from 'rxjs';



@Injectable()
export class LicensesResolver implements Resolve<ILicenseUsers> {

    constructor(private ApiService : WebApiService) {               
    }

    resolve(rout : ActivatedRouteSnapshot , sate : RouterStateSnapshot) : Promise<ILicenseUsers> | Promise<undefined> {
       return this.ApiService.GetLiceseUsers();
    }

}