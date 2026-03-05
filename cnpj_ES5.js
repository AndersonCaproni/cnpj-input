var CnpjES5 = (function () {
  var tamanhoCNPJSemDV = 12;
  var regexCNPJSemDV = /^([A-Z\d]){12}$/;
  var regexCNPJ = /^([A-Z\d]){12}(\d){2}$/;
  var regexCaracteresMascara = /[./-]/g;
  var regexCaracteresNaoPermitidos = /[^A-Z\d./-]/i;
  var valorBase = "0".charCodeAt(0);
  var pesosDV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  var cnpjZerado = "00000000000000";

  function removeMascaraCNPJ(cnpj) {
    return cnpj.replace(regexCaracteresMascara, "");
  }

  function calculaDV(cnpj) {
    if (!regexCaracteresNaoPermitidos.test(cnpj)) {
      var cnpjSemMascara = removeMascaraCNPJ(cnpj);
      if (regexCNPJSemDV.test(cnpjSemMascara) && cnpjSemMascara !== cnpjZerado.substring(0, tamanhoCNPJSemDV)) {
        var somatorioDV1 = 0;
        var somatorioDV2 = 0;
        for (var i = 0; i < tamanhoCNPJSemDV; i++) {
          var asciiDigito = cnpjSemMascara.charCodeAt(i) - valorBase;
          somatorioDV1 += asciiDigito * pesosDV[i + 1];
          somatorioDV2 += asciiDigito * pesosDV[i];
        }
        var dv1 = somatorioDV1 % 11 < 2 ? 0 : 11 - (somatorioDV1 % 11);
        somatorioDV2 += dv1 * pesosDV[tamanhoCNPJSemDV];
        var dv2 = somatorioDV2 % 11 < 2 ? 0 : 11 - (somatorioDV2 % 11);
        return "" + dv1 + dv2;
      }
    }
    throw new Error("Não é possível calcular o DV pois o CNPJ fornecido é inválido");
  }

  function isValid(cnpj) {
    if (!regexCaracteresNaoPermitidos.test(cnpj)) {
      var cnpjSemMascara = removeMascaraCNPJ(cnpj);
      if (regexCNPJ.test(cnpjSemMascara) && cnpjSemMascara !== cnpjZerado) {
        var dvInformado = cnpjSemMascara.substring(tamanhoCNPJSemDV);
        var dvCalculado = calculaDV(cnpjSemMascara.substring(0, tamanhoCNPJSemDV));
        return dvInformado === dvCalculado;
      }
    }
    return false;
  }

  return {
    isValid: isValid,
    calculaDV: calculaDV
  };
})();