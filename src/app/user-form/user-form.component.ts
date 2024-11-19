import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{

  formUser:FormGroup;
  isSaveinProgress:boolean = false;
  edit:boolean=false; 


  constructor(private fb:FormBuilder, private userService:UsuarioService,private router:Router, private activatedRoute:ActivatedRoute){
      this.formUser=this.fb.group({
          id:[null],
          email:['',Validators.required],
          nombreUsuario:['',Validators.required]
      });
  ;}

  ngOnInit(): void {
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id!=='nuevo'){
        this.edit=true;
        this.getUserById(id!);
      }else{
        this.router.navigateByUrl('/login');
      }
  }
  

    getUserById(id:string){
    this.userService.getUserById(id).subscribe({
        next:foundUser =>{
            this.formUser.patchValue(foundUser);
        },
        error:()=>{
          console.log('Usuario no encontrado');
          this.router.navigateByUrl('/');
        },
    });
  }

  createUser(){
    if (this.formUser.invalid){
      console.log('Valores invalidos en el formulario');
      return
    }
    this.isSaveinProgress = true;
    this.userService.NuevoUsuario(this.formUser.value).subscribe({
      next:()=>{
        console.log('Usuario creado con éxito');
        this.isSaveinProgress = false;
        this.router.navigateByUrl('/');
      },
      error:()=>{
        console.log('Error, revise los campos e intente nuevamente');
        this.isSaveinProgress = false;
      }
    })
  }

  updateUser(){
    if (this.formUser.invalid){
      console.log('Revise los campos e intente nuevamente');
      return
    }
    this.isSaveinProgress = true;
    this.userService.EditarUsuario(this.formUser.value).subscribe({
      next:()=>{
        console.log('Usuario actualizado con éxito');
        this.router.navigateByUrl('/account');
      },
      error:()=>{
        console.log('Revise los campos e intente nuevamente');
      }
    })
  }


  onSubmit(){
    this.updateUser();
  }

}
