import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public auth:AuthService){}

  logout():void{
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin } // Redirecciona a la página de inicio
    });
  }
}
