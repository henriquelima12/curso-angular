import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CursosService } from 'src/app/cursos.service';
import { Curso } from '../curso';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {

  constructor(
    private service: CursosService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Curso | Observable<Curso> {
    if(route.params && route.params['id']){
      return this.service.loadById(route.params['id']);
    }
    return of({
      id: null,
      nome: null
    });
  } 
}
