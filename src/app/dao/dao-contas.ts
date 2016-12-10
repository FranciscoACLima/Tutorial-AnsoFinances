import { Component } from '@angular/core';

export class DAOContas {

  list = [];

  constructor() {

  }

  getList() {
    this.list = [
      {descricao: "Alimentação"},
      {descricao: "Lazer"},
      {descricao: "Transporte"},
    ]
    return this.list;
  }

  insert(conta) {
    this.list.push(conta);
  }

  edit(conta) {

  }

  delete(conta) {
    let pos = this.list.indexOf(conta);
    this.list.splice(pos, 1);
  }
}
