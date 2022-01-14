import { Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY, empty, Observable, of, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { CursosService } from 'src/app/cursos.service';
import { Curso2Service } from 'src/app/cursos/curso2.service';
import { Curso } from '../curso';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
  preserveWhitespaces: true
})
export class CursosComponent implements OnInit {

  //cursos: Curso[];

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  selectedCurso: Curso;

  modalRef?: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  constructor(
    private service: Curso2Service,
    private modalService: BsModalService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    /*this.service.list()
      .subscribe(
        dados => this.cursos = dados
    );*/
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list()
      .pipe(
        catchError(error => {
          console.error(error);
          //this.error$.next(true);
          this.handleError();
          return EMPTY;
        })
      );

    /*this.service.list()
      .pipe(
        catchError(error => empty())
      )
      .subscribe(
        dados => {
          console.log(dados);
        }
        //, error => console.log(error);
        //, () => console.log('Observable completo');
      );*/
  }

  handleError(){
    this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(curso){
    //this.selectedCurso = curso;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    const result$ = this.alertModalService.showConfirm('Confirmação', 'Tem deseja que deseja remover esse curso?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        error => {
          this.alertModalService.showAlertDanger('Erro ao remover curso. Tente novamente.');
        }
      );
  }

  /*onConfirm(){
    this.service.remove(this.selectedCurso.id)
      .subscribe(
        success => {
          this.onRefresh();
          this.deleteModalRef.hide();
        },
        error => {
          this.alertModalService.showAlertDanger('Erro ao remover curso. Tente novamente.');
          this.deleteModalRef.hide();
        }
      );
  }*/

  onDecline(){
    this.deleteModalRef.hide();
  }

}
