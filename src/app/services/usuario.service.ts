import {  Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string = 'http://localhost:8080/user';
 
  constructor(private http:HttpClient) { }
  
  public listarUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.url}/lista`);
  }

  public getUserById(id:string):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  public NuevoUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.url}/nuevo`,usuario);
  }

  public EditarUsuario(usuario:Usuario,id:string){
    return this.http.put(`${this.url}/${id}/editar`,usuario);
  }

  public EliminarUsuario(id:string){
    return this.http.delete(`${this.url}/${id}/$borrar/`);
  }


  

}
