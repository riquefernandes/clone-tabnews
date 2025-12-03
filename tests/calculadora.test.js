const calculadora = require("../models/calculadora.js");

test("somar 2 + 2 que deveria ser 4", () => {
  const resultado = calculadora.err("a", 2);
  expect(resultado).toBe("Erro");
});

test("deve sair uma merda de uma string", () => {
  const result = calculadora.testu("henrique");
  expect(result).toBe("é uma string");
});

test("Soma", () => {
  const result = calculadora.soma(100, 2);
  expect(result).toBe(102);
});
