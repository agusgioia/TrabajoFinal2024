import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AccountComponent } from './account/account.component';
import { TripsComponent } from './trips/trips.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'home', component: HomeComponent},
    {path:'subscribe',component:SubscribeComponent},
    {path:'account',component:AccountComponent},
    {path:'trips',component:TripsComponent},
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'**',redirectTo:'login',pathMatch:'full'}
];
