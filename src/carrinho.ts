import { Produto, CompraFinalizada, ItemCarrinho, CarrinhosPorUsuario, Registro } from "./DAO/Interfaces.ts";
import {Registros1, ultimoRegistro, CarrinhosPorUsuario1, carrinho, finalizarCompra} from "./DAO/CarrinhoDAO.ts"



// Elemento onde os produtos serão listados
const listaProdutos = document.getElementById('listaProdutos') as HTMLElement;

// Cria um container para os itens dinamicamente
const itensContainer = document.createElement('div');
itensContainer.id = 'itensContainer';
const finalizarCompraBtn = document.getElementById('finalizarCompra');
if (finalizarCompraBtn) {
  listaProdutos.insertBefore(itensContainer, finalizarCompraBtn);
}

// Preenche o carrinho com os itens do localStorage

export function carregarCarrinho(): void {
  console.log(carrinho);
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
export function adicionarItem(produto: Produto, index: number): void {
  const item = document.createElement('div');
  item.className = 'item';
  item.innerHTML = `
        <p>${produto.nome} - KZ ${produto.preco.toFixed(2)}</p>
        <button class="remover" data-index="${index}">Remover</button>
      `;
  itensContainer.appendChild(item);

  // Evento do botão de remoção
  const removerBtn = item.querySelector('.remover') as HTMLButtonElement;
  removerBtn.addEventListener('click', () => removerItem(index));
}

// Remove um item do carrinho
export function removerItem(index: number): void {
  carrinho.splice(index, 1); // Remove o item do array
  if (ultimoRegistro) {
    CarrinhosPorUsuario1[ultimoRegistro.nome] = carrinho; // Atualiza o carrinho do usuário
    localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario1)); // Atualiza o localStorage
  }
  carregarCarrinho(); // Atualiza a interface dinamicamente
}

/// Função para calcular o total do carrinho
function calcularTotalCarrinho(carrinho: ItemCarrinho[]): number {
  return carrinho.reduce((total, item) => total + item.preco, 0);
}


function handleFinalizarCompra(): void {
  // Carrega os registros e o último usuário
  const Registros1: Registro[] = JSON.parse(localStorage.getItem('Registros') || '[]');
  const ultimoRegistro = Registros1[Registros1.length - 1];

  if (!ultimoRegistro) {
    alert('Nenhum usuário encontrado.');
    return;
  }

  // Carrega os carrinhos
  const CarrinhosPorUsuario1: CarrinhosPorUsuario = JSON.parse(
    localStorage.getItem('CarrinhosPorUsuario') || '{}'
  );
  const carrinho = CarrinhosPorUsuario1[ultimoRegistro.nome] || [];

  if (carrinho.length === 0) {
    alert('O carrinho está vazio.');
    return;
  }

  // Calcula o total do carrinho
  const totalCarrinho = calcularTotalCarrinho(carrinho);

  // Obtém o saldo do usuário
  const valorUser = ultimoRegistro.valor;

  // Chama a função de finalização da compra
  finalizarCompra({
    valorUser,
    totalCarrinho,
    ultimoRegistro,
    Registros1,
    CarrinhosPorUsuario1,
    carrinho,
  });
}

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
