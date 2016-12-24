export class DataUtil {

  getFirstDay(data) {
    let ano = data.getFullYear();
    let mes = data.getMonth() + 1 ;
    return ano + '-' + mes + '-01';
  }

  getLastDay(data) {
    let ano = data.getFullYear();
    let mes = data.getMonth() + 1;
    let novaData = new Date(ano, mes, 0)
    let dia = novaData.getDate();
    return ano + '-' + mes + '-' + dia;
  }

}
