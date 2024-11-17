import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuarioInt } from './usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string = 'http://localhost:8080/user/lista';

  constructor(private http:HttpClient) { }
  
  listarUsuarios():Observable<usuarioInt[]>{
    return this.http.get<usuarioInt[]>(this.url);
  }

  
}
