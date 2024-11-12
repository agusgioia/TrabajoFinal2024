import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AccountComponent } from './account/account.component';
import { TripsComponent } from './trips/trips.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
    {path:'subscribe',component:SubscribeComponent,canActivate:[AuthGuard]},
    {path:'account',component:AccountComponent,canActivate:[AuthGuard]},
    {path:'trips',component:TripsComponent,canActivate:[AuthGuard]},
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'**',redirectTo:'login',pathMatch:'full'}
];
