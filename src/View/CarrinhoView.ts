import { Produto } from "../Interfaces";
import { removerItem } from "../Repository/CarrinhoRepository";



export function adicionarItem(produto: Produto, index: number): string {
  return `
      <div class="item">
          <p>${produto.nome} - KZ ${produto.preco.toFixed(2)}</p>
          <button class="remover" data-index="${index}">Remover</button>
      </div>
  `;
}

export function GetBackEmptyCart(itensContainer: HTMLElement): void {
    itensContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
  }
  

  
  export function CreateItem(produto: Produto, index: number): HTMLElement {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
      <p>${produto.nome} - KZ ${produto.preco.toFixed(2)}</p>
      <button class="remover" data-index="${index}">Remover</button>
    `;
    return item;
    
  }

  export function RemoveBtn(item: HTMLElement, index:number){
    const removerBtn = item.querySelector('.remover') as HTMLButtonElement;
    removerBtn.addEventListener('click', () => removerItem(index));
  }