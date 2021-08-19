import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioAutenticado: boolean = false;

  showMenu = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario){
    if(usuario.nome === 'usuario@email.com' &&
    usuario.senha === '123456'){
      this.usuarioAutenticado = true;
      this.showMenu.emit(true);
      this.router.navigate(['/']);
    }else{
      this.usuarioAutenticado = false;
      this.showMenu.emit(false);
    }
  }

  usuarioIsAutenticado(){
    return this.usuarioAutenticado;
  }
}
