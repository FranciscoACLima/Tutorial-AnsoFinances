import { Component, OnInit} from '@angular/core';
import { Toast } from 'ionic-native';
import { ModalController, AlertController, NavController, Events} from 'ionic-angular';

import { ModalLancamentoPage } from '../modal-lancamento/modal-lancamento';
import { DAOLancamentos } from '../../app/dao/dao-lancamentos';

@Component({
  selector: 'page-lancamentos',
  templateUrl: 'lancamentos.html',
})
export class LancamentosPage implements OnInit{

  dao: any;
  listLancamentos: any;
  dataFiltro: Date;

  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public events: Events
  ) {
    this.events = events;
  }

  ngOnInit() {
    this.dataFiltro = new Date();
    this.dao = new DAOLancamentos;
    this.getListaLancamentos();
  }

  getListaLancamentos() {
    let dataInicio = this._getInicioDoMes(this.dataFiltro);
    let proxMes = new Date(this.dataFiltro);;
    proxMes.setMonth(proxMes.getMonth() + 1);
    let dataFim = this._getInicioDoMes(proxMes);
    this.dao.getList(dataInicio, dataFim, (lista) => {
      this.listLancamentos = lista;
    });
  }

  private _getInicioDoMes(data: Date) {
    let ano = data.getFullYear();
    let mes = data.getMonth() + 1;
    return ano + '-' + mes + '-01';
  }

  changePaymentStatus(lancamento) {
    lancamento.pago = lancamento.pago == 'true' ? 'false' : 'true';
    this.dao.edit(lancamento, (lancamento) => {
      this.updateMonth(new Date(lancamento.data));
    })
  }

  paymentButtonText(lancamento) {
    return lancamento.pago == 'true' ? "Reabrir" : "Pagar";
  }


  updateMonth(data) {
    this.listLancamentos = [];
    this.dataFiltro = data;
    this.getListaLancamentos();
    this.updateSaldo();
  }

  updateSaldo() {
    this.dao.getSaldo((saldo) => {
      this.events.publish("saldo:updated", saldo);
    })
  }

  insert() {
    let modal = this.modalCtrl.create(ModalLancamentoPage);
    modal.onDidDismiss(data => {
      if (data) {
        this.dao.insert(data, (lancamento) => {
          this.updateMonth(new Date(lancamento.data));
          Toast.showShortBottom("Lançamento Inserido Com Sucesso !").subscribe(
            toast => {
              console.log(toast);
            });
        });
      }
    });
    modal.present();
  }

  edit(lancamento) {
    let modal = this.modalCtrl.create(ModalLancamentoPage, {parametro: lancamento});
    modal.onDidDismiss(data => {
      if (data) {
        this.dao.edit(lancamento, (lancamento) => {
          this.updateMonth(new Date(lancamento.data));
          Toast.showShortBottom("Lançamento Alterado Com Sucesso !").subscribe(
            toast => {
              console.log(toast);
            });
        });
      } else {
        this.dao.getList((lista) => {
          this.listLancamentos = lista;
        });
      }
    });
    modal.present();
  }

  delete(lancamento) {
    let confirm = this.alertCtrl.create({
      title: 'Excluir Conta',
      message: "Gostaria realmente de excluir o Lançamento: " + lancamento.descricao + "?",
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.dao.delete(lancamento, (lancamento) => {
              this.updateMonth(new Date(lancamento.data));
              Toast.showShortBottom("Lançamento Excluído Com Sucesso !").subscribe(
                toast => {
                  console.log(toast);
                });
            });
          }
        },
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Exclusão Cancelada');
          }
        },
      ]
    });
    this.navCtrl.push(confirm);
  }

  lancamentoEntrada(lancamento) {
    return lancamento.entradaSaida == "entrada";
  }
}
