import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormCanDeactivate } from 'src/app/guards/iform-candeactivate';

import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit, IFormCanDeactivate {

  inscricao: Subscription;
  aluno: any;
  private changeForm: boolean = false;

  constructor(private route: ActivatedRoute,
    private alunosService: AlunosService) {
  }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        this.aluno = this.alunosService.getAluno(id);
        if(this.aluno === null){
          this.aluno = {};
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  onInput(){
    this.changeForm = true;
  }

  changeRota(){
    if(this.changeForm && !confirm("Deseja realmente sair da página?")){
      return false;
    }
    return true;
  }

  canDesative(){
    return this.changeRota();
  }

}
