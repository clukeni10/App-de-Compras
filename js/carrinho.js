// carrinho.js

// Recupera os registros do localStorage
let Registros = JSON.parse(localStorage.getItem('Registros')) || [];
let ultimoRegistro = Registros.length > 0 ? Registros[Registros.length - 1] : null;

// Recupera o carrinho atual do localStorage para o usuário atual
let CarrinhosPorUsuario = JSON.parse(localStorage.getItem('CarrinhosPorUsuario')) || {};
let carrinho = ultimoRegistro ? CarrinhosPorUsuario[ultimoRegistro.nome] || [] : [];

// Elemento onde os produtos serão listados
let listaProdutos = document.getElementById('listaProdutos');

// Cria um container para os itens dinamicamente
let itensContainer = document.createElement('div');
itensContainer.id = 'itensContainer';
listaProdutos.insertBefore(itensContainer, document.getElementById('finalizarCompra'));

// Preenche o carrinho com os itens do localStorage
function carregarCarrinho() {
  itensContainer.innerHTML = ""; // Limpa os itens anteriores

  if (carrinho.length > 0) {
    carrinho.forEach((produto, index) => {
      adicionarItem(produto, index);
    });
  } else {
    itensContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
  }
}

// Adiciona um novo item no carrinho
function adicionarItem(produto, index) {
  let item = document.createElement('div');
  item.className = 'item';
  item.innerHTML = `
    <p>${produto.nome} - KZ ${produto.preco.toFixed(2)}</p>
    <button class="remover" data-index="${index}">Remover</button>
  `;
  itensContainer.appendChild(item);

  // Evento do botão de remoção
  item.querySelector('.remover').addEventListener('click', function () {
    removerItem(index);
  });
}

// Remove um item do carrinho
function removerItem(index) {
  carrinho.splice(index, 1); // Remove o item do array
  CarrinhosPorUsuario[ultimoRegistro.nome] = carrinho; // Atualiza o carrinho do usuário
  localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario)); // Atualiza o localStorage
  carregarCarrinho(); // Atualiza a interface dinamicamente
}

// Finalizar Compra
// Finalizar Compra
document.getElementById('finalizarCompra').addEventListener('click', function () {
  let valorUser = parseFloat(ultimoRegistro.valor);
  let totalCarrinho = carrinho.reduce((total, produto) => total + produto.preco, 0);

  if (valorUser >= totalCarrinho) {
    // Atualiza o saldo do usuário
    ultimoRegistro.valor = valorUser - totalCarrinho;
    Registros[Registros.length - 1] = ultimoRegistro;
    localStorage.setItem('Registros', JSON.stringify(Registros));

    // Salva os produtos finalizados no localStorage
    let ComprasFinalizadas = JSON.parse(localStorage.getItem('ComprasFinalizadas')) || [];
    ComprasFinalizadas.push({
      nome: ultimoRegistro.nome,
      produtos: carrinho, // Itens comprados
      data: new Date().toLocaleString(), // Adiciona a data da compra (opcional)
    });
    localStorage.setItem('ComprasFinalizadas', JSON.stringify(ComprasFinalizadas));

    // Esvazia o carrinho atual
    CarrinhosPorUsuario[ultimoRegistro.nome] = [];
    localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario));

    // Dispara um evento para notificar outras páginas
    const evento = new Event('dadosAtualizados');
    window.dispatchEvent(evento);

    alert(`Compra realizada com sucesso! Seu novo saldo é de KZ ${ultimoRegistro.valor.toFixed(2)}`);

    // Atualiza a interface
    carregarCarrinho();
  } else {
    alert('Saldo insuficiente para finalizar a compra.');
  }
});



// Inicializa o carrinho ao carregar a página
carregarCarrinho();

document.getElementById('back').addEventListener('click', () => {
  window.location.href = 'produtos.html';
}); 