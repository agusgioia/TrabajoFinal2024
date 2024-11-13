import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'http://localhost:8080/user/lista';

  constructor(private http:HttpClient) { }
  listarUsuarios():Observable<usuario[]>{
    return this.http.get<usuario[]>(this.url)
  }
}
