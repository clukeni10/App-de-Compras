// Recupera os registros do localStorage, ou um array vazio se não existirem registros
let Registros = JSON.parse(localStorage.getItem("Registros")) || [];
let ultimoRegistro = Registros;

// Verifica se existem registros
if (Registros.length > 0) {
  // Acessa o último registro (último item do array)
  ultimoRegistro = Registros[Registros.length - 1];
  alert(JSON.stringify("Olá " + ultimoRegistro.nome + " , o seu saldo é de " + ultimoRegistro.valor)); // Convertendo o objeto para string JSON
} else {
  alert("Não há registros.");
}

let valorUser = parseFloat(ultimoRegistro.valor); // Garante que valorUser seja um número
let productValue = parseFloat(document.getElementById("card").getAttribute("data-preco")); // Garante que productValue seja um número

document.getElementById("btn").addEventListener("click", () => {
  if (!isNaN(valorUser) && !isNaN(productValue)) { // Verifica se ambos são números válidos
    let Total = valorUser - productValue;
    alert(`Resta agora ${Total} na sua conta.`);
    // Atualizando o valor do saldo no registro
    ultimoRegistro.valor = Total;

    // Atualizando o localStorage com o novo saldo
    Registros[Registros.length - 1] = ultimoRegistro; // Substitui o último registro com o novo valor

    // Armazenando novamente no localStorage
    localStorage.setItem("Registros", JSON.stringify(Registros)); // Atualiza o localStorage com o array atualizado
  } else {
    alert("Valores inválidos.");
  }
});
