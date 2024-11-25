// Importa as funções do carrinhoRepository
import {
  finalizarCompra,
  carregarCarrinho,
  adicionarItem,
  removerItem,
  handleFinalizarCompra,
} from './Repository/CarrinhoRepository';


// Elemento onde os produtos serão listados
const listaProdutos = document.getElementById('listaProdutos') as HTMLElement;

// Cria um container para os itens dinamicamente
const itensContainer = document.createElement('div');
itensContainer.id = 'itensContainer';
const finalizarCompraBtn = document.getElementById('finalizarCompra');
if (finalizarCompraBtn) {
  listaProdutos.insertBefore(itensContainer, finalizarCompraBtn);
}

// Função para carregar o carrinho ao carregar a página
window.addEventListener('load', () => {
  carregarCarrinho();  // Carrega os itens do carrinho para o DOM
});

// Função para adicionar um item ao carrinho


// Função para remover um item do carrinho
itensContainer.addEventListener('click', (event) => {
  if ((event.target as HTMLElement).classList.contains('remover')) {
    const index = Number((event.target as HTMLElement).getAttribute('data-index'));
    removerItem(index);  // Remove o item do carrinho
    // Atualiza o total do carrinho após remoção
  }
});

// Função para finalizar a compra
finalizarCompraBtn?.addEventListener('click', () => {
  handleFinalizarCompra();  // Finaliza a compra e atualiza o carrinho
});

// Função para calcular e exibir o total do carrinho






// Adiciona o evento de clique ao botão
const btnFinalizarCompra = document.getElementById('finalizarCompra');
if (btnFinalizarCompra) {
  btnFinalizarCompra.addEventListener('click', handleFinalizarCompra);
}

// Inicializa o carrinho ao carregar a página
carregarCarrinho();

const backButton1 = document.getElementById('back');
backButton1?.addEventListener('click', () => {
  window.location.href = 'produtos.html';
});
