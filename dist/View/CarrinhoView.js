// Função para adicionar um item ao carrinho
export function GetBackEmptyCart(itensContainer) {
    itensContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
}
// Função para criar o item e retornar o elemento
export function CreateItem(produto, index) {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
      <p>${produto.nome} - KZ ${produto.preco.toFixed(2)}</p>
      <button class="remover" data-index="${index}">Remover</button>
    `;
    return item;
}
