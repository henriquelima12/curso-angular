import { Injectable } from '@angular/core';
import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private alunos: Aluno[] = [
    {
      id: 1,
      nome: 'João',
      email: 'joao@joao'
    },
    {
      id: 2,
      nome: 'Maria',
      email: 'maria@maria'
    },
    {
      id: 3,
      nome: 'Lucas',
      email: 'lucas@lucas'
    }
  ]

  constructor() { }

  getAlunos(){
    return this.alunos;
  }

  getAluno(id: number){
    let alunos = this.getAlunos();
    for(let i=0; i<alunos.length; i++){
      let aluno = alunos[i];
      if(aluno.id == id){
        return aluno;
      }
    }
    return null;
  }
}
