import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { EMPTY, empty, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { FormValidations } from '../shared/form-validations';
import { Cidade } from '../shared/models/cidade';
import { Estado } from '../shared/models/estado';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { VerificaEmailService } from './services/verifica-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  //formulario: FormGroup;
  estados: Estado[];
  //estados: Observable<Estado[]>;
  cidades: Cidade[];
  cargos: any[];
  tecnologias: any[];
  newsLetterOp: any[];
  frameworks: any[] = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private consultaCep: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {
    super();
   }

  ngOnInit(): void {
    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
      endereco: new FormGroup({
        ...
      })
    });*/

    /*this.dropdownService.getEstadosBr()
      .subscribe(dados => {
        this.estados = dados;
        console.log(this.estados);
      });*/

    //this.verificaEmailService.verificarEmail('email@email.com').subscribe();
    
    //this.estados = this.dropdownService.getEstadosBr();
    this.dropdownService.getEstadosBr()
      .subscribe(dados => this.estados = dados);

    this.cargos = this.dropdownService.getCargos();

    this.tecnologias = this.dropdownService.getTecnologias();

    this.newsLetterOp = this.dropdownService.getNewsLetter();
      
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsLetter: ['s'],
      termos: [false, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log(value)),
        switchMap(status => status === 'VALID' ?
          this.consultaCep.getCep(this.formulario.get('endereco.cep').value)
          : EMPTY)
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {} );

    this.formulario.get('endereco.estado').valueChanges
      .pipe(
        //tap(estado => console.log(estado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : EMPTY),
        switchMap((estadoId: string) => this.dropdownService.getCidades(estadoId))
        //tap(console.log)
      )
      .subscribe(cidades => this.cidades = cidades);
    //this.dropdownService.getCidades(8).subscribe(console.log);
  }

  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
  }

  submit(){
    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v, i) => v ? this.frameworks[i] : null)
        .filter(v => v != null)
    });
    console.log(valueSubmit);
    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .subscribe(response => {
        console.log(response);
        this.resetaForm();
      },
        (error: any) => alert('erro'));
  }

  consultaCEP(){
    let cep = this.formulario.get('endereco.cep').value;
    if (cep != null && cep !== '') {
      this.consultaCep.getCep(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados){
    this.formulario.patchValue({
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

  resetaDadosForm(){
    this.formulario.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }

  setarCargo(){
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1, obj2){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias(){
    this.formulario.get('tecnologias').setValue(['java', 'javascript', 'php']);
  }

  validarEmail(formControl: FormControl){
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExists => emailExists ? { emailInvalido: true } : null ));
  }

}
