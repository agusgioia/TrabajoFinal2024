import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../usuario.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authservice = inject(AuthService);
  usuario!: Usuario;

  constructor(private userService:UsuarioService){}

  form = this.fb.nonNullable.group({
    username:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required],
  });

  
  errorMessage:string |null = null;

  async onSubmit(){
    const rawForm = this.form.getRawValue();
    this.authservice.register(rawForm.username,rawForm.email,rawForm.password).subscribe({
      next:()=> {
        this.router.navigateByUrl('/home');
      },
      error:(err)=>{
        this.errorMessage=err.code;
      }
    })
  }

  


}
