// carrinho.ts
import { atualizarLista } from "./View/ListandoView";

// Elemento onde as compras serão listadas
export const listaCompras = document.getElementById('listaCompras') as HTMLElement | null;

// Verifica se o elemento existe antes de chamar a função
if (listaCompras) {
  // Atualiza a lista ao carregar a página
  atualizarLista(listaCompras);

  // Escuta o evento de dados atualizados para atualizar a lista automaticamente
  window.addEventListener('dadosAtualizados', () => atualizarLista(listaCompras));
}

const backButton = document.getElementById('back');
backButton?.addEventListener('click', () => {
  window.location.href = 'produtos.html';
});
