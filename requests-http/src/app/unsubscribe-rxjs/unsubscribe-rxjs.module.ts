import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';
import { PocBaseComponent } from './poc-base/poc-base.component';
import { PocUnsubComponent } from './components/poc-unsub.component';
import { PocTakeComponent } from './components/poc-take.component';
import { PocTakeUntilComponent } from './components/poc-take-until.component';
import { PocAsyncComponent } from './components/poc-async.component';
import { PocComponent } from './components/poc.component';
import { UnsubscribeRxjsRoutingModule } from './unsubscribe-rxjs-routing.module';



@NgModule({
  declarations: [
    UnsubscribePocComponent,
    PocBaseComponent,
    PocComponent,
    PocAsyncComponent,
    PocTakeUntilComponent,
    PocTakeComponent,
    PocUnsubComponent
  ],
  imports: [
    CommonModule,
    UnsubscribeRxjsRoutingModule
  ]
})
export class UnsubscribeRxjsModule { }
