import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { DAOContas } from '../../app/dao/dao-contas';

@Component({
  selector: 'page-modal-lancamento',
  templateUrl: 'modal-lancamento.html'
})
export class ModalLancamentoPage {

  dao: any;
  lancamento: any;
  contas: any;

  constructor(public viewCtrl: ViewController,params: NavParams) {
    this.viewCtrl = viewCtrl;
    this.lancamento = params.get("parametro") || {};
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
