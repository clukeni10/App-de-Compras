import { Produto } from "../Interfaces";
import { removerItem } from "../Repository/CarrinhoRepository";

// Gera o HTML como string, sem manipular o DOM


// Renderiza o HTML gerado no DOM
export function renderizarItemNoDOM(html: string, container: HTMLElement, index: number): void {
    const template = document.createElement('div');
    template.innerHTML = html;

    // Insere o elemento no container
    const item = template.firstElementChild as HTMLElement;
    container.appendChild(item);

    // Configura o evento de remoção
    const removerBtn = item.querySelector('.remover') as HTMLButtonElement;
    removerBtn.addEventListener('click', () => removerItem(index));
}

