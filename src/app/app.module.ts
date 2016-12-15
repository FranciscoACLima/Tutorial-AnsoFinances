import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContasPage } from '../pages/contas/contas';
import { ModalContasPage } from '../pages/modal-contas/modal-contas';
import { LancamentosPage } from '../pages/lancamentos/lancamentos';
import { ModalLancamentoPage } from '../pages/modal-lancamento/modal-lancamento';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContasPage,
    ModalContasPage,
    LancamentosPage,
    ModalLancamentoPage,
  ],
  imports: [
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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
