import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CardModule,ToastModule,ButtonModule,CommonModule,FormsModule,ReactiveFormsModule,RouterLink]
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required, Validators.minLength(6)]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { email, password, username } = this.form.value;
      this.authService.register(username, email, password).subscribe({
        next:() => {
          this.messageService.add({severity:'success', summary: 'Registro exitoso', detail: 'Usuario registrado correctamente'});
          this.router.navigate(['/home']);
        },
        error:(error) => {
          this.messageService.add({severity:'error', summary: 'Error en registro', detail: error.message});
        }
      });
    } else {
      this.messageService.add({severity:'error', summary: 'Error en formulario', detail: 'Por favor, completa correctamente el formulario'});
    }
  }
}
