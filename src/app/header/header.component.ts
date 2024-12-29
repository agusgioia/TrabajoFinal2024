import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, usuarioInt } from '../auth/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  
  User:usuarioInt|null|undefined;

  constructor(private router:Router, private authService:AuthService){}

  ngOnInit(): void {
    this.User = this.authService.currentUserSig();
  }

  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigateByUrl('/login');
    });
  }
  
}
