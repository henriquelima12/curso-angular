import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit();

  onSubmit(){
    if(this.formulario.valid){
      this.submit();
    }else{
      this.verifyValidations(this.formulario);
    }
  }

  verifyValidations(formGroup: FormGroup | FormArray){
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      if(formGroup.get(campo).value == null){
        controle.markAsDirty();
        controle.markAsTouched();
      }
      if(controle instanceof FormGroup || controle instanceof FormArray){
        this.verifyValidations(controle);
      }
    });
  }

  resetaForm() {
    this.formulario.reset();
  }

  verifyValidTouched(campo: string) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  verifyRequired(campo: string) {
    return this.formulario.get(campo).hasError('required') && !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  verifyInvalidEmail() {
    let campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  applyError(campo: string) {
    return {
      'is-invalid': this.verifyValidTouched(campo)
    }
  }

}
