import { removerItem } from "../Repository/CarrinhoRepository.js";
export function adicionarItem(produto, index) {
    return `
      <div class="item">
          <p>${produto.nome} - KZ ${produto.preco.toFixed(2)}</p>
          <button class="remover" data-index="${index}">Remover</button>
      </div>
  `;
}
export function GetBackEmptyCart(itensContainer) {
    itensContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
}
export function CreateItem(produto, index) {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
      <p>${produto.nome} - KZ ${produto.preco.toFixed(2)}</p>
      <button class="remover" data-index="${index}">Remover</button>
    `;
    return item;
}
export function RemoveBtn(item, index) {
    const removerBtn = item.querySelector('.remover');
    removerBtn.addEventListener('click', () => removerItem(index));
}
