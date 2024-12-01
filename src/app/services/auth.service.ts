import {  inject, Injectable, signal } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {   Firestore } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../usuario.interface';

export interface usuarioInt{
  id:string;
  email:string;
  username:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuth = inject(Auth);
  user$= user(this.firebaseAuth);
  currentUserSig = signal<usuarioInt |null |undefined>(undefined);
  
  constructor(private userService:UsuarioService){}

  register(username: string, email: string, password: string): Observable<void> { 
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password) 
    .then(response => {
      updateProfile(response.user, { displayName: username });
      const newUser: Usuario = {
        id: response.user.uid,
        nombreUsuario: username,
        email: email,
        edad:18,
        presupuesto:0,
        genero:'',
        Viajes:[]
      };
      this.userService.NuevoUsuario(newUser).subscribe(
        ()=>{console.log(newUser)}
      );
    } 
       )
    .catch(error => { 
      console.error('Error during registration and profile update:', error); 
      throw new Error(error); 
    });
    return from(promise); 
  }

  login(email:string, password:string):Observable<void>{
    const promise = signInWithEmailAndPassword(this.firebaseAuth,email,password).then(
      () => {}
    )
    return from (promise);
  }

  logout():Observable<void>{
    const promise = signOut(this.firebaseAuth);
    return from (promise);
  }

}
