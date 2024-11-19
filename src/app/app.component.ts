import { Component, inject, OnInit } from '@angular/core';
import {   RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import firebase from 'firebase/compat/app';

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
    this.authService.currentUser.subscribe((user:firebase.User | null) => {
      if (user){
        this.authService.currentUserSig.set({
          id:user.uid,
          email:user.email!,
          nombreUsuario:user.displayName ||''
        });
      }
      else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }

}
