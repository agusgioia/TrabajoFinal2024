import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService,AuthModule} from '@auth0/auth0-angular';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(public auth:AuthService,public router:Router){}

  ngOnInit(){
      this.auth.isAuthenticated$.subscribe(isAutenthicated =>{
        if (isAutenthicated)
          this.router.navigate(['/home'])
      })
  }

  login(){
    this.auth.loginWithRedirect();
  }
}
