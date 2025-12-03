function status(request, response) {
  response.status(200).json({
    nome: "Henrique",
    sobrenome: "Fernandes",
  });
}

export default status;
