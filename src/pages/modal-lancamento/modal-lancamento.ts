import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { DAOContas } from '../../app/dao/dao-contas';

@Component({
  selector: 'page-modal-lancamento',
  templateUrl: 'modal-lancamento.html'
})
export class ModalLancamentoPage {

  dao: any;
  lancamento: any;
  contas: any;

  constructor(public viewCtrl: ViewController) {
    this.viewCtrl = viewCtrl;
    this.lancamento = {}
    this.dao = new DAOContas;
    this.dao.getList((lista) => {
      this.contas = lista;
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  salvar() {
    this.viewCtrl.dismiss(this.lancamento);
  }

}
