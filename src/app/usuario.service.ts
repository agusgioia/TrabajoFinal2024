import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuarioInt } from './usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string = 'http://localhost:8080/user';
  private usuarios:usuarioInt[] = [];

  constructor(private http:HttpClient) { }
  
  public listarUsuarios():Observable<usuarioInt[]>{
    return this.http.get<usuarioInt[]>(`${this.url}/lista`);
  }

  public getUserById(id:string):Observable<usuarioInt>{
    return this.http.get<usuarioInt>(`${this.url}/${id}`);
  }

  public NuevoUsuario(usuario:usuarioInt):Observable<usuarioInt>{
    return this.http.post<usuarioInt>(`${this.url}/nuevo`,usuario);
  }

  public EditarUsuario(usuario:usuarioInt):Observable<usuarioInt>{
    return this.http.put<usuarioInt>(this.url,usuario);
  }

  public EliminarUsuario(id:number){
    return this.http.delete<usuarioInt>(`${this.url}/${id}/$borrar/`);
  }
}
