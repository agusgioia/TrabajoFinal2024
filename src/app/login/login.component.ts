import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,ButtonModule,DividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authservice = inject(AuthService);

  form = this.fb.nonNullable.group({
    username:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required],
  });

  errorMessage:string |null = null;

  onSubmit():void{
    const rawForm = this.form.getRawValue();
    this.authservice.login(rawForm.email,rawForm.password).subscribe({
      next:() => {
        this.router.navigateByUrl('/home');
      },
      error:(err)=>{
          this.errorMessage = err.code;
      }
    })
  }

  redirectRegister(){
    this.router.navigateByUrl('/register');
  }

}
