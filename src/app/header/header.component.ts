import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe((user: { email: any; username: any; }) =>{
      if (user){
        email:user.email!
        username:user.username!
      }
      else{
        this.authService.currentUserSig.set(null);
      }
    });
  }

  logout():void{
    this.authService.logout();
  }
}
