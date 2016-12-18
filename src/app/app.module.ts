import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CommonModule } from '@angular/common';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContasPage } from '../pages/contas/contas';
import { ModalContasPage } from '../pages/modal-contas/modal-contas';
import { LancamentosPage } from '../pages/lancamentos/lancamentos';
import { ModalLancamentoPage } from '../pages/modal-lancamento/modal-lancamento';
import { StatusPgto } from '../pipes/status-pgto';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContasPage,
    ModalContasPage,
    LancamentosPage,
    ModalLancamentoPage,
    StatusPgto,
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContasPage,
    ModalContasPage,
    LancamentosPage,
    ModalLancamentoPage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class AppModule {}
