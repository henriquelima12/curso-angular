import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Cidade } from '../models/cidade';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    return this.http.get<Estado[]>('assets/dados/estados.json');
  }

  getCidades(id: string){
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == id))
    );
  }

  getCargos(){
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Sênior', desc: 'Dev Sr'}
    ];
  }

  getTecnologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'JavaScript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'ruby', desc: 'Ruby'}
    ];
  }

  getNewsLetter(){
    return [
      {valor: 's', desc: 'Sim'},
      {valor: 'n', desc: 'Não'}
    ];
  }
}