import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,ReactiveFormsModule],
  providers:[AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    fb = inject(FormBuilder);
    http = inject(HttpClient);
    router = inject(Router);
    
    authService = inject(AuthService);
    
    form = this.fb.nonNullable.group({
      Username:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
    })

    errorMessage:string | null = null;

    onSubmit():void{
      const rawForm = this.form.getRawValue();
      this.authService.register(
        rawForm.email,
        rawForm.Username,
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
