import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AccountComponent } from './account/account.component';
import { TripsComponent } from './trips/trips.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'subscribe',component:SubscribeComponent},
    {path:'account',component:AccountComponent},
    {path:'trips',component:TripsComponent},
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'**',redirectTo:'home',pathMatch:'full'}
];
