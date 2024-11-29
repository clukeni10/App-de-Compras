import { carrinho, ultimoUser } from './DAO/CarrinhoDAO.js';
import { carregarCarrinho, removerItem, handleFinalizarCompra, saveShopping } from './Repository/CarrinhoRepository.js';
// Elemento onde os produtos serão listados
export const listaProdutos = document.getElementById('listaProdutos');
// Cria um container para os itens dinamicamente
export const itensContainer = document.createElement('div');
itensContainer.id = 'itensContainer';
export const finalizarCompraBtn = document.getElementById('finalizarCompra');
if (finalizarCompraBtn) {
    listaProdutos.insertBefore(itensContainer, finalizarCompraBtn);
}
// Função para carregar o carrinho ao carregar a página
window.addEventListener('load', () => {
    carregarCarrinho(); // Carrega os itens do carrinho para o DOM
});
// Função para remover um item do carrinho
itensContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remover')) {
        const index = Number(event.target.getAttribute('data-index'));
        removerItem(index); // Remove o item do carrinho
        // Atualiza o total do carrinho após remoção
    }
});
// Adiciona o evento de clique ao botão
const btnFinalizarCompra = document.getElementById('finalizarCompra');
if (btnFinalizarCompra) {
    btnFinalizarCompra.addEventListener('click', () => {
        handleFinalizarCompra();
        if (ultimoUser) {
            saveShopping(ultimoUser, carrinho);
        }
        else {
            console.error('ultimoUser is null');
        }
    });
    // Inicializa o carrinho ao carregar a página
    carregarCarrinho();
    const backButton1 = document.getElementById('back');
    backButton1 === null || backButton1 === void 0 ? void 0 : backButton1.addEventListener('click', () => {
        window.location.href = 'produtos.html';
    });
}
