import { Component, OnInit} from '@angular/core';
import { Toast } from 'ionic-native';
import { ModalController, AlertController, NavController} from 'ionic-angular';

import { ModalLancamentoPage } from '../modal-lancamento/modal-lancamento';
import { DAOLancamentos } from '../../app/dao/dao-lancamentos';

@Component({
  selector: 'page-lancamentos',
  templateUrl: 'lancamentos.html'
})
export class LancamentosPage implements OnInit{

  dao: any;
  listLancamentos: any;

  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {

  }

  ngOnInit() {
    this.dao = new DAOLancamentos;
    this.dao.getList((lista) => {
      this.listLancamentos = lista;
    });
  }

  insert() {
    let modal = this.modalCtrl.create(ModalLancamentoPage);
    modal.onDidDismiss(data => {
      if (data) {
        this.dao.insert(data, (data) => {
          this.listLancamentos.push(data);
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
        this.dao.edit(data, (data) => {
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
            this.dao.delete(lancamento, (data) => {
              let pos = this.listLancamentos.indexOf(data);
              this.listLancamentos.splice(pos, 1);
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
