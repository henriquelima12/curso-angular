import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from 'src/app/cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Curso2Service } from '../curso2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: Curso2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    /*this.route.params
      .pipe(
        map(params => params['id']),
        switchMap(id => this.service.loadById(id))
      )
      .subscribe(curso => this.updateForm(curso));*/

    const curso = this.route.snapshot.data['curso']

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });

  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    console.log(this.form.value);
    this.submitted = true;
    if (this.form.valid) {
      let successMsg = 'Curso criado com sucesso!';
      let errorMsg = 'Erro ao criar curso. Tente novamente.';
      if(this.form.value.id){
        successMsg = 'Curso atualizado com sucesso!';
        errorMsg = 'Erro ao atualizar curso. Tente novamente.';
      }
      this.service.save(this.form.value)
        .subscribe(
          success => {
            this.modal.showAlertSuccess(successMsg);
            this.location.back();
          },
          error => {
            this.modal.showAlertDanger(errorMsg);
          }
        )
      /*if (this.form.value.id) {
        this.service.update(this.form.value)
          .subscribe(
            success => {
              this.modal.showAlertSuccess('Curso atualizado com sucesso!');
              this.location.back();
            },
            error => this.modal.showAlertDanger('Erro ao atualizar curso. Tente novamente.'),
            () => console.log('Requisição completa')
          );
      } else {
        this.service.create(this.form.value)
          .subscribe(
            success => {
              this.modal.showAlertSuccess('Curso criado com sucesso!');
              this.location.back();
            },
            error => this.modal.showAlertDanger('Erro ao criar curso. Tente novamente.'),
            () => console.log('Requisição completa')
          );
        this.form.reset();
      }*/
      this.submitted = false;
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  /*updateForm(curso){
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    });
  }*/

}
