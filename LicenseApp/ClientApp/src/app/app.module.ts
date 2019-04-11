
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { WebApiService } from './web-api.service';
import { AccauntService } from './accaunt.service';
import { AuthGuard } from './Guards/auth.guard';
import { AdminGuard } from './Guards/admin.guard';
import { ManagerGuard } from './Guards/manager.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MessagesComponent } from './messages/messages.component';
import { LicenseComponent } from './license/license.component';
import { LicensesComponent } from './licenses/licenses.component';
import { CoWokerComponent } from './co-woker/co-woker.component';
import { CoWokersComponent } from './co-wokers/co-wokers.component';
import { RemoveSymbolsDirective } from './directives/remove-symbols.directive';
import { DisableFormcontrolDirective } from './directives/disable-formcontrol.directive';
import { CoWokerRolesComponent } from './co-woker-roles/co-woker-roles.component';
import { LicensesResolver } from "./resolvers/licenses.resolver";
import { FilterInputComponent } from './filter-input/filter-input.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    LogoutComponent,
    CoWokersComponent,
    CoWokerComponent,
    LicensesComponent,
    LicenseComponent,
    MessagesComponent,
    RemoveSymbolsDirective,
    DisableFormcontrolDirective,
    CoWokerRolesComponent,
    FilterInputComponent
  ],
  
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'users', component: CoWokersComponent, canActivate : [AdminGuard] },
      { path: 'user/:userId', component: CoWokerComponent, canActivate : [AdminGuard]},
      { path: 'licenses', component: LicensesComponent, canActivate : [AuthGuard] , resolve : {key : LicensesResolver }  },
      { path: 'license/:licenseId', component: LicenseComponent, canActivate : [AuthGuard]   },

    ]
    //, {useHash : true} 
    )
  ],
  
  providers : [WebApiService,
    AccauntService,
    AuthGuard,
    AdminGuard,
    ManagerGuard,
    LicensesResolver
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}