import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos/cursos.component';
import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CursosComponent,
    CursosFormComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    ReactiveFormsModule
  ]
})
export class CursosModule { }
