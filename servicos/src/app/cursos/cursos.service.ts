import { EventEmitter, Injectable } from '@angular/core';

import { LogService } from '../shared/log.service';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  emitirCursoCriado = new EventEmitter<string>();
  static atualizarListaCursos = new EventEmitter<string>();

  cursos: string[] = ['Angular', 'Java', 'Python'];

  constructor(private logService: LogService) { }

  getCursos(){
    this.logService.consoleLog("Obtendo lista de cursos");
    return this.cursos;
  }

  addCursos(curso: string){
    this.logService.consoleLog(`Criando o curso de: ${curso}`);
    this.cursos.push(curso);
    this.emitirCursoCriado.emit(curso);
    CursosService.atualizarListaCursos.emit(curso);
  }
}
