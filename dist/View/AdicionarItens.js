import { removerItem } from "../Repository/CarrinhoRepository.js";
// Gera o HTML como string, sem manipular o DOM
// Renderiza o HTML gerado no DOM
export function renderizarItemNoDOM(html, container, index) {
    const template = document.createElement('div');
    template.innerHTML = html;
    // Insere o elemento no container
    const item = template.firstElementChild;
    container.appendChild(item);
    // Configura o evento de remoção
    const removerBtn = item.querySelector('.remover');
    removerBtn.addEventListener('click', () => removerItem(index));
}
