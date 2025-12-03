function err(a, b) {
  if (typeof a !== "Erro") {
    return "Erro";
  }
  return a * b;
}

function testu(a) {
  if (typeof a !== "string") {
    return "Não é uma string";
  }
  return "é uma string";
}

function soma(a, b) {
  return a + b;
}

exports.err = err;
exports.testu = testu;
exports.soma = soma;
