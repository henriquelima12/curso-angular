import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  constructor(
    private http: HttpClient,
    private consultaCep: ConsultaCepService
  ) { }

  ngOnInit(): void {
  }

  verifyValidTouched(campo){
    return !campo.valid && campo.touched;
  }

  applyError(campo){
    return {
      'is-invalid': this.verifyValidTouched(campo)
    }
  }

  onSubmit(form){
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .subscribe(response => console.log(response));
  }

  consultaCEP(cep, form){
     if (cep != null && cep !== '') {
      this.consultaCep.getCep(cep)
        .subscribe(dados => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados, formulario){
    /*formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })*/

    formulario.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }

  resetaDadosForm(formulario){
    formulario.form.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }
    
}
