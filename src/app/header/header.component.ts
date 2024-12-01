import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, usuarioInt } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe((user:usuarioInt) =>{
      if (user){
        this.authService.currentUserSig.set({
          id:user.id!,
          email: user.email!,
          username: user.username!,
        });
        console.log(this.authService.currentUserSig());
      }
      else{
        this.authService.currentUserSig.set(null);
        console.log(this.authService.currentUserSig());
      }
    });
  }

  logout(){
    this.authService.logout();
  }
  
}
