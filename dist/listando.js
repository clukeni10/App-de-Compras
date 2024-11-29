// carrinho.ts
import { atualizarLista } from "./View/ListandoView.js";
// Elemento onde as compras serão listadas
export const listaCompras = document.getElementById('listaCompras');
// Verifica se o elemento existe antes de chamar a função
if (listaCompras) {
    // Atualiza a lista ao carregar a página
    atualizarLista(listaCompras);
    // Escuta o evento de dados atualizados para atualizar a lista automaticamente
    window.addEventListener('dadosAtualizados', () => atualizarLista(listaCompras));
}
const backButton = document.getElementById('back');
backButton === null || backButton === void 0 ? void 0 : backButton.addEventListener('click', () => {
    window.location.href = 'produtos.html';
});

