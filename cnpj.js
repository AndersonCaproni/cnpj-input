class CNPJ {
  static tamanhoCNPJSemDV = 12;
  static regexCNPJSemDV = /^([A-Z\d]){12}$/;
  static regexCNPJ = /^([A-Z\d]){12}(\d){2}$/;
  static regexCaracteresMascara = /[./-]/g;
  static cnpjZerado = "00000000000000";
  static pesosDV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  static isValid(cnpj) {
    let cnpjSemMascara = this.removeMascaraCNPJ(cnpj).toUpperCase();

    if (this.regexCNPJ.test(cnpjSemMascara) && cnpjSemMascara !== this.cnpjZerado) {
      const dvInformado = cnpjSemMascara.substring(this.tamanhoCNPJSemDV);
      const dvCalculado = this.calculaDV(cnpjSemMascara.substring(0, this.tamanhoCNPJSemDV));
      return dvInformado === dvCalculado;
    }
    return false;
  }

  static calculaDV(cnpj) {
    let cnpjSemMascara = this.removeMascaraCNPJ(cnpj).toUpperCase();

    if (this.regexCNPJSemDV.test(cnpjSemMascara) &&
        cnpjSemMascara !== this.cnpjZerado.substring(0, this.tamanhoCNPJSemDV)) {

      let somatorioDV1 = 0;
      let somatorioDV2 = 0;

      for (let i = 0; i < this.tamanhoCNPJSemDV; i++) {
        const asciiDigito = cnpjSemMascara.charCodeAt(i) - 48;
        somatorioDV1 += asciiDigito * this.pesosDV[i + 1];
        somatorioDV2 += asciiDigito * this.pesosDV[i];
      }

      const dv1 = somatorioDV1 % 11 < 2 ? 0 : 11 - (somatorioDV1 % 11);
      somatorioDV2 += dv1 * this.pesosDV[this.tamanhoCNPJSemDV];
      const dv2 = somatorioDV2 % 11 < 2 ? 0 : 11 - (somatorioDV2 % 11);

      return `${dv1}${dv2}`;
    }

    throw new Error("Não é possível calcular o DV pois o CNPJ fornecido é inválido");
  }

  static removeMascaraCNPJ(cnpj) {
    return cnpj.replace(this.regexCaracteresMascara, "");
  }
}