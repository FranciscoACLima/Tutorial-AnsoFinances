export class DataUtil {

  getFirstDay(data) {
    let ano = data.getFullYear();
    let mes = this.doisDigitos(data.getMonth() + 1);
    return ano + '-' + mes + '-01';
  }

  getLastDay(data) {
    let ano = data.getFullYear();
    let mes = data.getMonth() + 1;
    let novaData = new Date(ano, mes, 0)
    let dia = novaData.getDate();
    mes = this.doisDigitos(mes)
    return ano + '-' + mes + '-' + dia;
  }

  private doisDigitos(num) {
    return (`0${num}`).slice(-2);
  }

}
