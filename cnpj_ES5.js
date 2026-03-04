var CnpjES5 = (function() {

  var TAMANHO_CNPJ_SEM_DV = 12;
  var REGEX_CNPJ_SEM_DV = /^([A-Z\d]){12}$/;
  var REGEX_CNPJ = /^([A-Z\d]){12}(\d){2}$/;
  var REGEX_CARACTERES_MASCARA = /[./-]/g;
  var CNPJ_ZERADO = "00000000000000";
  var PESOS_DV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  function removeMascaraCNPJ(cnpj) {
    return cnpj.replace(REGEX_CARACTERES_MASCARA, "");
  }

  function calculaDV(cnpj) {
    var cnpjSemMascara = removeMascaraCNPJ(cnpj).toUpperCase();

    if (REGEX_CNPJ_SEM_DV.test(cnpjSemMascara) &&
        cnpjSemMascara !== CNPJ_ZERADO.substring(0, TAMANHO_CNPJ_SEM_DV)) {

      var somatorioDV1 = 0;
      var somatorioDV2 = 0;

      for (var i = 0; i < TAMANHO_CNPJ_SEM_DV; i++) {
        var asciiDigito = cnpjSemMascara.charCodeAt(i) - 48;
        somatorioDV1 += asciiDigito * PESOS_DV[i + 1];
        somatorioDV2 += asciiDigito * PESOS_DV[i];
      }

      var dv1 = somatorioDV1 % 11 < 2 ? 0 : 11 - (somatorioDV1 % 11);
      somatorioDV2 += dv1 * PESOS_DV[TAMANHO_CNPJ_SEM_DV];
      var dv2 = somatorioDV2 % 11 < 2 ? 0 : 11 - (somatorioDV2 % 11);

      return "" + dv1 + dv2;
    }

    throw new Error("CNPJ inválido");
  }

  function isValid(cnpj) {
    var cnpjSemMascara = removeMascaraCNPJ(cnpj).toUpperCase();

    if (REGEX_CNPJ.test(cnpjSemMascara) && cnpjSemMascara !== CNPJ_ZERADO) {
      var dvInformado = cnpjSemMascara.substring(TAMANHO_CNPJ_SEM_DV);
      var dvCalculado = calculaDV(cnpjSemMascara.substring(0, TAMANHO_CNPJ_SEM_DV));
      return dvInformado === dvCalculado;
    }
    return false;
  }

  return {
    isValid: isValid,
    calculaDV: calculaDV,
    removeMascaraCNPJ: removeMascaraCNPJ
  };

})();