import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  authService = inject(AuthService);
  isLoggedIn = false;

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: any)=>{
      this.isLoggedIn = !!user;
    })
  }

  logout():void{
    this.authService.logout().subscribe(
      ()=>{console.log('El usuario se deslogueo')}
    );
  }
}
