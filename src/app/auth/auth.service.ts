import {  inject, Injectable, signal } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { firstValueFrom, from, Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../usuario.interface';

export interface usuarioInt{
  id:string;
  email:string;
  username:string|null;
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
    console.log('Email received for registration:', email);
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
        listaViajes:[]
      };
      console.log(response.user.uid);
      this.userService.NuevoUsuario(newUser).subscribe(
        ()=>{
          this.currentUserSig.set({
            id:response.user.uid,
            email:email,
            username:username
          })
          console.log(this.currentUserSig());
      });
    })
    .catch(error => { 
      console.error('Error during registration and profile update:', error); 
      throw new Error(error); 
    });
    return from(promise); 
  }

  login(email:string, password:string):Observable<void>{
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(async response => { 
        const user = await firstValueFrom(this.userService.getUserById(response.user.uid));
        this.currentUserSig.set({ 
          id: response.user.uid, 
          email: user.email, 
          username: user.nombreUsuario
        });
      console.log('Signal after login:', this.currentUserSig()); 
    }) 
    .catch(error => { 
      console.error('Error during login:', error); 
      throw new Error(error.message); 
    }); 
    return from(promise);
  }

  logout():Observable<void>{
    const promise = signOut(this.firebaseAuth).then(()=>{
      this.currentUserSig.set(null);
    });
    return from (promise);
  }

}
