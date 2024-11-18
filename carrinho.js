// Recupera os itens do carrinho no localStorage
let carrinho = JSON.parse(localStorage.getItem('Carrinho')) || [];

// Elemento onde os produtos serão listados
let listaProdutos = document.getElementById('listaProdutos');

if (carrinho.length > 0) {
  carrinho.forEach((produto, index) => {
    // Cria um elemento para exibir o produto no carrinho
    let item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
      <p>${produto.nome} - KZ ${produto.preco.toFixed(2)}</p>
      <button class="remover" data-index="${index}">Remover</button>
    `;
    listaProdutos.appendChild(item);
  });
} else {
  listaProdutos.innerHTML = '<p>Seu carrinho está vazio.</p>';
}

// Botão para remover um produto do carrinho
document.querySelectorAll('.remover').forEach(button => {
  button.addEventListener('click', function () {
    let index = parseInt(this.getAttribute('data-index'));
    carrinho.splice(index, 1); // Remove o item do array
    localStorage.setItem('Carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage
    location.reload(); // Recarrega a página para refletir as mudanças
  });
});

// Finalizar Compra
document.getElementById('finalizarCompra').addEventListener('click', function () {
  // Recuperar os registros de usuário
  let Registros = JSON.parse(localStorage.getItem('Registros')) || [];
  let ultimoRegistro = Registros.length > 0 ? Registros[Registros.length - 1] : null;

  if (ultimoRegistro) {
    let valorUser = parseFloat(ultimoRegistro.valor);
    let totalCarrinho = carrinho.reduce((total, produto) => total + produto.preco, 0);

    if (valorUser >= totalCarrinho) {
      // Atualiza o saldo do usuário
      ultimoRegistro.valor = valorUser - totalCarrinho;
      Registros[Registros.length - 1] = ultimoRegistro;
      localStorage.setItem('Registros', JSON.stringify(Registros));

      // Limpa o carrinho
      localStorage.removeItem('Carrinho');
      alert(`Compra realizada com sucesso! Seu novo saldo é de KZ ${ultimoRegistro.valor.toFixed(2)}`);
      location.reload();
    } else {
      alert('Saldo insuficiente para finalizar a compra.');
    }
  } else {
    alert('Usuário não encontrado.');
  }
});

document.getElementById('back').addEventListener('click', () =>{

  window.location.href = 'produtos.html';
});