import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,ReactiveFormsModule],
  providers:[AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    fb = inject(FormBuilder);
    http = inject(HttpClient);
    router = inject(Router);
    
    authService = inject(AuthService)

    form = this.fb.nonNullable.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })

    errorMessage:string | null = null;

    onSubmit():void{
      const rawForm = this.form.getRawValue();
      this.authService.login(
        rawForm.email,
        rawForm.password).subscribe({
          next:() =>{
            this.router.navigateByUrl('/home')
        },
        error: (err)=>{
          this.errorMessage = err.code;
        }
      });
    }
}
