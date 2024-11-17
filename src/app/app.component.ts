import { Component, inject, OnInit } from '@angular/core';
import {   RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'personalizatuviaje';

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.suscribe((user: { id:any;email: any; nombreUsuario: any; }) => {
      if (user){
        this.authService.currentUserSig.set({
          id:user.id,
          email:user.email,
          nombreUsuario:user.nombreUsuario
        })
      }
      else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }

}
