import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { AuthService, usuarioInt } from './auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'personalizatuviaje';

  currentUser:usuarioInt|null|undefined;

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserSig();
  }

}
